var casper = require('casper').create();
casper.options.clientScripts = ["./static/jquery/jquery-3.0.0.min.js"];

var url = 'https://leetcode.com/problemset/algorithms/';

casper.start(url, function(){
   this.waitForSelector('#question-app');
})
.then(function(){
    var content = this.evaluate(function(){
        var html = {}, page = 1;
        while(1){
            html[page++] = $('#question-app .reactable-data').html();
            if($('.reactable-next-page').length === 0) break;
            $('.reactable-next-page')[0].click();
        }
        return html;
    });
    console.log(JSON.stringify(content));
});

casper.run();