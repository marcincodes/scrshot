import { cosmiconfigSync, cosmiconfig } from 'cosmiconfig';
import { z } from 'zod';

export const Config = z.object({
  url: z.string().url(),
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
  screenshots: z.record(z.object({
    url: z.string().url().optional(),
    path: z.string().startsWith('/')
  }))
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

  return Config.parse(searched.config);
}

export function getConfigSync() {
  const explorer = cosmiconfigSync('scrshot');

  const searched = explorer.search(process.cwd())

  if (searched === null) {
    throw new Error('Config not found');
  }

  return Config.parse(searched.config);
}