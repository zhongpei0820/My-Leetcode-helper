var casper = require('casper').create();
casper.options.clientScripts = ["./static/jquery/jquery-3.0.0.min.js"];
casper.options.viewportSize = {width: 1600, height: 950};

var leetcode_url = "https://leetcode.com/",
    problem = casper.cli.get(0),
    lang = casper.cli.get(1),
    username = casper.cli.get(2),
    password = casper.cli.get(3);
var login_url = '/accounts/login/',
    logout_url = '/accounts/logout/';

casper.start(leetcode_url + login_url,function(){
    this.fill('form.form-signin',{
        'login' : username,
        'password' : password
    },true);    
})
.thenEvaluate(function(){
    $('button.btn.btn-primary').click();
})
.then(function(){
    this.open(leetcode_url + problem);    
})
.then(function(){
    var content = this.evaluate(function(){
            return $('.col-md-12').html();
        });
    console.log(content);
    this.open(leetcode_url + problem + '/submissions');
})
.thenEvaluate(function(language){ 
    $('td:contains("'+language+'")').prev().prev().children(".status-accepted.text-success").get(0).click();
},{language : lang})
.then(function(){
    var content = this.evaluate(function(){
        return $('.ace_layer.ace_text-layer').html();
    }); 
    console.log(content); 
})
.then(function(){
    this.open(leetcode_url + logout_url);
});

casper.run();