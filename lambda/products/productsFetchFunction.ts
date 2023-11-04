import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda"

// This func will be invoked by "APIGATEWAY"_AUTHORIZER_CHANGE_DEPLOYMENT_LOGICAL_ID, 
// Need to pass APIGATEWAYEVENT and Returns to client APIGProxyREsult

export async function handler(event: APIGatewayProxyEvent, 
    context: Context): Promise<APIGatewayProxyResult>{

        const method = event.httpMethod

        if (event.resource === "/products"){
            if (method === 'GET'){
                console.log('GET')

                return{
                    statusCode: 200,
                    body: JSON.stringify({
                        message: "GET Products - OK"
                    })
                }
            }
        }
        return{
            statusCode: 400,
            body: JSON.stringify({
                message: "Bad Request"
            })
        }
    }




