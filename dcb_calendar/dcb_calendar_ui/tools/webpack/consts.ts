export const isDev = process.env.NODE_ENV === 'development';
export const isProd = !isDev;

const hash = isProd ? '.[contenthash]' : '';
const staticPath = isProd ? 'dcb_calendar/static/static' : 'static';

export const filename = (ext: string) => `${staticPath}/${ext}/[name]${hash}.${ext}`;
