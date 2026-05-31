/**
 * pnpm hook 文件
 * 自动批准已知安全包的构建脚本
 */

function hook({
  allDependencies,
  dependencies,
  devDependencies,
  optionalDependencies,
  peerDependencies,
}) {
  // 已知安全的构建脚本包
  const safeBuildScripts = new Set([
    '@parcel/watcher',
  ]);

  return {
    allowedBuilds: {
      scripts: (packageName) => {
        return safeBuildScripts.has(packageName);
      },
    },
  };
}

module.exports = { hook };
