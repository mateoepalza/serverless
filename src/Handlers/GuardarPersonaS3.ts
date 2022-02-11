import 'reflect-metadata';
import { Types } from "../Constants/Identifiers"
import { myContainer } from "../Infraestructure/Container"
import { IUserService } from "../Repository/IUserService"

const handler = (event, context, callback) => {

    const service = myContainer.get<IUserService>(Types.UserService);
    service.saveUserBucket(event).subscribe( d => {
        const resultado = {
            statusCode: 200,
            body: JSON.stringify(d)
        }

        return callback(null, resultado);
    })

}

export {handler}