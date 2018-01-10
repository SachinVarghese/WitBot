const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const request = require('request');
const logic = require("./src/logic/response");


app.use(express.static('dist'));
app.use(bodyParser.json());
app.post("/witbot",function (req,res) {
    if(req.body.message){
        let date = new Date();
        let d = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
        let options = {
            url: "https://api.wit.ai/message?v="+d+"&q="+req.body.message,
            headers: {
                'authorization':"Bearer WSK224C5KNG5UIRTXIFEPLWFB64YUX7J",
            },
            method: 'GET',
            rejectUnauthorized: false
        };
        request(options, function(serror, response, body) {
            if(!serror){
                body = JSON.parse(body);
                if(body.entities.intent){
                    if( body.entities.intent.length>0){
                        res.status(200).send(logic(body));
                    }else {
                        res.status(500).send("No result");
                    }
                }else {
                    res.status(500).send("No result");
                }
            } else {
                res.status(500).send("No result");
            }
        });
    }
});
app.listen(3000, () => console.log('WitBot listening on port 3000!'));