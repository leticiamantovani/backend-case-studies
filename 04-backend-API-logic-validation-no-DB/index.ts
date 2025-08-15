import express, { type Request, type Response } from 'express';

const app = express();
const port = 4001;

interface Message {
    id: number,
    text: string
}

const database: Message[] = [];


app.post("/messages", (req: Request, res: Response) => {
    const body = req.body;

    if(!body){
        return { status: 400, statusText: "Bad Request" }
    }

    database.push(body);

    return { status: 200, statusText: "Success" }

})

app.delete("/messages/:id", (req: Request, res: Response) => {
    const id = req.params.id;

    if(!id){
        return { status: 400, statusText: "Invalid ID" }
    }
    
    for (let i = 0; i < database.length; i++) {
        if (database[i] && database[i].id === id) {
            database.splice(i, 1)
            break
        }
    }


})

app.patch("/messages/:id", (req: Request, res: Response) => {
    const body = req.body;
    const id = req.params.id;

    if(!id){
        return { status: 400, statusText: "Invalid id" }
    }

    if(!body){
        return { status: 400, statusText: "Invalid body" }
    }

    for(let obj of database){
        if(obj.id === id){
            obj.id = body.id || obj.id
            obj.text = body.text || obj.text
        }
    }
   
    return { status: 200, statusText: "Success" }

})

app.get("/messages/:id", (req: Request, res: Response) => {
    const body = req.body;
    const id = req.params.id;

    if(!body){
        return { status: 400, statusText: "Bad Request" }
    }

    if(!id){
        return { status: 400, statusText: "Invalid id" }
    }

    for(const obj of database){
        if(obj.id === id){
            return { status: 200, statusText: "success", data: obj }
        }
    }

})

app.get("/messages", (req: Request, res: Response) => { //pagination
    const body = req.body;

    if(!body){
        return { status: 400, statusText: "Bad Request" }
    }

    console.log("New Message: ", body)

})

