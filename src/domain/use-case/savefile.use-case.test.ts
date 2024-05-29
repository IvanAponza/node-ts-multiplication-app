import exp from 'constants';
import { SaveFile } from './savefile.use-case';
import fs from "fs";
describe('SaveFileUseCase', () => {

    const customOptions = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs',
        fileName: 'custom-table-name',
    }

    const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;
    

    afterEach(() => {
        //Clear Up borra la carpeta despues de cada prueba
        const outputFolderExist = fs.existsSync('outputs');
        if( outputFolderExist ) fs.rmSync('outputs', { recursive: true, });

        const customOutputFolderExist = fs.existsSync(customOptions.fileDestination);
        if( customOutputFolderExist ) fs.rmSync(customOptions.fileDestination, { recursive: true, });
        
    });
    test('should save file with default values', () => {

        //Preparamos las pruebas 
        const saveFile = new SaveFile();

        const filePath = 'outputs/table.txt';

        const options = {
            fileContent: 'test content'
        }

        //Ejecutamos el metodo
        const result = saveFile.execute(options);
        const fileExist = fs.existsSync(filePath);
        //revisa el content del archivo
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8'});
        
        //Resultado esperado - excepciones
        expect(result).toBe(true);
        expect( fileExist ).toBe( true );
        expect( fileContent ).toBe( options.fileContent );

    });

    test('should save file custom values', () => {

        const saveFile = new SaveFile();

        const result = saveFile.execute(customOptions);
        const fileExist = fs.existsSync(customFilePath);
        const fileContent = fs.readFileSync(customFilePath, { encoding: 'utf-8'});

        expect(result).toBe(true);
        expect(fileExist).toBe(true);
        expect(fileContent).toBe(customOptions.fileContent);
    });

    test('should return false if directory could not be create', () => {
        const saveFile = new SaveFile();
        //Spia que la funcion mkdir haya sido llamada y la sobbrescriebe con el throw new Error
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
            throw new Error('Error creating directory');
        });

        const result = saveFile.execute(customOptions);

        expect(result).toBe(false)

        mkdirSpy.mockRestore(); //Restaura la fn original
    });

    test('should return false if directory could not be create', () => {
        const saveFile = new SaveFile();
        //Spia que la funcion mkdir haya sido llamada y la sobbrescriebe con el throw new Error
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
            throw new Error('This is a custom writing error message from testing');
        });

        const result = saveFile.execute({fileContent: 'hola'});

        expect(result).toBe(false);
        
        writeFileSpy.mockRestore();
    });
});