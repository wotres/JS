const fs = require('fs')
const axios = require('axios')
const fileString = fs.readFileSync('.txt', 'utf8')
let resultListE1000 = []
let resultListE2000 = []
let resultList = []

async function API_Call(query, index){
    var OPTIONS = {
        headers: {'Content-Type': 'application/json'},
        url: null,
        body: null
    }
    let queryString = encodeURIComponent(query)
    const PORT = '10500'
    const BASE_PATH = '/parse'
    var HOST = 'http://1111'

    let url = HOST + ':' + PORT + BASE_PATH + '?query=' + queryString

    await axios.get(url)
        .then((response) => {
            const { data } = response
            const obj = {
                index,
                query,
                message: response.data,
            }
            if (data['error code'] === '1000') {
                resultListE1000.push(obj)
            } else if (data['error code'] === '2000') {
                resultListE2000.push(obj)
            } else {
                resultList.push(obj)
            }
        })
        .catch(response => console.error(response))
}

const khan = async () => {
    const list = fileString.split('\n')
    const start = Date.now()
    console.log(start)
    for (let i = 0; i <= list.length; i += 1) {
        if (list[i]) {
            await API_Call(list[i],i)
        }
    }
    const end = Date.now()
    console.log('takes... ' + (end - start))

    fs.writeFile('resultListE1000.txt', JSON.stringify(resultListE1000) , function(err){
        if(err) throw err
    })
    fs.writeFile('resultListE2000.txt', JSON.stringify(resultListE2000) , function(err){
        if(err) throw err
    })
    fs.writeFile('resultList.txt', JSON.stringify(resultList) , function(err){
        if(err) throw err
    })
}

khan()
