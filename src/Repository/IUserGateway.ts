import { Observable } from "rxjs";
import { UserGatewayResponse } from "../Types/UserGatewayResponse";

export interface IUserGateway{
    getUserAPI(id: string): Observable<UserGatewayResponse>;
}