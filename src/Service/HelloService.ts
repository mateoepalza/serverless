import "reflect-metadata";
import { IHelloService } from "../Repository/IHelloService";
import { injectable, inject } from 'inversify';
import { Types } from '../Constants/Identifiers';
import { IHelloGateway } from "../Repository/IHelloGateway";
import { map, pluck, tap } from "rxjs/operators";

@injectable()
export class HelloService implements IHelloService{

    private _gateway: IHelloGateway;

    constructor(
        @inject(Types.HelloGateway) gateway: IHelloGateway
    ){
        this._gateway = gateway;
    }

    public getHello(event){
        return this._gateway.getUser(event.pathParameters.id).pipe(
            pluck('data'),
            tap(e => {
                console.log(e)
            }),
            map(e => {
                return({
                    name: e.first_name,
                    lastName: e.last_name,
                    age: 24
                })
            })
        );
    }
}