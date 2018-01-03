/*
  익스프레스 모듈 사용
*/

var express = require('express');
var bodyParser = require('body-parser')
var app = express();
app.locals.pretty = true;
// 템플릿 엔진 연결
app.set('views', './views');
app.set('view engine', 'pug');
// 정적인 파일이 저장될 위치 -> 바로 호출 가능
app.use(express.static('public'));
// bodyParser를 거치면서 post로 들어온 내용 읽어들일 수 있게 함
app.use(bodyParser.urlencoded({ extended: false}))
app.get('/form', function(req, res){
    res.render('form');
});

app.post('/form_receiver', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  res.send(title +','+ description)
})

app.get('/form_receiver', function(req, res){
  var title = req.query.title;
  var description = req.query.description;
  res.send(title+','+description);
});

app.get('/topic/:id',function(req, res){
  var topics = [
    'Javascript is...',
    'Nodejs is...',
    'Express is...'
  ];
  var output = `
    <a href="/topic?id=0">JavaScript</a><br>
    <a href="/topic?id=1">Nodejs</a><br>
    <a href="/topic?id=2">Express</a><br>
    ${topics[req.query.id]}
  `
  res.send(output);
})
app.get('/topic/:id/:mode', function(req,res){
  res.send(req.params.id +' '+req.params.mode)
})

//  temp 라는 파일을 래더링 해서 보내줌 , 작성한 변수에 값 대입
app.get('/template', function(req, res){
  res.render('temp', {time:Date(), _title:'Pug'});
})
// 매개변수 처음 요청 , 두번째 응답
// get 메소드는 라우팅해줌(길찾음) 요청을 연결해줌
app.get('/', function(req, res){
  res.send('Hello home page');
});
// ${} 변수라는것 말해줌
app.get('/dynamic',function (req, res){
  var lis='';
  for(var i =0; i<5; i++){
    lis = lis +'<li>coding</li>'
  }
  var time = Date();
  var output = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title></title>
    </head>
    <body>
      Hello, Static!
      <ul>
        ${lis}
      </ul>
      <ul>
        ${time}
      </ul>
    </body>
  </html>
  `
  res.send(output)
})
app.get('/route', function(req, res){
  res.send('Hello Router, <img src ="/route.png")>')
})
app.get('/login', function(req, res){
  res.send('<h1>Login please</h1>')
});
app.listen(3000, function(){
  console.log('Connected 3000 port!');
});
