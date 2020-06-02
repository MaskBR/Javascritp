var express=require('express');
var app=express();
var url=require('url')
var fs=require('fs')
var cors=require('cors');

app.use(cors())

app.get('/',function(req,res){
    var query=url.parse(req.url,true).query;
    console.log(query.guessCount)
    guessCount=Number(query.guessCount)
    if(guessCount==1){
        var randomNumber = Math.floor(Math.random()*1000)+1;
        randomNumber=randomNumber.toString();
        fs.writeFile('./tmp.txt',randomNumber,'utf8',(err,data)=>{
            console.log('randomNumber has stored')
        })
    }else if(guessCount>1){
        randomNumber=Number(fs.readFileSync('./tmp.txt'))
    }
    guessNum=Number(query.userGuess);
    console.log(randomNumber)
    if(guessNum>randomNumber){
        res.send('high')
    }else if(guessNum==randomNumber){
        res.send('right')
    }else{
        res.send('low')
    }
})
app.listen(2233);
console.log('Server start')
