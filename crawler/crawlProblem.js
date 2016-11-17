var casper = require('casper').create();
casper.options.clientScripts = ["./static/jquery/jquery-3.0.0.min.js"];
casper.options.viewportSize = {width: 1600, height: 950};

var 
    problems = casper.cli.get(0),
    username = casper.cli.get(1),
    password = casper.cli.get(2);

var 
    leetcode_url = "https://leetcode.com/",
    login_url = 'accounts/login/',
    logout_url = 'accounts/logout/';

casper.start(leetcode_url + login_url,function(){
    problems = JSON.parse(problems);
    this.fill('form.form-signin',{
        'login' : username,
        'password' : password
    },true);
});
casper.thenEvaluate(function(){
    $('button.btn.btn-primary').click();
});
casper.then(function(){
    var i = 0;
    var ret = [];
    this.each(problems,function(self,problem){
        var description = '';
        self.thenOpen(leetcode_url + 'problems/' + problem.link,function(){
            description += this.evaluate(function(){
                return $('.question-content').html(); 
            });
        });
        var code = '';
        self.thenOpen(leetcode_url + 'problems/' + problem.link + '/submissions', function(){
            this.evaluate(function(language){
                $('td:contains("'+language+'")').prev().prev().children(".status-accepted.text-success").get(0).click();
            },{language : problem.lang});
            this.waitForSelector(".ace_layer.ace_text-layer",function(){
                 code += this.evaluate(function(){
                    return $('.ace_layer.ace_text-layer').html();
                });
            });
        });
        self.then(function(){
            ret.push({
                id : problem.id,
                title : problem.title,
                lang : problem.lang,
                description : description,
                code : code
            }); 
        });
    });
    this.then(function(){
        console.log(JSON.stringify(ret));
    })
});
casper.run();