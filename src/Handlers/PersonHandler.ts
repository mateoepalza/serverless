import { Types } from "../Constants/Identifiers";
import { myContainer } from "../Infraestructure/Container";
import { IPersonService } from "../Repository/IPersonService";

const handler = (event, context, callback) => {

    const service = myContainer.get<IPersonService>(Types.PersonService);    
    
    service.getPerson(event).subscribe( data => {
        const response = {
            statusCode: 200,
            body: JSON.stringify(data)
        }
        return callback(null, response);
    })
}

export { handler }