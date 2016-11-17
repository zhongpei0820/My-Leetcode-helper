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
                db.close();
            });
        }
    })
    .catch(err => {
        throw err;
    });
};

module.exports.queryProblem = function(collection,problem,callback){
    MongoClient.connect(url)
    .then(db => {
        assert.notEqual(problem,null);
        db.collection(collection).findOne({"id" : problem})
        .then(doc => {
            callback(doc);
            db.close();
        });           
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
    });
};

module.exports.queryUsername = function(collection,callback){
    MongoClient.connect(url)
    .then(db => {
        let c =db.collection(collection);
        c.findOne()
        .then(doc => {
            db.close();
            callback(doc);
        });

    })
    .catch(err => {
        throw err;
    });
}

