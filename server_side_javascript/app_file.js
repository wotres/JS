var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
// 요청 가로채서 리퀘스트의 바디 객체에 접근 가능하게 해줌
app.use(bodyParser.urlencoded({ extened:false}));
app.locals.pretty = true;
// 여기 있는 파일을 읽겠다.
app.set('views', './views_file');
app.set('view engine', 'pug');
// 라우팅 -> 위 코드 통해 위치 경로 및 파일 종류 정하고 아래 render로 연결
app.get('/topic/new', function(req, res){
  fs.readdir('data',function(err, files){
    if(err){
      console.log(err);
      res.status(500).send('Internal Server Error')
    }
    res.render('new',{topics:files});
  });
});
// 해당 페이지 바로 호출가능 -> get을 이용하기 떄문
app.get(['/topic', '/topic/:id'], function(req, res){
  fs.readdir('data', function(err, files){
    if(err){
      res.status(500).send('Internal Server Error')
    }
    var id = req.params.id;
    // Id값이 있을때
    if(id){
      fs.readFile('data/'+id, 'utf8', function(err, data){
        if(err){
          console.log(err);
          res.status(500).send('Internal Server Error')
        }
        res.render('view', {topics:files, title:id, description:data});
      })
    }else{
      // render 는 파일템플릿 이름, 주입하고자 하는것 들어감
      res.render('view', {topics:files, title:'Welcom', description:'Hello, JavaScript for server.'});
    }
  })
});
// app.get('/topic/:id', function(req, res){
//   var id = req.params.id;
//   fs.readdir('data', function(err, files){
//     if(err){
//       console.log(err)
//       res.status(500).send('Internal Server Error')
//     }
//     fs.readFile('data/'+id, 'utf8', function(err, data){
//       if(err){
//         console.log(err);
//         res.status(500).send('Internal Server Error')
//       }
//       res.render('view', {topics:files, title:id, description:data});
//     })
//   })
// })
app.post('/topic', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  fs.writeFile('data/'+title, description, function(err){
    if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
    res.redirect('/topic/'+title);
  })
})
app.listen(3000, function(){
  console.log('Connected, 3000 port')
})
