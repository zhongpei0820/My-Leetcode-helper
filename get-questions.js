#!/usr/bin/env node
'use strict';
const
    queryProblem = require('./lib/db.js').queryProblem,
    queryUsername = require('./lib/db.js').queryUsername,
    formater = require('./lib/formater.js'),
    spawn = require('child_process').spawn,
    cheerio = require('cheerio'),
    fs = require('fs');

let 
    problem = process.argv[2],
    lang = process.argv[3];

let userinfo = '';

if(!lang) lang = 'java';

if(!problem || !/^\d+$/.test(problem)){
    throw Error('Invalid problem number');
}

queryUsername("user")
.then(res => {
    userinfo = res;
    queryProblem('problems',problem)
    .then((res) => {
        let child_process = spawn('./node_modules/.bin/casperjs',['./crawler/crawl-problem.js',res.link,lang,userinfo.username,userinfo.password]);
        let content = '';
        let path = userinfo.github + "/" + formater.getPath(lang,problem);
        child_process.stdout.on('data',(chunk) => {
            content += chunk.toString();
        });

        child_process.stdout.on('close',() => {
            let $ = cheerio.load(content);
            let title = $('.question-title h3').text().trim();
            let description = $('.question-content').children('p,pre').text();
            let my_code = '';
            $('.ace_line_group').children('.ace_line').each(function(){
                my_code += $(this).text() + '\n';
            });
            title = formater.formatTitle(title);
            description = formater.formatDescription(lang,description);
            fs.writeFile(path+title+"."+lang,description + '\n' + my_code,err => {
                if(err) throw err;
                console.log('saved!');
            });
        });
    })
    .catch((err) => {
        throw err;
    });
});
