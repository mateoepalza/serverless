import "reflect-metadata";
import { S3 } from "aws-sdk/clients/all";
import { GetObjectOutput } from "aws-sdk/clients/s3";
import { inject, injectable } from "inversify";
import { of } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { Types } from "../Constants/Identifiers";
import { IS3Gateway } from "../Repository/IS3Gateway";

@injectable()
export class S3Gateway implements IS3Gateway{

    private _s3: S3;

    constructor(
        @inject(Types.S3Client) s3
    ){
        this._s3 = s3;
    }

    public putObject(Bucket: string, Key: string, Body: string){
        console.log("Llega")
        console.log(Bucket);
        console.log(Key);
        console.log(Body);
        return of(1).pipe(
            switchMap( () => {

                return this._s3.putObject({
                    Bucket,
                    Key,
                    Body,
                }).promise();
            }),
            map( () => true)
        )
    }

    public getObject(Bucket: string, Key: string){
        return of(1).pipe(
            switchMap( () => {
                return this._s3.getObject({
                    Bucket,
                    Key
                }).promise()
            }),
            map( (obj: GetObjectOutput) => <Buffer>obj)
        )
    }
}