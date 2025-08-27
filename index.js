import http from 'http';
import {v4} from 'uuid';
//Porta do servidor
const port = 3000;
const grades = [];

//Criação do http
const server = http.createServer((request, response) =>{
    // funções para configurar a API
    const {method, url} = request;

    let body = '';
    request.on('data', chuck =>{
        body += chuck.toString();
    });

    request.on('end', () =>{

    if(url === '/grades' && method === 'GET'){
        response.writeHead(200, {'content-type': 'application/json'});
        response.end(JSON.stringify(grades));
    }else if(url === '/grades' && method === 'POST'){
        const { studentName, subject, grade} = JSON.parse(body);
        const newGrade = {id: v4(), studentName, subject, grade};
        grades.push(newGrade);
        response.writeHead(201, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(newGrade));
    }
    
    else{
        response.writeHead(404, {'Content-Type': 'application/json'});
        response.end(JSON.stringify({message: 'Route not found'}));
    }

    });
});
server.listen(port, ()=>{ //Liga o servidor
    console.log(`Server running in port ${port}`);
});
