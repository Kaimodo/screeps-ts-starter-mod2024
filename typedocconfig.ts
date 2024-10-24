module.exports = {
  entryPoints: ["src"],
  entryPointStrategy: `expand`,
  tsconfig: "tsconfig.json",
  out: "./docs",
  excludePrivate: true,
  excludeProtected: true,
  excludeExternals: true,
  readme: "README.md",
  name: "screeps-ts-starter-mod2024",
  includeVersion: true,
  plugin: ["typedoc-plugin-markdown", "typedoc-plugin-merge-modules"],
  mergeModulesMergeMode: "module",
  hideGenerator: true,
  validation: {
    invalidLink: true
  }
};
