import "reflect-metadata";
import  { DocumentClient, GetItemInput, GetItemOutput, PutItemInput } from 'aws-sdk/clients/dynamodb';
import { injectable } from 'inversify';
import { Observable, of, throwError } from "rxjs";
import { catchError, map, switchMap } from 'rxjs/operators';
import { IDynamoGateway } from '../Repository/IDynamoGateway';

@injectable()
export class DynamoGateway implements IDynamoGateway{

    public put( Item, TableName): Observable<boolean>{
        const client  =  this._createConenction();

        console.log(Item);
        const params: PutItemInput = {
            Item,
            TableName
        }

        return of(1).pipe(
            switchMap( () => {
                return  client.put(params).promise();
            }),
            catchError( err => {
                console.log(err);
                return throwError(err);
            }),
            map( () =>  true)
        )
    }

    public get(TableName, id): Observable<object>{
        const client = this._createConenction();

        const params: GetItemInput = {
            TableName,
            Key: {
                PersonId: id
            }
        }

        return of(1).pipe(
            switchMap( () => {
                return client.get(params).promise()
            }),
            catchError( err => {
                console.log(err);
                return throwError(err)
            }),
            map( (output: GetItemOutput) => output.Item)
        )
    }

    private _createConenction () {
        return new DocumentClient({
            region: "us-east-1"
        }); 
    }
}