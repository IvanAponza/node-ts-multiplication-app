import { CreateTable } from "../domain/use-case/create-table.use-case";
import { SaveFile } from "../domain/use-case/savefile.use-case";

interface RunOptions {
    base: number;
    limit: number;
    showTable: boolean;
    fileName: string;
    fileDestination: string;
}

export class ServerApp {
    
    static run({ base, limit, showTable, fileName, fileDestination }: RunOptions){
        console.log("Server is running...");

        const table = new CreateTable().execute({ base, limit });
        const saveFile = new SaveFile().execute({ fileContent: table, fileName, fileDestination })
        if(showTable) console.log(table);
        (saveFile) ? console.log('Saved file!!!') : console.log('File not saved!!')
    }
}