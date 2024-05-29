import { CreateTable } from "../domain/use-case/create-table.use-case";
import { SaveFile } from "../domain/use-case/savefile.use-case";
import { ServerApp } from "./server";


describe('Server', () => {

    
    const options = {
        base: 2,
        limit: 10,
        showTable: false,
        fileName: 'test-fileName',
        fileDestination: 'test-Destination'
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });//limpiar mocks cada vez que se ejecute un test
    test('should create server instance', () => {
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp); //instancia de SereverApp
        expect(typeof ServerApp.run).toBe('function')//asegura que este el metodo estatico
    });
    
    //TEST INTEGRATIONS

    test('should run serverApp with options', () => {

        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn( CreateTable.prototype, 'execute');
        const saveFileSpy = jest.spyOn( SaveFile.prototype, 'execute'); 

        ServerApp.run(options);

        expect(logSpy).toHaveBeenCalledTimes(2)//Prueba que haya sido llamado 2
        expect(logSpy).toHaveBeenCalledWith('Server is running...');
        expect(logSpy).toHaveBeenLastCalledWith('File create!!!');

        expect(createTableSpy).toHaveBeenCalledTimes(1);//P. que haya sido llam
        expect(createTableSpy).toHaveBeenCalledWith({base: options.base, limit: options.limit})//P. que haya sido llamado con los params esperer

        expect(saveFileSpy).toHaveBeenCalledTimes(1);//P. que haya sido llamad
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileName: options.fileName,
            fileDestination: options.fileDestination
        })//P. que haya sido llamado con los params esperado

    });

    //TEST UNITARIOS

    test('should run with custom values mocked', () => {

        const logMock = jest.fn();
        const logErrorMock = jest.fn();
        const createTableMock = jest.fn().mockReturnValue('1 x 2 = 2');
        const saveFileMock = jest.fn().mockReturnValue(true);

        console.log = logMock;
        console.error = logErrorMock;
        CreateTable.prototype.execute = createTableMock;
        SaveFile.prototype.execute = saveFileMock;
        
        ServerApp.run(options);

        expect(logMock).toHaveBeenCalledWith('Server is running...');
        expect(createTableMock).toHaveBeenCalledWith({base: options.base, limit: options.limit});
        expect(saveFileMock).toHaveBeenCalledWith({
            fileContent: '1 x 2 = 2',
            fileName: options.fileName,
            fileDestination: options.fileDestination
        })
        expect(logMock).toHaveBeenCalledWith('File create!!!');
        expect(logErrorMock).not.toHaveBeenCalled();
    });

});