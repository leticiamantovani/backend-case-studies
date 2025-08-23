import * as express from "express";
import { type Request, type Response } from "express";

const app = express();
app.use(express.json());

interface IMessage {
    id: string
    text: string
    date: Date
}

const database: IMessage[] = [];

app.post("/messages", (req: Request, res: Response) => {
    const body = req.body;

    if(!body){
        return res.status(400).json({ message: "Invalid body" })
    }

    database.push(body);

    return res.status(200).json({ message: "Success" });

})

app.get("/messages/:id", (req: Request, res: Response) => {
    const id = req.params.id;

    if(!id){
        return res.status(400).json({ message: "Invalid id param" })
    }

    const message = database.find(m => m.id === id);

    if(!message){
        return res.status(404).json({ message: "Not found" })
    }

    return res.status(200).json({ message: "success", data: message })

})

app.patch("/messages/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    const body = req.body;

    const message = database.find(m => m.id === id);

    if(!message) return res.status(404).json({ message: "Not Found" })

        
    if (body.text) message.text = body.text;
    if (body.date) message.date = body.date;

    return res.status(200).json({ message: "success", data: message })

});

app.delete("/messages/:id", (req: Request, res: Response) => {
    const id = req.params.id;

    if(!id) return res.status(404).json({ message: "Not Found" })

    for(let i = 0; i < database.length; i++){
        if(database[i]?.id === id){
            database.splice(i, 1)
            break
        }
    }

    return res.status(200).json({ message: "Success" })

});

app.get("/messages", (req: Request, res: Response) => {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    if(page < 1) page = 1;
    if(limit < 1) limit = 10;

    const start = (page - 1) * limit
    const end = start + limit

    const data = database.slice(start, end);

    return res.status(200).json({ data })

})


// Por que fazemos o start em paginacao?
// 1. O que é page e limit

// page → o número da página que o usuário pediu (ex: página 1, página 2, etc.).

// limit → quantos registros você quer mostrar por página (ex: 10 itens por página).

// 2. Por que fazemos (page - 1) * limit

// Imagine que você tem 100 mensagens e quer mostrá-las em páginas de 10 itens cada.

// Página 1 → precisa começar no índice 0 do array
// (1 - 1) * 10 = 0

// Página 2 → precisa começar no índice 10 do array
// (2 - 1) * 10 = 10

// Página 3 → precisa começar no índice 20 do array
// (3 - 1) * 10 = 20

// Ou seja, o cálculo (page - 1) * limit serve para saber onde no array começar a cortar.

app.listen(4000, () => {
    console.log("COMEÇOU")
})