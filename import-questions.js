#!/usr/bin/env node
'use strict';
const
    spawn = require('child_process').spawn,
    cherrio = require('cheerio'),
    insertProblems = require('./lib/db.js').insertProblems;

let collection = 'problems';

let get_problems = function(){

    let child_process = spawn('./node_modules/.bin/casperjs',['./crawler/crawl-problems.js']),
        content = "",
        problems = [];

    child_process.stdout.on('data',(chunk) => {
        content += chunk.toString();
    });

    child_process.on('close',(chunk) => {
        let pages = JSON.parse(content);
        for(let page in pages){
            let $ = cherrio.load(pages[page]);
            $('tr').each(function(){
                let problem = JSON.stringify({
                    number : $(this).children('td').eq(1).html(),
                    title : $(this).children('td').eq(2).children('div').children('a').html(),
                    acceptance : $(this).children('td').eq(4).html(),
                    difficulty : $(this).children('td').eq(5).html(),
                    link : $(this).children('td').eq(2).children('div').children('a').attr('href')
                });
                problems.push(JSON.parse(problem));    
            });
        }
        insertProblems(collection,problems);
    });
};

get_problems();
