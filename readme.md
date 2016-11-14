# Leetcode Helper

A small app in nodejs that helps me in crwaling problems and my solution and saving it in my local github repo, so I don't have to copy and paste from the website everytime I finished the problem.



### Current Functionalities:

1. Crawl problems from leetcode website with your leetcode account
2. Crawl problem descriptions and your code, then write into a file in your local github repo.(Auto comment the description and format the name of your code file.)



### Some notes 

CasperJs are used as crawler.

Mongodb are used to store the account information and problem information.

Of course one can simply stores those information in a local json file.



### Future improvment

1. Use github API to auto commit and push to your GitHub instead of saving it to local repo.
2. Save the information in a local json file instead of using a db.
3. CapserJs is relatively small than directly sending http request, so I will try to write my own crawler using http module in nodejs or expressjs
4. Wrtie a front-end of this application.









