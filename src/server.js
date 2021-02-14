let http = require('http');
let fs = require('fs');
let path = require('path');

 
let handleRequest = (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    if(request.url === "/"){
        fs.readFile('./src/index.html', null, function (error, data) {
            if (error) {
                response.writeHead(404);
                respone.write('Whoops! File not found!');
            } else {
                response.write(data);
            }
            response.end();
        });
    }else if(request.url.match("\.jpg$")){
        var imagePath = path.join(__dirname, 'public', request.url);
        var fileStream = fs.createReadStream(imagePath);
        response.writeHead(200, {"Content-Type": "image/jpg"});
        fileStream.pipe(response);
    }else{
        response.writeHead(404, {"Content-Type": "text/html"});
        response.end("No Page Found");
    }
};
 
http.createServer(handleRequest).listen(8000);