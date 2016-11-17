#!/usr/bin/env node
'use strict';
const
    fs = require('fs'),
    queryProblem = require('./lib/db.js').queryProblem;
let problem = process.argv[2],
    lang = process.argv[3];

if(!problem || !/^\d+$/.test(problem)) throw Error(`Invalid problem number "${problem}"`);

problem = parseInt(problem);

if(!lang) lang = 'java';

queryProblem("problems", problem, (res)=> {
    let data = {id : problem, title : res.title, lang : lang, link : res.link};
    writeFile(data);
});

let writeFile = function(data){
    fs.open('temp.json','r+',(err,fd) => {
        if(err){
            if(err.code === "ENOENT"){
                writeProblems([data]);
                return;
            }else{
                throw err;
            }
        }
        fs.readFile('temp.json',(err,fd) => {
            if(err) throw err;
            fd = JSON.parse(fd);
            fd.push(data);
            writeProblems(fd);
        });
    });
};


let writeProblems = function(data){
     fs.writeFile('temp.json',JSON.stringify(data),err => {
        if(err) throw err;
        console.log(`Logged!`);
    });
};




