import { S3 } from 'aws-sdk';
import { Container } from "inversify";
import { Types } from "../Constants/Identifiers";
import { DynamoGateway } from "../Gateways/DynamoGateway";
import { HelloGateway } from "../Gateways/HelloGateway";
import { PersonGateway } from "../Gateways/PersonGateway";
import { S3Gateway } from '../Gateways/S3Gateway';
import { UserGateway } from "../Gateways/UserGateway";
import { IDynamoGateway } from "../Repository/IDynamoGateway";
import { IHelloGateway } from "../Repository/IHelloGateway";
import { IHelloService } from "../Repository/IHelloService";
import { IPersonGateway } from "../Repository/IPersonGateway";
import { IPersonService } from "../Repository/IPersonService";
import { IS3Gateway } from '../Repository/IS3Gateway';
import { IUserGateway } from "../Repository/IUserGateway";
import { IUserService } from "../Repository/IUserService";
import { HelloService } from "../Service/HelloService";
import { PersonService } from "../Service/PersonService";
import { UserService } from "../Service/UserService";

const myContainer = new Container();

myContainer.bind<IHelloGateway>(Types.HelloGateway).to(HelloGateway);
myContainer.bind<IHelloService>(Types.HelloService).to(HelloService);
myContainer.bind<IUserGateway>(Types.UserGateway).to(UserGateway);
myContainer.bind<IUserService>(Types.UserService).to(UserService);
myContainer.bind<IPersonGateway>(Types.PersonGateway).to(PersonGateway);
myContainer.bind<IPersonService>(Types.PersonService).to(PersonService);
myContainer.bind<IDynamoGateway>(Types.DynamoGateway).to(DynamoGateway);
myContainer.bind<IS3Gateway>(Types.S3Gateway).to(S3Gateway);
myContainer.bind<S3>(Types.S3Client).toConstantValue( new S3() )

export { myContainer };