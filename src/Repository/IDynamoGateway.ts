import { Observable } from "rxjs";

export interface IDynamoGateway{
    put( Item: object, TableName: string, condition?: string): Observable<boolean>
    get( TableName: string, Key: string, condition?: string): Observable<object>
}