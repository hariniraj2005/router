 const fs=require('fs');
 const requestHandler=(req,res)=>{
    const url=req.url;
    const method=req.method;
    if(url ==='/'){
        fs.readFile('message.txt',{encoding : 'utf8'},(err,data)=>{
            if(err){
                console.log(err);
            }
        res.write('<html>')
        res.write('<head><title>Enter Message</title></head>')
        res.write(`<body>${data}</body>`)
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form></body>')
        res.write('</html>')
        return res.end()
    })
    }
    if(url ==='/message' && method==='POST'){
        const body=[];//it has something to do with the data the client entered 
        req.on('data',(chunk)=>{//the nodejs read the requests in chunks
            //console.log(chunk);
            body.push(chunk);
        })
         return req.on('end',()=>{
            const parsedBody=Buffer.concat(body).toString();
            //console.log(parsedBody);
            const message=parsedBody.split('=')[1];
            fs.writeFileSync('message.txt',message,err=>{
            res.statusCode=302;//in network section it shows after sending the data ,it status=302
            res.setHeader('Location','/')//setting the url to'/'
            return res.end();
            });
      });
        }
            res.setHeader('Content-Type','text/html');
            res.write('<html>');
           res.write('<head>');
           res.write('<title>My first page</title>');
           res.write('</head>');
           res.write('<body>');
           res.write('<h1>Hello from my Node.js Server!</h1>');
           res.write('</body>');
           res.write('</html>');
            res.end();
    }

    module.exports=requestHandler;
     