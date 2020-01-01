import * as cdk from "@aws-cdk/core";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";

export class HelloApi extends cdk.Construct {
  constructor(
    scope: cdk.Construct,
    id: string,
    resource: apigateway.IResource,
    say: string
  ) {
    super(scope, id);

    const fn = new lambda.Function(this, "helloFn", {
      runtime: lambda.Runtime.NODEJS_12_X,
      handler: "index.hello",
      code: lambda.Code.fromAsset("./dist/lambda/hello"),
      environment: {
        SAY: say
      }
    });

    resource.addMethod("any", new apigateway.LambdaIntegration(fn));
  }
}
