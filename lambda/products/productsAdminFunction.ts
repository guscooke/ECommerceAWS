import { Product } from "aws-cdk-lib/aws-servicecatalog"
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda"
// This func will be invoked by "APIGATEWAY"_AUTHORIZER_CHANGE_DEPLOYMENT_LOGICAL_ID, 
// Need to pass APIGATEWAYEVENT and Returns to client APIGProxyREsult

export async function handler(event: APIGatewayProxyEvent, 
    context: Context): Promise<APIGatewayProxyResult>{
        
        const lambdaRequestId = context.awsRequestId
        const apiRequestId = event.requestContext.requestId

        console.log(`API Gateway requestId: ${apiRequestId} - lambda RequestId ${lambdaRequestId} `)

        if (event.resource === "/products"){
            console.log("POST /products")
            return {
                statusCode: 201,
                body: "POST /products "
            } 
        } else if (event.resource === "/products/{id}"){
            const productId = event.pathParameters!.id as string
            if (event.httpMethod === "PUT"){
                console.log(`PUT /products/${productId}`)
                return{
                    statusCode: 200,
                    body: `PUT /products/${productId}`
                }
            } else if (event.httpMethod === "DELETE"){
                console.log(`DELETE /products/${productId}`)
                    return {
                        statusCode: 200,
                        body: `DELETE /products/${productId}`
                    }
                }
            }
            return{
                statusCode: 400,
                body:"BAD request"
            }
            }
       
    