const express = require("express");
const bodyParser =  require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req, res){
    res.sendFile(__dirname+"/signup.html")
});

app.post("/", function(req, res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;  
  
  const data = {
    members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }
    ]
  };
  
  const jsonData = JSON.stringify(data);
  
  const url = "https://us8.api.mailchimp.com/3.0/lists/279ea1365d";

  const options = {
    method: "POST",
    auth: "vedant1:9570cf905d7893d50f783ea8df767963-us8"
  }

  const request = https.request(url, options, function(response) {
    response.on("data", function(data){
        console.log(JSON.parse(data));
    })
  })
  
  request.write(jsonData);
  request.end();

});



app.listen(3000, function(){
    console.log("server is running on 3000");
})




//API key 
//9570cf905d7893d50f783ea8df767963-us8


//List ID
//279ea1365d