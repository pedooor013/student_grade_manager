import http from 'http';
import {v4} from 'uuid';
//Porta do servidor
const port = 3000;
const grades = [];

//Criação do http
const server = http.createServer((request, response) =>{
    // funções para configurar a API
    const {method, url} = request;

    let body = "";
    request.on('data', chuck =>{
        body += chuck.toString();
    });

    request.on('end', () =>{

        const id = url.split('/')[2];

    if(url === '/grades' && method === 'GET'){
        response.writeHead(200, {'content-type': 'application/json'});
        response.end(JSON.stringify(grades));

    }
    else if(url === '/grades' && method === 'POST'){
        const { studentName, subject, grade} = JSON.parse(body);
        const newGrade = {id: v4(), studentName, subject, grade};
        grades.push(newGrade);
        response.writeHead(201, {'Content-Type': 'application/json'});
        response.end(JSON.stringify(newGrade));
    }
    else if(url.startsWith("/grades/") && method === "PUT"){
        if(!body){
            response.writeHead(400, {"Content-Type": "application/json"});
            return response.end(JSON.stringify({message: "Request body is required"}))
        }

        let data;
        try{
            data = JSON.parse(body);
        }catch{
            response.writeHead(400, { "Content-Type": "application/json" });
            return response.end(JSON.stringify({ message: "Invalid JSON format" }));    
        }
        const {studentName, subject, grade } = data;
        const gradeToUpdate = grades.find((g) => g.id === id)

        if(gradeToUpdate){
            if(gradeToUpdate !== undefined)
                gradeToUpdate.studentName = studentName;
            if(gradeToUpdate !== undefined)
                gradeToUpdate.subject = subject;
            if(gradeToUpdate !== undefined)
                gradeToUpdate.grade = grade;
            response.writeHead(200, {"Content-Type": "application/json"});
            response.end(JSON.stringify(gradeToUpdate));
        }else{
            response.writeHead(404, {'Content-Type': 'application/json'});
            response.end(JSON.stringify({message: 'Grade not found'}));
        }
    }

    else if(url.startsWith("/grades/") && method === "DELETE"){
        const index = grades.findIndex((g) => g.id === id); //diferença de find e findindex: Find retorna o objeto para ser alterado e o find index retorna a posição;
        
        if(index !== -1){
            grades.splice(index, 1);
            response.writeHead(204);
            response.end();
        }else{
            response.writeHead(404, {'Content-Type': 'application/json'});
            response.end(JSON.stringify({message: 'Grade not found'}));
        }

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
