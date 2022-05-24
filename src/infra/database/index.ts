import { createConnection } from "typeorm";

createConnection()
// docker run --name database -p 5432:5432 -e POSTGRES_PASSWORD=1234 postgres
// docker start databasepcc