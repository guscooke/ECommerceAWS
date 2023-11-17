import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda"
// This func will be invoked by "APIGATEWAY"_AUTHORIZER_CHANGE_DEPLOYMENT_LOGICAL_ID, 
// Need to pass APIGATEWAYEVENT and Returns to client APIGProxyREsult

import { ProductRepository } from "/opt/nodejs/productsLayer"
import { DynamoDB } from "aws-sdk"

const productsDbd = process.env.PRODUCTS_DDB!
const ddbClient = new DynamoDB.DocumentClient()

const productRepository =  new ProductRepository(ddbClient, productsDbd)

export async function handler(event: APIGatewayProxyEvent, 
    context: Context): Promise<APIGatewayProxyResult>{
        
        const lambdaRequestId = context.awsRequestId
        const apiRequestId = event.requestContext.requestId

        console.log(`API Gateway requestId: ${apiRequestId} - lambda RequestId ${lambdaRequestId} `)
        const method = event.httpMethod
        if (event.resource === "/products"){
            if (method === 'GET'){
                console.log('GET / products')

                    
                const products = await productRepository.getAllProducts()
                return{
                    statusCode: 200,
                    body: JSON.stringify(products)
                }
            } 
        } else if (event.resource === "/products/{id}"){
            const productId = event.pathParameters!.id as string
            console.log(`GET /products/${productId}`)

            try{
                const product = await productRepository.getProductsById(productId)

                return {
                    statusCode: 200,
                    body: JSON.stringify(product)
                }
            } catch (error){
                console.error((<Error>error).message)
                return {
                    statusCode: 404,
                    body:(<Error>error).message
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


// geração de log consome CPUsage, gera Custos e somos cobrados por tempo de execução lambda