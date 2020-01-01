# AWS Lambda Entrypoints

Scripts in this directory are your AWS Lambda entrypoints.

* `cdk-ez build` will create separate bundles for each dependency shown here
* In most cases dependencies will be included in each bundle
* The bundler will tree-shake unused code from the bundle
* Each Lambda entrypoint will be built into `dist/path/name/index.js`

# Creating a new Lambda Entrypoint

To create a new lambda entrypoint, create a new TypeScript file in this directory and it will be automatically included in the build.

```
$ echo 'export const hello = () => "";' >lambda/mylambda.ts

$ npm run build

> cdk-ez-test@1.0.0 build /home/user/proj/cdk-ez-test
> cdk-ez build

  ❯ Building lambdas
    ⠼ ./lambda/hello.ts
    ⠼ ./lambda/hello2.ts
    ⠼ ./lambda/mylambda.ts

$ ls dist/
lambda

$ ls dist/lambda
hello  hello2  mylambda

$ ls -l dist/lambda/mylambda
total 4
-rw-rw-r-- 1 user user 127 Dec 29 19:26 index.js
```

To use the lambda, create a CDK Lambda Function in a CDK component and reference the lambda in the dist directory:

```typescript
const fn = new lambda.Function(this, "mylambda", {
  runtime: lambda.Runtime.NODEJS_12_X,
  handler: "index.hello",
  code: lambda.Code.fromAsset('./dist/lambda/mylambda'),
});
```
