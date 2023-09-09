import path from 'node:path';
import fs from 'node:fs';
import sharp, { Sharp } from "sharp";
import dayjs from 'dayjs';

import { Config } from "@scrshot/config";


export class Image {
  image!: Sharp;
  config: Config;
  baseDir ='.scrshot';

  #screenshot!: Sharp;
  #background!: Sharp;
  #metadata!: sharp.Metadata;
  #output!: Config['output'];

  constructor(config: Config) {
    this.config = config;
  }

  createGradientSVG({ width, height, colors, to }: { width: number; height: number; colors: string[] | Record<number, string>; to?: 'left' | 'right' | 'top' | 'bottom' }) {
    let stops = '';

    if (Array.isArray(colors)) {
      stops = colors.map((color, index) => {
        return `<stop offset="${100 / (colors.length - 1) * index}%"  stop-color="${color}" />`
      }).join('\n');
    } else {
      stops = Object.keys(colors).map((offset) => {
        const _offset = offset as unknown as keyof typeof colors;
        return `<stop offset="${offset}%"  stop-color="${colors[_offset]}" />`
      }).join('\n');
    }

    return `
      <svg 
        width="${width}" 
        height="${height}" 
        viewBox="0 0 ${width} ${height}" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="linearGradientId" gradientTransform="rotate(0 0.5 0.5)">
            ${stops}
          </linearGradient>
        </defs>

        <rect width="${width}" height="${height}" fill="url(#linearGradientId)" />
      </svg>
    `
  }

  createRoundedMaskSVG({ width, height, radius }: { width: number; height: number; radius: number }) {
    return `
      <svg><rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" ry="${radius}" stroke="green" /></svg>
    `;
  }

  getSpace() {
    const space = this.#output?.space;

    if (typeof space === 'undefined') {
      return null
    }

    if (typeof space === 'number') {
      return [space, space, space, space];
    }
    
    if (space.length === 2) {
      const [y, x] = space;

      return [y, x, y, x];
    }
    
    if (space.length === 4) {
      return space;
    }
  }

  createBackground() {
    const space = this.getSpace();

    if (!space) {
      throw new Error('Space is not defined');
    }

    if (!this.#metadata?.width || !this.#metadata?.height) {
      throw new Error('Width and Height is not defined in metadata');
    }

    const [top, right, bottom, left] = space;
    const width = this.#metadata.width + right + left;
    const height = this.#metadata.height + top + bottom;

    const gradient = this.createGradientSVG({ 
      width, 
      height, 
      colors: this.config.output?.background?.gradient!
    })

    const background = sharp(Buffer.from(gradient));

    if (this.#output?.background?.border) {
      background.extend({
        top: this.#output.background.border.width,
        bottom: this.#output.background.border.width,
        left: this.#output.background.border.width,
        right: this.#output.background.border.width,
        background: this.#output.background.border.color,
      })
    }

    if (this.#output?.background?.border?.radius) {
      const mask = this.createRoundedMaskSVG({ width, height, radius: this.#output?.background.border.radius });

      background.composite([
        {
          input: Buffer.from(mask),
          blend: 'dest-in'
        },
      ])
    }

    return background
  }

  createScreenshot(image: string | Buffer) {
    const screenshot = sharp(image);

    if (this.#output?.screenshot?.border) {
      screenshot.extend({
        top: this.#output.screenshot.border.width,
        bottom: this.#output.screenshot.border.width,
        left: this.#output.screenshot.border.width,
        right: this.#output.screenshot.border.width,
        background: this.#output.screenshot.border.color,
      })

      if (this.#output.screenshot.border?.radius) {
        if (!this.#metadata?.width || !this.#metadata?.height) {
          throw new Error('Width and Height is not defined in metadata');
        }
  
        const width = this.#metadata.width;
        const height = this.#metadata.height;
  
        const mask = this.createRoundedMaskSVG({ width, height, radius: this.#output.screenshot.border.radius });
  
        screenshot.composite([
          {
            input: Buffer.from(mask),
            blend: 'dest-in'
          },
        ])
      }
    }

    return screenshot;
  }

  async process(image: string | Buffer, destination: string) {
    this.#output = this.config.output;

    if (typeof this.config.output === 'undefined') {
      await sharp(image).toFile(destination);
      return;
    }

    this.#metadata = await sharp(image).metadata();

    if (!this.#metadata) {
      throw new Error('Cannot read screenshot metadata');
    }

    if (this.#output?.background) {
      this.#background = this.createBackground();
    }

    this.#screenshot = this.createScreenshot(image);

    const space = this.getSpace();

    const top = space?.[0];
    const left = space?.[3];

    if (this.#output?.background) {
      const backgroundBuffer = await this.#background.toBuffer();

      this.#background = sharp(backgroundBuffer)
        .composite([
          { input: await this.#screenshot.toBuffer(), top: top, left: left  }
        ]) 
  
      this.#background.toFile(destination);
    } else {
      this.#screenshot.toFile(destination);
    }
  }

  async cache(image: string | Buffer, filename: string) {
    const cacheDir = path.resolve(this.baseDir, 'cache', `web.${dayjs().format('YYYY-MM-DD HH-mm-ss[Z]')}`);

    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }

    await sharp(image)
      .toFile(path.resolve(cacheDir, filename));
  }
}
