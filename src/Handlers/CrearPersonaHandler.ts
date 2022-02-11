import "reflect-metadata";
import { Types } from "../Constants/Identifiers"
import { myContainer } from "../Infraestructure/Container"
import { IUserService } from "../Repository/IUserService";

const handler = (event, context, callback) => {
    
    const servie = myContainer.get<IUserService>(Types.UserService);
    servie.saveUser(event).subscribe( data => {
        const result = {
            statusCode: 200,
            body: JSON.stringify(data)
        };

        return callback(null, result);
    })
}

export {handler};