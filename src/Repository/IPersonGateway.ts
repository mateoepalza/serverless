import { Observable } from "rxjs";
import { PersonGatewayResponse } from "../Types/PersonGatewayResponse";

export interface IPersonGateway{
    getPerson(id: string): Observable<PersonGatewayResponse>
}