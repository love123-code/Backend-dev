const fs = require("fs");

const path = require("path");

const inputfilepath = path.join(__dirname,"input.txt")

const readstream = fs.createReadStream(inputfilepath ,{encoding:"utf-8"});

readstream.on("data",(chunk)=>{
    console.log("data is reacived in chunk:",chunk);
});

readstream.on("end",()=>{
    console.log("readstream is end");
})

readstream.on("error",(err)=>{
    console.log("error occured",err.message);
})