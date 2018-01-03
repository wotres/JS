/*
  웹 서버 만들기
*/
// 모듈 호출할때 require, const : 변수
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
// res : 응답관련
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});
// 서버는 listen 이라는 메소드 가지고 있으므로 이를 통해 사용
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
