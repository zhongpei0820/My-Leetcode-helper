#!/usr/bin/env node

/***
*      Setup your leetcode account ang github local repo directory.    
*      And insert those imformation into the database.
***/


'use strict';
let prompt = require('prompt');
let insertLeetCodeAccount = require('./lib/db.js').insertLeetCodeAccount;
prompt.start();
 
prompt.get([{
  description : 'Set your leetcode username',
  name : 'username',
  required : true
}, {
  description : 'Set your leetcode password',
  name : 'password',
  hidden : true,
  replace : '*',
  required : true,
},{
  description : 'Set your github project path',
  name : 'github',
  required : true
}], function (err, result) {
  console.log('Setting username and password');
  insertLeetCodeAccount("user",{
    "username" : result.username,
    "password" : result.password,
    "github" : result.github
  });
});