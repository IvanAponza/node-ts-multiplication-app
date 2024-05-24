import fs from 'fs'

export interface SaveFileUseCase {
    execute: (option: SaveFileOptions) => boolean;
}

export interface SaveFileOptions {
    fileContent     : string;
    fileName?       : string;
    fileDestination?: string;
}

export class SaveFile implements SaveFileUseCase {
    execute({
        fileContent, 
        fileName = 'table', 
        fileDestination = 'outputs',
    }: SaveFileOptions): boolean {
        try {
            fs.mkdirSync(fileDestination, {recursive: true});
            fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent);
            console.log('File created!!!');
            return true;
        } catch (error) {
            //TODO wiston para logger del error
            console.error(error)
            return false;
        }
    }
}