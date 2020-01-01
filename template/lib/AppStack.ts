import * as cdk from "@aws-cdk/core";
import * as apigateway from "@aws-cdk/aws-apigateway";
import { HelloApi } from "./HelloApi";

export class AppStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new apigateway.RestApi(this, "api");

    const newResource = (
      pathPart: string,
      parent: apigateway.IResource
    ): apigateway.Resource =>
      new apigateway.Resource(this, `${pathPart}Resource`, {
        parent: parent,
        pathPart: pathPart
      });

    new HelloApi(
      this,
      `staticApi`,
      newResource("hello", api.root),
      `hello from cdk`
    );

    const dynamicResource = newResource("say", api.root);
    new HelloApi(
      this,
      `dynamic`,
      newResource("{say}", dynamicResource),
      `{say} from cdk`
    );
  }
}

/**
 * https://82vs19ey5e.execute-api.ca-central-1.amazonaws.com/prod/hello
 * https://82vs19ey5e.execute-api.ca-central-1.amazonaws.com/prod/say/whattup
 */
