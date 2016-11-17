#!/usr/bin/env node

/***
*      Import problems from leetcode, including id, title, link, difficulty and status.     
*      And insert those imformation into the database.
***/

'use strict';
const
    request = require('request'),
    insertProblems = require('./lib/db.js').insertProblems;

let collection = 'problems',
    url = 'https://leetcode.com/api/problems/algorithms/',
    problems = [];

request.get(url, (err,res,body) => {
    if(!err && res.statusCode === 200){  
        body = JSON.parse(body);
        let allProblemInfo = body.stat_status_pairs;
        for(let i in allProblemInfo){
            let problem = {
                "id" : allProblemInfo[i].stat.question_id,
                "title" : allProblemInfo[i].stat.question__title,
                "link" : allProblemInfo[i].stat.question__title_slug,
                "difficulty" : allProblemInfo[i].difficulty.level,
                "status" : allProblemInfo[i].status
            }
            problems.push(problem);
        }
        insertProblems(collection,problems);
    }
});


