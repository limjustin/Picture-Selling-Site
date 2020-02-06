// DB = new Mongo.Collection('db');   //데이터베이스 객체 생성 예제
Article = new Mongo.Collection('article');
DB_TEST = new Mongo.Collection('test');

DB_TEST.insert({
    tags: [
        '야경',
        '도시',
        '나무'
    ]
})