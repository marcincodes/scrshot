import { cosmiconfigSync, cosmiconfig } from 'cosmiconfig';
import { z } from 'zod';
import { zodToJsonSchema } from "zod-to-json-schema";
import { fromZodError } from 'zod-validation-error';

export const Config = z.object({
  url: z.string(), // url but need to allow all app names
  dest: z.string(),
  viewport: z.object({
    width: z.number(),
    height: z.number()
  }).optional(),
  auth: z.object({
    url: z.string().url().optional(),
    path: z.string().startsWith('/'),
    success: z.object({
      url: z.string().url().optional(),
      path: z.string().startsWith('/')
    })
  }).optional(),
  ios: z.object({
    dest: z.string(),
    path: z.string(),
    device: z.string(),
  }).optional(),
  android: z.object({
    dest: z.string(),
    paths: z.object({
      app: z.string(),
      test: z.string(),
    }),
    device: z.string().or(z.enum(['running'])),
  }).optional(),
  screenshots: z.record(z.object({
    url: z.string().url().optional(),
    path: z.string().startsWith('/'),
    skip: z.boolean().optional(),
    auth: z.boolean().optional(),
    wait: z.number().or(z.string()).optional()
  })),
  output: z.object({
    space: z.number()
      .or(z.tuple([
        z.number(), z.number()
      ]))
      .or(z.tuple([
        z.number(), z.number(), z.number(), z.number()
      ])).optional(),
    background: z.object({
      border: z.object({
        style: z.enum(['solid']),
        width: z.number(),
        color: z.string(),
        radius: z.number().optional()
      }).optional(),
      gradient: z.record(z.string(), z.string()).or(z.array(z.string())).optional(),
    }).optional(),
    screenshot: z.object({
      border: z.object({
        style: z.enum(['solid']),
        width: z.number(),
        color: z.string(),
        radius: z.number().optional()
      }).optional(),
    }).optional(),
  }).optional()
});

export type Config = z.infer<typeof Config>;

export async function getConfig() {
  const explorer = cosmiconfig('scrshot');

  const searched = await explorer.search(process.cwd())
    .catch((cause) => {
      throw new Error('Config not found');
    });
  
  if (searched === null) {
    throw new Error('Config not found');
  }

  try {
    const config = Config.parse(searched.config);

    return { config, error: null, filepath: searched.filepath };
  } catch (cause) {
    return { 
      config: {}, 
      error: fromZodError(cause, { 
        prefix: 'Config error'
      }), 
      filepath: searched.filepath
    };
  }
}

export function getConfigSync() {
  const explorer = cosmiconfigSync('scrshot');

  const searched = explorer.search(process.cwd())

  if (searched === null) {
    throw new Error('Config not found');
  }

  try {
    const config = Config.parse(searched.config);

    return { config, error: null, filepath: searched.filepath };
  } catch (cause) {
    return { 
      config: {}, 
      error: fromZodError(cause, { 
        prefix: 'Config error'
      }), 
      filepath: searched.filepath
    };
  }
}

export function getConfigJSONScheme() {
  return zodToJsonSchema(Config, "scrshot");
}
