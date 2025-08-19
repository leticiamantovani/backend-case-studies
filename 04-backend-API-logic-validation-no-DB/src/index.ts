import express, { type Request, type Response } from 'express';

const app = express();
const port = 4001;

interface Message {
    id: string,
    text: string
}

const database: Message[] = [];


app.post("/messages", (req: Request, res: Response) => {
    const body = req.body;

    if(!body){
        return res.status(400).json({message: "bad request"})
    }

    database.push(body);

    return res.status(200).json({ message: "success" })

})

app.delete("/messages/:id", (req: Request, res: Response) => {
    const id = req.params.id;

    if(!id){
        return res.status(400).json({message: "bad request"})
    }
    
    for (let i = 0; i < database.length; i++) {
        if (database[i] && database[i]?.id === id) {
            database.splice(i, 1)
            break
        }
    }

    return res.status(200).json({ message: "success" })

})

app.patch("/messages/:id", (req: Request, res: Response) => {
    const body = req.body;
    const id = req.params.id;

    if(!id){
        return res.status(400).json({message: "bad request"})
    }

    if(!body){
        return res.status(400).json({message: "bad request"})
    }

    for(let obj of database){
        if(obj.id === id){
            obj.id = body.id || obj.id
            obj.text = body.text || obj.text
        }
    }
   
    return res.status(200).json({ message: "success" })

})

app.get("/messages/:id", (req: Request, res: Response) => {
    const body = req.body;
    const id = req.params.id;

    if(!body){
        return res.status(400).json({message: "bad request"})
    }

    if(!id){
        return res.status(400).json({message: "bad request"})
    }

    const obj = database.find(m => m.id === id);

    return res.status(200).json({ message: "success", data: obj })
})

app.get("/messages", (req: Request, res: Response) => { //pagination
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    if (page < 1) page = 1;
    if (limit < 1) limit = 10;

    const start = (page - 1) * limit;
    const end = start + limit;
    const items = database.slice(start, end);

    return res.status(200).json({ page, limit, data: items });
})

