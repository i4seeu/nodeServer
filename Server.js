//Import the necessary libraries/declare the necessary objects
var express = require("express");
var myParser = require("body-parser");
const cors = require("cors");
var app = express();
app.use(cors());
app.use(myParser.urlencoded({extended : true}));
app.use(myParser.json());
app.post("/sendmail", function(request, response) {
    var nodemailer = require('nodemailer');
    data = request.body; //This prints the JSON document received (if it is a JSON document)
    //console.log(data.name);
    console.log("the query receieved");
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'noordinmalango@gmail.com',
        pass: '995751218'
    }
    });
    var body = 'We have received your query our agents will act upon your query \n'+'The following are the details you sent us\n'+
    'subject: '+data.subject+'\nMessage : '+data.message;
    var mailOptions = {
    from: 'noordinmalango@gmail.com',
    to: data.email,
    subject: 'Successfully received your query',
    text: body
    };

    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log("An error occured!!");
        response.setHeader('Content-Type', 'application/json');
        response.send(JSON.stringify({'success':0}));
    } else {
        console.log("successfully sent an email");
        response.setHeader('Content-Type', 'application/json');
        response.send(JSON.stringify({'success':1}));
    }
    });
    
}); 
//Start the server and make it listen for connections on port 8080
app.listen(5000);