import "reflect-metadata";
import axios from "axios";
import { Observable, of } from "rxjs";
import { mergeMap, pluck, switchMap, tap } from "rxjs/operators";
import { IUserGateway } from "../Repository/IUserGateway";
import { injectable } from "inversify";
import { UserGatewayResponse } from "../Types/UserGatewayResponse";

@injectable()
export class UserGateway implements IUserGateway {
    public getUserAPI( id : string): Observable<UserGatewayResponse>{

        const url = `https://reqres.in/api/users/${id}`;

        return of(1).pipe(
            switchMap( () => axios.get(url)),
            pluck('data', 'data'),
            tap( d => console.log)
        )
    }
}