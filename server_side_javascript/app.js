/*
  익스프레스 모듈 사용
*/

var express = require('express');
var app = express();
// 매개변수 처음 요청 , 두번째 응답
// get 메소드는 라우팅해줌(길찾음) 요청을 연결해줌
app.get('/', function(req, res){
    res.send('Hello home page');
});
app.get('/login', function(req, res){
  res.send('<h1>Login please</h1>')
});
app.listen(3000, function(){
  console.log('Connected 3000 port!');
});
