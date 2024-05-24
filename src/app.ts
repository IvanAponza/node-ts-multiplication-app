




//console.log(process.argv)

import { ServerApp } from "./presentation/server";
import { yarg } from "./config/plugin/yargs";


(async () => {
    await main();
})()

async function main() {
    //console.log(yarg)
    const { b: base, l:limit, s: showTable, n: fileName, d: fileDestination } = yarg
    ServerApp.run({ base, limit, showTable, fileName, fileDestination })
}