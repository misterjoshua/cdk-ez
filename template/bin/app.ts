import * as cdk from "@aws-cdk/core";
import { AppStack } from "../lib/AppStack";

const app = new cdk.App();
new AppStack(app, "MyStack");
