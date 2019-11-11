var http = require('http'); // 1 - Import Node.js core module

var server = http.createServer(function (req, res) {   // 2 - creating server

    if (req.url == '/') { //check the URL of the current request
        
        // set response header
        res.writeHead(200, { 'Content-Type': 'text/html' }); 
        
        // set response content    
        res.write('<html><body><p>This is home Page.</p></body></html>');
        res.end();
    
    }
    else if (req.url == "/sendmail") {
        const { parse } = require('querystring');
        var nodemailer = require('nodemailer');
        if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                    var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'noordinmalango@gmail.com',
                        pass: '995751218'
                    }
                    });
                    var data = parse(body);
                    var mailOptions = {
                    from: 'noordinmalango@gmail.com',
                    to: 'nmalango@medcol.mw',
                    subject: 'Sending Email using Node.js',
                    text: data
                    };
            
                    transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                    });
                    res.end('ok');
            });
        }else
        {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<html><body><p>This is SendMail Page.</p></body></html>');
            res.end();
        }
        

    
    }
    else
        res.end('Invalid Request!');

});

server.listen(5000); //3 - listen for any incoming requests

console.log('Node.js web server at port 5000 is running..')