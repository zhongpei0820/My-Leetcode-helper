'use strict';

module.exports.formatTitle = function(title){
    return title.replace(/\. | /g,"_");
}

module.exports.formatDescription = function(lang,description){
    let comment = '//';
    lang = lang.toUpperCase();
    if(lang == 'PYTHON' || lang == 'RUBY') comment = '#';
    return description.split('\n').map(i => comment + i + '\n').join("");
}

module.exports.getPath = function(lang,problem){
    problem = problem / 100;
    lang = lang.toUpperCase();
    let dir = 'JAVA';
    if(lang == 'PYTHON') dir = 'Python';
    if(problem < 1) return dir + '/1-99/';
    else return dir +"/"+problem+'00-'+problem+'99/';
}

