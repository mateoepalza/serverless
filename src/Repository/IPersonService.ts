import { Observable } from "rxjs";
import { PersonServiceResponse } from "../Types/PersonServiceResponse";

export interface IPersonService{
    getPerson( event : object): Observable<PersonServiceResponse>
}