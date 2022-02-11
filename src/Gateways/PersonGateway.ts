import "reflect-metadata";
import axios from "axios";
import { injectable } from "inversify";
import { of } from "rxjs";
import { mergeMap, pluck, tap } from "rxjs/operators";
import { IPersonGateway } from "../Repository/IPersonGateway";

@injectable()
export class PersonGateway implements IPersonGateway{

    public getPerson(id: string){
        const url = `${id}`;
        return of(1).pipe(
            mergeMap( () => {
                return axios.get(url);
            }),
            tap( d => console.log ),
            pluck('data'),
            tap( d => console.log ),
        )
    }
}