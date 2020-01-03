# CDK-EZ - AWS CDK the easy way

This package is a single-dependency project starter for TypeScript-based AWS CDK projects.

## Features

* Outputs a single javascript file per lambda handler file via `cdk-ez build`
* Bundles and treeshakes your code with [Rollup](https://github.com/rollup/rollup)
* ESLint configuration with sensible defaults (including prettier) via `cdk-ez lint` and `cdk-ez lint --fix`
* Jest test runner via `cdk-ez test`
* A quick-start command to create a ready-to-run project `npx cdk-ez init <dir>`
* Works great with Visual Studio code (hint: Install the ESLint and TypeScript extensions!)

## Quick Start

```
npx cdk-ez init mycdk
cd mycdk
npm run start
```

And now your code will live-rebuild. The quick start template includes a working REST API, so you can immediately deploy it:

```
$ npx cdk deploy

MyStack: deploying...

...

Outputs:
MyStack.endpointDynamic = https://aaaaaaaaaa.execute-api.region.amazonaws.com/prod/say/{say}
MyStack.endpointStatic = https://aaaaaaaaaa.execute-api.region.amazonaws.com/prod/hello
MyStack.apiEndpoint9349E63C = https://aaaaaaaaaa.execute-api.region.amazonaws.com/prod/

Stack ARN:
arn:aws:cloudformation:ca-central-1:000000000000:stack/MyStack/00000000-0000-0000-0000-000000000000
```

You can use the newly deploy hello world API resource by accessing the `MyStack.endpointStatic` output shown.
