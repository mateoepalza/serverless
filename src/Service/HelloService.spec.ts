import { Types } from '../Constants/Identifiers';
import { myContainer } from '../Infraestructure/Container';
import { IHelloService } from '../Repository/IHelloService';
import { createSandbox, mock, SinonSandbox } from 'sinon';
import { Mock } from 'ts-mockery';
import { expect, use } from 'chai';
import { of } from 'rxjs';
import * as sinon_chai from 'sinon-chai';

// This gives more functionality to the assertions that we made
use(sinon_chai);

describe( "Testing HelloService - ", () => {
    let service : IHelloService;
    let box : SinonSandbox;

    beforeEach(() => {
        box = createSandbox();
        myContainer.snapshot();
    });

    afterEach(() => {
        box.restore();
        myContainer.restore();
    });

    it(" check getHello response", (done: Mocha.Done) => {

        const params  = Mock.of({
            pathParameters: {
                id: "3"
            }
        });

        // funcion que voy a usar como reemplazo
        const helloGatewayMock = box.stub().returns(
            of({
                data: {
                    id: 1,
                    email: "mateoepalzaramirez@gmail.com",
                    first_name: "Alfredo",
                    last_name: "Epalza",
                    avatar: "kjsdfklsjfd",
                }
            })
        );

        // Establezco un Mock para el HelloGateway donde establezco la funcion que quiero cambiar
        myContainer.unbind(Types.HelloGateway);
        myContainer.bind(Types.HelloGateway).toConstantValue({
            getUser: helloGatewayMock
        })

        // Uso la función que deseo probar
        service =  myContainer.get<IHelloService>(Types.HelloService);
        service.getHello(params).subscribe({
            error: done,
            next: (res: object) => {
                // The following line checks if we called once the function
                expect(helloGatewayMock).have.been.calledOnce;
                // The following checks if the parameter passed to the function is "3"
                expect(helloGatewayMock).to.be.calledWith("3");
                // The following checks if the result of the function is what we expect
                expect(res).to.be.deep.eq({
                    lastName:"Epalza",
                    name: "Alfredo",
                    age: 24
                });
                done();
            }
        })

    });

    it( "Check getHello error response", (done : Mocha.Done) => {

        // The parameters that the function will receive
        const event = Mock.of({
            pathParameters: {
                id: "5"
            }
        });

        // This i s the function that is going to replace the getUser function
        const helloGatewayStub = box.stub().returns(
            // be aware that we don't stablish anything be returned because the error will be executed before returning something 
            of()
        );

        // Establezco un Mock para el HelloGateway especificamente para la función "getUser"
        myContainer.unbind(Types.HelloGateway);
        myContainer.bind(Types.HelloGateway).toConstantValue(
            Mock.of({
                getUser: helloGatewayStub
            })
        );

        // We inject the service and we subscribe to check if we get the error
        service = myContainer.get<IHelloService>(Types.HelloService);
        service.getHello(event).subscribe({
            complete: done,
            error: (err: Error) => {
                expect(err.message).to.be.eq("Hey assholes")
            }
        })

    });
})