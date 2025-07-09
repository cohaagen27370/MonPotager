npx swagger-typescript-api generate -p http://localhost:5000/swagger/v1/swagger.json --modular -o ./

npx openapi-typescript http://localhost:5000/swagger/v1/swagger.json --output generated-type.ts
