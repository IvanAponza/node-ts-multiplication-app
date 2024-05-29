import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';


export const yarg = yargs(hideBin(process.argv))
.option('b', {
    alias: 'base',
    type: 'number',
    demandOption: true,
    describe: 'Multiplications table base'
})
.option('l', {
    alias: 'limit',
    type: 'number',
    default: 10,
    describe: 'Limit table multiplication'
})
.option('s', {
    alias: 'show',
    type: 'boolean',
    default: false,
    describe: 'Show table multiplication'
})
.option('n', {
    alias: 'name',
    type: 'string',
    default: 'muultiplication-table',
    describe: 'File Name'
})
.option('d', {
    alias: 'destination',
    type: 'string',
    default: 'outputs',
    describe: 'File destination'
})
.check(( argv, options) => {
    if(argv.b < 1) throw 'Error: la base debe ser mayor a 0';
    return true;
})
.parseSync()