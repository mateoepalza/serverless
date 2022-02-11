import { createSandbox, SinonSandbox, SinonStub } from "sinon";
import { IHelloGateway } from "../Repository/IHelloGateway";
import { myContainer } from '../Infraestructure/Container';
import axios from 'axios';
import { HelloGatewayAPI } from "../Types/HelloGatewayAPI";
import { expect } from "chai";
import { Types } from "../Constants/Identifiers";
import { Mock } from "ts-mockery";

describe("", () => {
   let gateway: IHelloGateway; 
   let box: SinonSandbox;

   beforeEach( () => {
       box = createSandbox();
       myContainer.snapshot();
   });

   afterEach( () => {
       box.restore();
       myContainer.restore();
   });


   it('Testing the ajax response', (done: Mocha.Done) => {

        // (<SinonStub>axios.get).returns(Promise.resolve({
        //     data: {
        //         id: "1",
        //         email: "mateoepalza@gmail.com",
        //         first_name: "Mateo",
        //         last_name: "Epalza",
        //         avatar: "s"
        //     }
        // }) );

        const ajx = box.stub(axios, 'get').returns(Promise.resolve({
            data: {
                id: "1",
                email: "mateoepalza@gmail.com",
                first_name: "Mateo",
                last_name: "Epalza",
                avatar: "s"
            }
        }))

       gateway = myContainer.get<IHelloGateway>(Types.HelloGateway);
       gateway.getUser("3").subscribe({
           error: done,
           next: (res: object) => {
               expect(ajx).to.be.calledWith("https://reqres.in/api/users/3");
               expect(ajx).have.been.calledOnce;
               expect(res).to.be.deep.eq({
                   id: "1",
                   email: "mateoepalza@gmail.com",
                   first_name: "Mateo",
                   last_name: "Epalza",
                   avatar: "s"
               });
               done();
           }
       })
   });
})