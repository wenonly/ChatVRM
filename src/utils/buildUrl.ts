import getConfig from "next/config";

/**
 * 为了在发布到GitHub Pages时能够加载资源，
 * 通过查看环境变量来在URL中添加仓库名
 */
export function buildUrl(path: string): string {
  const {
    publicRuntimeConfig,
  }: {
    publicRuntimeConfig: { root: string };
  } = getConfig();

  return publicRuntimeConfig.root + path;
}
