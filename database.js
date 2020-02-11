// DB = new Mongo.Collection('db');   //데이터베이스 객체 생성 예제
Article = new Mongo.Collection('article');
// 사진 Database 생성
DB_PIC = new Mongo.Collection('picture');
DB_PIC.insert({
    test : ' ' // 아마 이게 하나인듯
});
// 여기에 DB 새롭게 만들 수 있음
