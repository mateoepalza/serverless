import "reflect-metadata";
import { injectable } from "inversify";
import { Observable, of } from "rxjs";
// import { ajax } from "rxjs/ajax";
// import { switchMap } from "rxjs/operators";
import { IHelloGateway } from "../Repository/IHelloGateway";
import { HelloGatewayAPI } from "../Types/HelloGatewayAPI";
import axios from "axios";
import { pluck, switchMap, tap } from "rxjs/operators";

@injectable()
export class HelloGateway implements IHelloGateway{
    public getUser(id: string): Observable<HelloGatewayAPI>{
        if (id === "5") throw new Error("Hey assholes");
        const url = `https://reqres.in/api/users/${id}`;

        return of(1).pipe(
            switchMap( () => {
                return axios.get(url);
            }),
            tap( e => {
                console.log("Before data");
                console.log(e);
            }),
            pluck('data'),
            tap( e => {
                console.log("after data")
                console.log(e);
            })
        );
    }
}