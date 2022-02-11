import { Observable } from "rxjs";
import { UserServiceResponse } from "../Types/UserServiceResponse";

export interface IUserService{
    getUsers(event): Observable<UserServiceResponse>
    saveUser(event): Observable<object>
    searchUser(event): Observable<object>
    saveUserBucket(event): Observable<object>
}