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

    const staticResource = newResource("hello", api.root);
    new HelloApi(this, "staticApi", staticResource, "hello from cdk");
    new cdk.CfnOutput(this, "endpointStatic", {
      value: staticResource.url
    });

    const dynamicResource = newResource("{say}", newResource("say", api.root));
    new HelloApi(this, "dynamic", dynamicResource, `{say} from cdk`);
    new cdk.CfnOutput(this, "endpointDynamic", {
      value: dynamicResource.url
    });
  }
}
