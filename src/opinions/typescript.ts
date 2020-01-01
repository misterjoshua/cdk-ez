export async function getTypescriptConfig(): Promise<object> {
  return {
    compilerOptions: {
      sourceMap: true,
      outDir: './dist/',
      target: 'ES6',
      module: 'CommonJS',
      lib: ['ES6'],
      declaration: true,
      strict: true,
      noImplicitAny: true,
      strictNullChecks: true,
      noImplicitThis: true,
      alwaysStrict: true,
      noUnusedLocals: true,
      noUnusedParameters: false,
      noImplicitReturns: true,
      noFallthroughCasesInSwitch: true,
      inlineSources: true,
      experimentalDecorators: true,
      strictPropertyInitialization: false,

      resolveJsonModule: true,
      esModuleInterop: true,
      moduleResolution: 'Node',
    },
  };
}
