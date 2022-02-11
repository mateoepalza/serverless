import { Types } from "../Constants/Identifiers";
import { myContainer } from "../Infraestructure/Container";
import { IUserService } from "../Repository/IUserService";


const handler = (event, context, callback) => {

    const service = myContainer.get<IUserService>(Types.UserService);

    service.getUsers(event).subscribe( (data) => {
        const response = {
            statusCode: 200,
            body: JSON.stringify(data)
        };
        return callback(null, response);
    })
    
}

export {handler}