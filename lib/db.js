const  
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

let url = `mongodb://localhost:27017/leetcode-helper`;

module.exports.insertProblems = function(collection,documents){
    MongoClient.connect(url)
    .then(db  => {
        console.log('connected successfully to server');
        let c = db.collection(collection);
        for(let start = 0; start < documents.length; start += 100){
            let end = start + 100 < documents.length ? start + 100 : documents.length;
            console.log(`inserting ${start + 1} to ${end} problems`);
            c.insertMany(documents.slice([start,end]))
            .then((r) => {
                assert.equal(end - start,r.insertedCount);
                console.log(`${end - start} problems inserted successfully`);
            });
        }
        db.close();
    })
    .catch(err => {
        throw err;
    });
};

module.exports.queryProblem = function(collection,problem_number){
    return MongoClient.connect(url)
    .then(db => {
        assert.notEqual(problem_number,null);
        let res = db.collection(collection).findOne({"number" : problem_number});
        db.close();
        return res;
    })
    .then(res => {
        assert.notEqual(res.number,null);
        return res;
    })
    .catch(err => {
        throw err;
    });
};

module.exports.insertLeetCodeAccount = function(collection,documents){
    MongoClient.connect(url)
    .then(db => {
        let c = db.collection(collection);
        c.insertOne(documents)
        .then(r => {
            assert.equal(1,r.insertedCount);
            db.close();
        });
    })
    .catch(err => {
        throw err;
        db.close();
    })
};

module.exports.queryUsername = function(collection){
    return MongoClient.connect(url)
    .then(db => {
        let c =db.collection(collection);
        res = c.findOne();
        db.close();
        return res;
    });
}

