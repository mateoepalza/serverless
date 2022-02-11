import { Types } from "../Constants/Identifiers";
import { myContainer } from "../Infraestructure/Container";
import { IHelloService } from "../Repository/IHelloService";



const hello = (event, context, callback) => {
    console.log("Entraaaaaa");

    const service = myContainer.get<IHelloService>(Types.HelloService);
    service.getHello(event).subscribe(d => {
        const response = {
            statusCode: 200,
            body: JSON.stringify(d)
        }

        return callback(null, response);
    });

    // const response = {
    //     statusCode: 200,
    //     body: JSON.stringify({
    //         name: "mateo"
    //     })
    // }

    // return callback(null, response)
    
}

export{ hello }