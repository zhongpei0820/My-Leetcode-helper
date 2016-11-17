'use strict';
const fs = require('fs');
let problem = process.argv[2],
    lang = process.argv[3];

if(!problem || !/^\d$/.test(problem)) throw Error(`Invalid problem number "${problem}"`);
if(!lang) lang = 'java';
fs.open('temp.json','r+',(err,fd) => {
    if(err){
        if(err.code === "ENOENT"){
            writeProblems([{id : problem, lang : lang}]);
            return;
        }else{
            throw err;
        }
    }
    fs.readFile('temp.json',(err,data) => {
        if(err) throw err;
        data = JSON.parse(data);
        data.push({id : problem, lang : lang});
        writeProblems(data);
    });
});

let writeProblems = function(data){
     fs.writeFile('temp.json',JSON.stringify(data),err => {
        if(err) throw err;
        console.log(`Saved!`);
    });
};




