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
  //theme: "markdown",
  plugin: ["typedoc-plugin-markdown"],
  hideGenerator: true,
  validation: {
    invalidLink: true
  }
};
