
// import { yarg } from './yargs';

import { checkArgumentos } from './checkArgument';


const runCommand = async( args: string[] ) => {
    process.argv = [...process.argv, ...args ]//cambia argv y add los new args. fn permite modificar el argv

    //Ahora ya se puede invocar yarg adapter
    const { yarg } = await import('./yargs');

    return yarg;
}

describe('Args.ts', () => {

    const originalArgv = process.argv;
    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    });

    it('should return default values', async() => {

        const argv = await runCommand(['-b', '5'])
        // console.log(argv)
        expect(argv).toEqual( expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'muultiplication-table',
            d: 'outputs',
        }));
        // console.log(yarg)

    });

    it('should return configuration with custom values', async() => {

        const argv = await runCommand(['-b', '7', '-l', '10', '-s', '-n', 'custom-name', '-d', 'custom-destination']);
        expect(argv).toEqual( expect.objectContaining({
            b: 7,
            l: 10,
            s: true,
            n: 'custom-name',
            d: 'custom-destination',
        }));
        
    });

    test('Should throw an error if the base is less than 1', () => {
        const argv = { b: 0 };
        expect(() => checkArgumentos(argv)).toThrow('Error: la base debe ser mayor a 0');
    });

    test('It should not throw an error if the base is greater than or equal to 1', () => {
        const argv = { b: 1 };
        expect(() => checkArgumentos(argv)).not.toThrow();

        const argvMayor = { b: 5 };
        expect(() => checkArgumentos(argvMayor)).not.toThrow();
    });
});
