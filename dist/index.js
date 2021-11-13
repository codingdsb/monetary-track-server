"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const typeorm_1 = require("typeorm");
const constants_1 = require("./constants");
const express_graphql_1 = require("express-graphql");
const schema_1 = require("./schema");
const graphql_playground_middleware_express_1 = __importDefault(require("graphql-playground-middleware-express"));
const User_1 = __importDefault(require("./entities/User"));
const Transaction_1 = require("./entities/Transaction");
const main = async () => {
    await (0, typeorm_1.createConnection)({
        type: "postgres",
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [User_1.default, Transaction_1.Transaction],
        logging: !constants_1.__prod__,
    });
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use("/gql", (0, express_graphql_1.graphqlHTTP)({
        schema: schema_1.schema,
        graphiql: true,
    }));
    app.get("/", (0, graphql_playground_middleware_express_1.default)({ endpoint: "/gql" }));
    app.listen(constants_1.PORT, () => {
        console.log(`Server is running on port ${constants_1.PORT}`);
    });
};
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map