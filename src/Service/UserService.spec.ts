import { expect } from "chai";
import { of } from "rxjs";
import { createSandbox, SinonSandbox } from "sinon";
import { Mock } from "ts-mockery";
import { Types } from "../Constants/Identifiers";
import { myContainer } from "../Infraestructure/Container";
import { IUserService } from "../Repository/IUserService";

describe("Testing UserService", () => {
    let service: IUserService;
    let box: SinonSandbox;

    beforeEach( () => {
        box = createSandbox();
        myContainer.snapshot();
    });

    afterEach( () => {
        box.restore();
        myContainer.restore();
    });

    it( "Testing getUser sending different values", (done: Mocha.Done) => {
        const event = Mock.of({
            pathParameters: {
                id: "3"
            }
        });

        /**
         * Be aware that in here we are checking what to return when we call this method with an especific argument,
         * Be aware that the getUsers() Service method that we are using calls 3 times the getUserAPI()
         *  - The first time calls it with "3" argument ( this is the value that we define above )
         *  - The second time calls it with "31" argument 
         *  - The third time calls it with "32" argument
         * So, depending on the argument passed i define a return value
         */
        const getUserAPIMock = box.stub();
        getUserAPIMock.withArgs("3").returns(of({
            id: "1",
            first_name: "Mateo",
            last_name: "Epalza",
            email: "mateoepalzaramirez@gmail.com",
            avatar: "123"
        })).withArgs("4").returns(of({
            id: "2",
            first_name: "Juan",
            last_name: "Rodriguez",
            email: "mateoepalzaramirez@gmail.com",
            avatar: "123"
        })).withArgs("5").returns(of({
            id: "3",
            first_name: "Pedro",
            last_name: "Duque",
            email: "mateoepalzaramirez@gmail.com",
            avatar: "123"
        }))

        myContainer.unbind(Types.UserGateway);
        myContainer.bind(Types.UserGateway).toConstantValue({
            getUserAPI: getUserAPIMock
        });

        service = myContainer.get<IUserService>(Types.UserService);
        service.getUsers( event ).subscribe({
            error: done,
            next: (res: object) => {
                expect(res).to.be.deep.eq(
                    {
                        personas: [
                            {
                                id: "1",
                                email: "mateoepalzaramirez@gmail.com",
                                name: "Mateo Epalza"
                            },
                            {
                                id: "2",
                                email: "mateoepalzaramirez@gmail.com",
                                name: "Juan Rodriguez"
                            },
                            {
                                id: "3",
                                email: "mateoepalzaramirez@gmail.com",
                                name: "Pedro Duque"
                            },
                        ]
                    }
                )

                done();
            }
        }) 
    })

    it( "Testing getUser returning different values", (done: Mocha.Done) => {
        const event = Mock.of({
            pathParameters: {
                id: "3"
            }
        });


        const getUserAPIMock = box.stub().onCall(0).returns(of({
            id: "1",
            first_name: "Mateo",
            last_name: "Epalza",
            email: "mateoepalzaramirez@gmail.com",
            avatar: "123"
        })).onCall(1).returns(of({
            id: "2",
            first_name: "Juan",
            last_name: "Rodriguez",
            email: "mateoepalzaramirez@gmail.com",
            avatar: "123" 
        })).onCall(2).returns(of({
            id: "3",
            first_name: "Pedro",
            last_name: "Duque",
            email: "mateoepalzaramirez@gmail.com",
            avatar: "123"
        }));

        myContainer.unbind(Types.UserGateway);
        myContainer.bind(Types.UserGateway).toConstantValue({
            getUserAPI: getUserAPIMock
        });

        service = myContainer.get<IUserService>(Types.UserService);
        service.getUsers( event ).subscribe({
            error: done,
            next: (res: object) => {
                expect(res).to.be.deep.eq(
                    {
                        personas: [
                            {
                                id: "1",
                                email: "mateoepalzaramirez@gmail.com",
                                name: "Mateo Epalza"
                            },
                            {
                                id: "2",
                                email: "mateoepalzaramirez@gmail.com",
                                name: "Juan Rodriguez"
                            },
                            {
                                id: "3",
                                email: "mateoepalzaramirez@gmail.com",
                                name: "Pedro Duque"
                            },
                        ]
                    }
                )

                done();
            }
        }) 
    })

    it("Testing getUser " , (done: Mocha.Done) => {

        const event = Mock.of({
            pathParameters: {
                id: "3"
            }
        });


        const getUserAPIMock = box.stub().returns(of({
            id: "1",
            first_name: "Mateo",
            last_name: "Epalza",
            email: "mateoepalzaramirez@gmail.com",
            avatar: "123"
        }));

        myContainer.unbind(Types.UserGateway);
        myContainer.bind(Types.UserGateway).toConstantValue({
            getUserAPI: getUserAPIMock
        });

        service = myContainer.get<IUserService>(Types.UserService);
        service.getUsers( event ).subscribe({
            error: done,
            next: (res: object) => {
                // Checks that the method has been call 3 times
                expect(getUserAPIMock).have.been.calledThrice;
                // Checks the parameters passed in the first call
                expect(getUserAPIMock.firstCall).have.been.calledWith("3");
                // Checks the parameter passed in the second call
                expect(getUserAPIMock.secondCall).have.been.calledWith("4");
                // Check the parameter passed in the n -1 call
                expect(getUserAPIMock.getCall(2)).have.been.calledWith("5");
                // checks the return 
                expect(res).to.be.deep.eq(
                    {
                        personas: [
                            {
                                id: "1",
                                email: "mateoepalzaramirez@gmail.com",
                                name: "Mateo Epalza"
                            },
                            {
                                id: "1",
                                email: "mateoepalzaramirez@gmail.com",
                                name: "Mateo Epalza"
                            },
                            {
                                id: "1",
                                email: "mateoepalzaramirez@gmail.com",
                                name: "Mateo Epalza"
                            },
                        ]
                    }
                )

                done();
            }
        })
    });

});