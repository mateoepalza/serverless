const Types = {
    HelloService: Symbol.for('HelloService'),
    HelloGateway: Symbol.for("HelloGateway"),
    UserService: Symbol.for("UserService"),
    UserGateway: Symbol.for("UserGateway"),
    PersonGateway: Symbol.for("PersonGateway"),
    PersonService: Symbol.for("PersonService"),
    DynamoGateway: Symbol.for("DynamoGateway"),
    S3Gateway: Symbol.for("S3Gateway"),
    S3Client: Symbol.for("S3Client"),
}

export {Types};