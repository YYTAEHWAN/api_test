const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000;

app.use(cors())

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/dog', (req, res) => {
    res.send('강아지 월월')
  })

app.get('/cat', (req, res) => {
  res.send('고양이 야옹')
})

app.get('/user/:id', (req, res) => {
    // const p = req.params // 파라미터로 받는 방식
    // console.log(`req.params : ${p.id}`); // 파라미터로 받는 방식
    const q = req.query
    console.log(`req.query id : ${q.id}`);
    console.log(`req.query name : ${q.name}`);
    console.log(`req.query age : ${q.age}`);
    
    // res.send(q.id+"님 환영합니다!")
    res.json({'고객' : q.id})
})
  

app.get('/sound/:name', (req, res) => {
  const { name } = req.params

  if (name== "dog") {
    res.json({'sound' : '멍멍'})
  } else if(name == "cat") {
    res.json({'sound' : '야옹'})
  } else if(name == "pig") {
    res.json({'sound' : '꿀꿀'})
  } else (
    res.json({'sound' : '알수없음'})
  )

  
})

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`);
})

