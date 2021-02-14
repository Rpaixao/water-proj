let http = require('http');
let fs = require('fs');
let path = require('path');

 
let handleRequest = (request, response) => {
    /*
     * Initialize the response
     */
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });

    /*
     *  If request is root (localhost:8000/, let's render the index.html file)
     */
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
    /*
     *  If request is a jpg file, let's serve what's inside the public folder (textures)
     */
    }else if(request.url.match("\.jpg$")){
        var imagePath = path.join(__dirname, 'public', request.url);
        var fileStream = fs.createReadStream(imagePath);
        response.writeHead(200, {"Content-Type": "image/jpg"});
        fileStream.pipe(response);
    /*
     *  For any other request, let's return a not found (only index.html and jpg files exist in this project)
     */
    }else{
        response.writeHead(404, {"Content-Type": "text/html"});
        response.end("No Page Found");
    }
};
 
/*
 * Run the server in the PORT 8000
 */ 
http.createServer(handleRequest).listen(8000);