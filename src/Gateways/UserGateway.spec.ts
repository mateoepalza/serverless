import axios from "axios";
import { expect } from "chai";
import { of } from "rxjs";
import { createSandbox, SinonSandbox } from "sinon";
import { Types } from "../Constants/Identifiers";
import { myContainer } from "../Infraestructure/Container";
import { IUserGateway } from "../Repository/IUserGateway";
import { UserGatewayResponse } from "../Types/UserGatewayResponse";

describe("Testing the UserGateway", () => {
    let gateway: IUserGateway;
    let box : SinonSandbox;

    beforeEach(() => {
        box = createSandbox();
        myContainer.snapshot();
    });

    afterEach(() => {
        box.restore();
        myContainer.restore();
    });

    it(" testing getUser", (done : Mocha.Done) => {

        const axiosStub = box.stub(axios, 'get').returns( Promise.resolve({
            data:{
                data: {
                    id: "1",
                    first_name: "Mateo",
                    last_name: "Epalza",
                    email: "mateoepalzaramirez@gmail.com",
                    avatar: "123"
                }
            }
            
        }));

        gateway = myContainer.get(Types.UserGateway);
        gateway.getUserAPI("3").subscribe({
            error: done,
            next: ( res: UserGatewayResponse) => {
                expect(axiosStub).have.been.calledOnce;
                expect(res).to.be.deep.eq(
                    {
                        id: "1",
                        first_name: "Mateo",
                        last_name: "Epalza",
                        email: "mateoepalzaramirez@gmail.com",
                        avatar: "123" 
                    }
                );
                done()
            }
        });
    })
});