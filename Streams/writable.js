const fs = require("fs");

const path = require("path");

const inputfilepath = path.join(__dirname,"input.txt")


const outputfilepath = path.join(__dirname,"output.txt")

const readstream = fs.createReadStream(inputfilepath ,{encoding:"utf-8"});

const writestream = fs.createWriteStream(outputfilepath,{encoding:"utf-8"});

readstream.pipe(writestream)

writestream.on("finish",()=>{
    console.log("data has been written to output.txt");
});


