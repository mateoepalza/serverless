import { Observable } from "rxjs";
import { HelloGatewayAPI } from "../Types/HelloGatewayAPI";

export interface IHelloGateway{
    getUser( id: string ): Observable<HelloGatewayAPI>;
}