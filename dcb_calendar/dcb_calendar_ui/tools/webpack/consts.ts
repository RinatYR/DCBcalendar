export const isDev = process.env.NODE_ENV === "development";
export const isProd = !isDev;

const hash = ".[contenthash]";
const staticPath = isProd ? "static" : "static";

export const filename = (ext: string) =>
  `${staticPath}/${ext}/[name]${hash}.${ext}`;
