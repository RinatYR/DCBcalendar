export const isDev = process.env.NODE_ENV === 'development';
export const isProd = !isDev;

const hash = isProd ? '.[contenthash]' : '';

export const filename = (ext: string) => `static/${ext}/[name]${hash}.${ext}`;
