import { Observable } from "rxjs";

export interface IS3Gateway{
    putObject(bucket : string, key: string, content: string) : Observable<boolean>;
    getObject(bucket : string, key: string): Observable<Buffer>
}