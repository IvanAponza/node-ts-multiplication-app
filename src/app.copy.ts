import fs from 'fs'
import { yarg } from './config/plugin/yargs';

//console.log(yarg)



let outputMessage = '';
const base = 5;
const headerMessage =`
===================================
    Tabla del ${ base }
===================================\n
`;

/** Crea la tabla */
for (let i = 1; i <= 10; i++) {
    outputMessage += `${base} x ${i} = ${base*i}\n`;
}

/** Muestra la tabla */
outputMessage = headerMessage + outputMessage;

console.log(outputMessage)
// if(showTable){
// }

//Si no existe el directorio lo crea 
const outputPath = `outputs`
fs.mkdirSync(outputPath, {recursive: true});

/** crear el archivo .txt en el directorio */
fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, outputMessage);
console.log('File created!!!');


