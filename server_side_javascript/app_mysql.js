var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var mysql = require('mysql');
var conn = mysql.createConnection({
  host  : 'localhost',
  user  : 'root',
  password  : '111111',
  database  : 'o2'
});
conn.connect();
var app = express();
// 요청 가로채서 리퀘스트의 바디 객체에 접근 가능하게 해줌
app.use(bodyParser.urlencoded({ extened:false}));
app.locals.pretty = true;
// 여기 있는 파일을 읽겠다.
app.set('views', './views_mysql');
app.set('view engine', 'pug');
// 라우팅 -> 위 코드 통해 위치 경로 및 파일 종류 정하고 아래 render로 연결
app.get('/topic/add', function(req, res){
  var sql = 'select id, title from topic';
  conn.query(sql, function(err, topics, fields){
    if(err){
      // 내부적으로는 로그 보이고 사용자에게는 아래와 같은 메시지 전달
      console.log(err);
      res.status(500).send('Internal Server Error')
    }
    res.render('add',{topics:topics});
  });
});
app.post('/topic/add', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var sql = 'insert into topic(title, description, author) values(?,?,?)';
  conn.query(sql, [title, description, author], function(err, result, fields){
    if(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }else{
      res.redirect('/topic/'+result.insertId);
    }
  });
})
app.get(['/topic/:id/edit'], function(req, res){
  var sql = 'select id, title from topic';
  conn.query(sql, function(err, topics, fields){
    var id =req.params.id;
    if(id){
      var sql = 'select * from topic where id=?';
      conn.query(sql, [id], function(err, topic, fields){
        if(err){
          // 내부적으로는 로그 보이고 사용자에게는 아래와 같은 메시지 전달
          console.log(err);
          res.status(500).send('Internal Server Error')
        }else{
          res.render('edit',{topics:topics, topic:topic[0]});
        }
      });
    }else{
      console.log('There is no id')
      res.status(500).send('Internal Server Error')
    }
  });
});
app.post(['/topic/:id/edit'], function(req,res){
  var title = req.body.title;
  var description = req.body.description;
  var author = req.body.author;
  var id = req.params.id;
  var sql ='update topic set title=?, description=?, author=? where id=?';
  conn.query(sql,[title, description, author, id], function(err, result, fields){
    if(err){
      // 내부적으로는 로그 보이고 사용자에게는 아래와 같은 메시지 전달
      console.log(err);
      res.status(500).send('Internal Server Error')
    }else{
      res.redirect('/topic/'+id);
    }
  })
});
app.get('/topic/:id/delete', function(req,res){
  var sql = 'select id, title from topic';
  var id = req.params.id;
  conn.query(sql, function(err, topics, fields){
    var sql = 'select * from topic where id=?';
    conn.query(sql,[id],function(err, topic){
      if(err){
        // 내부적으로는 로그 보이고 사용자에게는 아래와 같은 메시지 전달
        console.log(err);
        res.status(500).send('Internal Server Error')
      }else{
        if(topic.length === 0){
          console.log('There is no record.');
          res.status(500).send('Internal Server Error')
        }else{
          res.render('delete', {topics:topics, topic:topic[0]});
        }
      }
    });
  });
});
app.post('/topic/:id/delete', function(req,res){
  var id = req.params.id;
  var sql = 'delete from topic where id=?';
  conn.query(sql,[id],function(err, result){
    res.redirect('/topic/');
  });
});
// 해당 페이지 바로 호출가능 -> get을 이용하기 떄문
app.get(['/topic', '/topic/:id'], function(req, res){
  var sql = 'select id, title from topic';
  conn.query(sql, function(err, topics, fields){
    var id =req.params.id;
    if(id){
      var sql = 'select * from topic where id=?';
      conn.query(sql, [id], function(err, topic, fields){
        if(err){
          // 내부적으로는 로그 보이고 사용자에게는 아래와 같은 메시지 전달
          console.log(err);
          res.status(500).send('Internal Server Error')
        }else{
          res.render('view',{topics:topics, topic:topic[0]});
        }
      });
    }else{
      res.render('view', {topics:topics});
    }
  });
});


app.listen(3000, function(){
  console.log('Connected, 3000 port')
})
