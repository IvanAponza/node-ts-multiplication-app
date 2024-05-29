export function checkArgumentos(argv: { b: number }): boolean {
    if (argv.b < 1) {
        throw new Error('Error: la base debe ser mayor a 0');
    }
    return true;
}