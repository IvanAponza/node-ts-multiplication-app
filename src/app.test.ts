
// process.argv = ['node', 'app.ts', '-b', '10'];
// import './app'
import {ServerApp} from './presentation/server';

describe('Test App.ts', () => {
    test('should call Server.run with values', async() => {
        
        const serverRunMock = jest.fn();
        ServerApp.run = serverRunMock
        process.argv = ['node', 'app.ts', '-b', '7', '-l', '10', '-s', '-n', 'test-file', '-d', 'test-destinations'];

        await import('./app');

        expect(serverRunMock).toHaveBeenCalledWith({
            base: 7,
            limit: 10,
            showTable: true,
            fileName: 'test-file',
            fileDestination: 'test-destinations'
        })
        
    })
})
