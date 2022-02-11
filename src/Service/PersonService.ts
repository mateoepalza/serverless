import "reflect-metadata";
import { inject, injectable } from "inversify";
import { map } from "rxjs/operators";
import { Types } from "../Constants/Identifiers";
import { IPersonGateway } from "../Repository/IPersonGateway";
import { IPersonService } from "../Repository/IPersonService";

@injectable()
export class PersonService implements IPersonService{

    private _gateway: IPersonGateway;

    constructor(
        @inject(Types.PersonGateway) gateway: IPersonGateway
    ){
        this._gateway = gateway;
    }

    public getPerson( event : any ) {
        return this._gateway.getPerson(event.pathParameters.id).pipe(
            map( d => ({
                id: d.id,
                name: d.last_name,
                email: d.email
            }))
        )
    }
}