import { Observable } from "rxjs";
import { responseServiceAPI } from "../Types/responseServiceAPI";

export interface IHelloService{
    getHello(event): Observable<responseServiceAPI>;
}