#!/usr/bin/env node
'use strict';
const
    queryUsername = require('./lib/db.js').queryUsername,
    formater = require('./lib/formater.js'),
    spawn = require('child_process').spawn,
    cheerio = require('cheerio'),
    fs = require('fs');

fs.open('temp.json','r',(err) => {
    if(err){
        if(err.code === "ENOENT"){
            throw Error("No problems to get");
            return;
        }else{
            throw err;
        }
    }

    fs.readFile('temp.json',(err,data) => {
        if(err) throw err;
        crawlProblems(data.toString());
    });
});

let crawlProblems = function(problems){
    queryUsername("user", res => {
        let userinfo = res;
        let child_process = spawn('./node_modules/.bin/casperjs',['./crawler/crawlProblem.js',problems,userinfo.username,userinfo.password]);
        let content = '';
        child_process.stdout.on('data',(chunk) => {
            content += chunk.toString();
        });

        child_process.stdout.on('close',() => {
            problems = JSON.parse(content);
            for(let i in problems){
                let $ = cheerio.load(problems[i].description + problems[i].code);
                let description = $('p,pre').text();
                let my_code = '';
                $('.ace_line_group').children('.ace_line').each(function(){
                    my_code += $(this).text() + '\n';
                });
                // let testpath = './test/';
                let filepath = formater.getPath(problems[i].lang,problems[i].id);
                let path = userinfo.github + "/" + formater.getPath(problems[i].lang,problems[i].id);
                let filename = (problems[i].id > 9 ? problems[i].id  : '0' + problems[i].id) + "_" + formater.formatTitle(problems[i].title);
                let filetype = formater.getFileType(problems[i].lang);
                let filecontent = formater.formatDescription(problems[i].lang,description) + '\n' + my_code;
                fs.writeFile(path + filename + "." + filetype,filecontent,err => {
                    if(err) throw err;
                    console.log(`${filename}.${filetype} saved!`);
                    let gitpush_process = spawn('./github.sh',[userinfo.github,filepath + filename + "." + filetype]);
                    gitpush_process.stdout.on('data', (data) => {
                        console.log(data.toString());
                    });
                });
            }
            fs.unlink('temp.json', err => {
                if(err) throw err;
            });    
        });
    })
};

