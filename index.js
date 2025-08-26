import http from 'http';
//Porta do servidor
const port = 3000;
const grades = [
    {
        "studentName": "Pedro",
        "subject": "English",
        "grade": "8"
    }
]

//Criação do http
const server = http.createServer((request, response) =>{
    // funções para configurar a API
    const {method, url} = request

    if(url === '/grades' && method === 'GET'){
        response.writeHead(200, {'content-type': 'application/json'});
        response.end(JSON.stringify(grades));
    }else{
        response.writeHead(404, {'Content-Type': 'application/json'});
        response.end(JSON.stringify({message: 'Route not found'}));
    }
});

server.listen(port, ()=>{ //Liga o servidor
    console.log(`Server running in port ${port}`);
});
