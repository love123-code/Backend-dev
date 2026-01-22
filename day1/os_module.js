const os = require("os");
const fs = require("fs");

setInterval(() => {

const totalMemory = os.totalmem()/(1024*1024*1024);
const freeMemory = os.freemem()/(1024*1024*1024);

const platform = os.platform()
const uptime = os.uptime()/(3600)

const model = os.cpus()[0].model

const systemlog = `Total Memory: ${totalMemory}
Free Memory: ${freeMemory}
Platform: ${platform}
Uptime: ${uptime}
CPU Model: ${model}

`;

fs.appendFile("system.log", systemlog, () => {});

}, 5000);