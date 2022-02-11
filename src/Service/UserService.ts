import "reflect-metadata";
import { inject, injectable } from "inversify";
import { forkJoin, iif, Observable, of } from "rxjs";
import { map, mergeMap, pluck, switchMap, tap } from "rxjs/operators";
import { Types } from "../Constants/Identifiers";
import { IUserGateway } from "../Repository/IUserGateway";
import { IUserService } from "../Repository/IUserService";
import { UserServiceResponse } from "../Types/UserServiceResponse";
import { IDynamoGateway } from "../Repository/IDynamoGateway";
import { IS3Gateway } from "../Repository/IS3Gateway";

@injectable()
export class UserService implements IUserService{

    private _gateway: IUserGateway;
    private _dynamoGateway: IDynamoGateway;
    private _s3: IS3Gateway;

    constructor(
        @inject(Types.UserGateway) gateway : IUserGateway,
        @inject(Types.DynamoGateway) dynamoGateway : IDynamoGateway,
        @inject(Types.S3Gateway) s3 : IS3Gateway
    ){
        this._gateway = gateway;
        this._dynamoGateway = dynamoGateway;
        this._s3 = s3;
    }

    public getUsers( event ){

        const personas = [];

        return this._gateway.getUserAPI(event.pathParameters.id).pipe(
            mergeMap( data => {
                personas.push({
                    id: data.id,
                    email: data.email,
                    name: `${data.first_name} ${data.last_name}`
                });
                
                return this._gateway.getUserAPI(""+(parseInt(event.pathParameters.id) + 1))
            }),
            mergeMap( data => {

                personas.push({
                    id: data.id,
                    email: data.email,
                    name: `${data.first_name} ${data.last_name}`
                });

                return this._gateway.getUserAPI(""+(parseInt(event.pathParameters.id) + 2))
            }),
            mergeMap( data => {

                personas.push({
                    id: data.id,
                    email: data.email,
                    name: `${data.first_name} ${data.last_name}`
                });

                return of<UserServiceResponse>({ personas });
            })
        );
    }

    // This method saves the user into dynamo
    public saveUser(event) {
        return of(1).pipe(
            switchMap( () => {
                console.log(event);
                return this._dynamoGateway.put(JSON.parse(event.body), process.env.TABLENAME);
            }),
            mergeMap<boolean, Observable<object>>( (d) => iif(
                () => d,
                of({
                    state: true,
                    msj: "Everything was saved"
                }),
                of({
                    state: false,
                    msj: "the data didn`t store"
                })
            ))
        )
    }

    // This method search for the user in dynamo
    public searchUser(event) {
        return of(1).pipe(
            switchMap( () => {
                return this._dynamoGateway.get("persons-table", event.pathParameters.id);
            })
        )
    }

    // This save the user into dynamo and then create a file in S3
    public saveUserBucket(event) {
        return this._gateway.getUserAPI(event.pathParameters.id).pipe(
            tap(d =>  console.log),
            switchMap( (d) => {
                console.log("[Start Dynamo put]");
                return forkJoin([
                    of(d), 
                    this._dynamoGateway.put( this._createStructure(d), process.env.TABLENAME)
                ])
            }),
            switchMap( ([data, dynamoResult]) => {
                console.log("[Start Dynamo get]");
                return forkJoin([
                    of(data), 
                    of(dynamoResult), 
                    this._dynamoGateway.get( process.env.TABLENAME, ""+data.id )
                ])
            }),
            switchMap( ([ data, dynamoResult, dynamoQueryResult ]) => {
                console.log("[Start S3]");
                console.log(dynamoQueryResult);
                const d = new Date();
                return this._s3.putObject( process.env.BUCKETNAME, `${d.getUTCMilliseconds()}.json`, JSON.stringify(dynamoQueryResult));
            }),
            map( res => {
                console.log(res);
                return {
                    status: res
                }
            })
        )
    }

    public createFileUser(event){
        return of(1).pipe(
            switchMap( () => {
                return this._gateway.getUserAPI(event.pathParameters.id)
            }),
            tap( (user) => console.log),
            pluck()
        )
    }

    private _createStructure(d) {
        return ({
            PersonId: ""+d.id,
            first_name: d.first_name,
            last_name: d.last_name,
            email: d.email,
            age: "12"
        })
    }

}