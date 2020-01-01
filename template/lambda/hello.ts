import { APIGatewayProxyHandler, APIGatewayProxyEvent } from "aws-lambda";
import lodashGet from "lodash/get";

export const hello: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      say: process.env.SAY?.replace(
        "{say}",
        lodashGet(event.pathParameters, "say", "")
      )
    })
  };
};
