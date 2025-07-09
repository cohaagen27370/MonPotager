https://openapi-generator.tech/docs/generators/typescript-fetch

java -jar swagger-codegen-cli-3.0.64.jar generate -i http://localhost:5000/swagger/v1/swagger.json -l typescript-angular -o generation
java -jar swagger-codegen-cli-3.0.55.jar generate -i http://localhost:5000/swagger/v1/swagger.json -l typescript-fetch -o generation-react
npx openapi-typescript@5.4.1 https://localhost:5001/swagger/v1/swagger.json --output generated-contracts.ts

npx @openapitools/openapi-generator-cli generate -i https://localhost:5001/swagger/v1/swagger.json -g typescript-fetch -o /tmp/test/