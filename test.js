const axios = require('axios')
const fs = require('fs')
const fileString = fs.readFileSync('test.txt', 'utf8')
const list = fileString.split('\n')

let resultList = []
let arr = [];

function getCams(ip) {
  return axios.get(ip);
}

function getPresence(cams) {
  return new Promise((resolve) => {
    axios.all(cams.map(getCams))
      .then((responses) => {
        const { data } = responses

        for (let i = 0; i < list.length; i += 1) {
          const obj = {
              message: responses[i].data,
          }
          // console.log(responses[i].data)
          resultList.push(obj)
          resolve(resultList);
        }
      });
  });
}

function khan(){
  for (let i = 0; i < list.length; i += 1) {
    arr.push('http://localhost:3000')
  }
  // console.log(arr)
  getPresence(arr)
    .then((data) => {
      // console.log(data);
      fs.writeFile('test02.txt', JSON.stringify(data) , function(err){
        if(err) throw err
      })
    });
}
khan()

//////
/*const fs = require('fs')
const axios = require('axios')
const fileString = fs.readFileSync('test.txt', 'utf8')
const list = fileString.split('\n')
const apiURL = 'http://localhost:3000';
let resultList = []

const logPosts = async () => {
  try {
    let result = list.map(response => axios(`${apiURL}`));

    let weather = await Promise.all(result);
    weather.forEach(response => {
      console.log(response.data)
      resultList.push(response.data)
    });
  } catch (error) {
    console.error('Error:', error);
  }
};

logPosts();
*/
