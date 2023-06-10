import type { AstroConfig, AstroIntegration } from 'astro';
import { ZodError } from 'astro/zod';

import { Logger } from './logger';

const PKG_NAME = '@scrshot/create-json-schema';
const OUTFILE = 'schema.json';

interface SitemapOptions {

}

const createPlugin = (options?: SitemapOptions): AstroIntegration => {
	let config: AstroConfig;
	const logger = new Logger(PKG_NAME);

	return {
		name: PKG_NAME,

		hooks: {
			'astro:config:done': async ({ config: cfg }) => {
				config = cfg;
			},

			'astro:build:done': async ({ dir, routes, pages }) => {
				try {
					if (!config.site) {
						logger.warn(
							'The Sitemap integration requires the `site` astro.config option. Skipping.'
						);
						return;
					}

					console.log(options);

					logger.success(`\`${OUTFILE}\` is created.`);
				} catch (err) {
					if (err instanceof ZodError) {
						// logger.warn(formatConfigErrorMessage(err));
					} else {
						throw err;
					}
				}
			},
		},
	};
};

export default createPlugin;
