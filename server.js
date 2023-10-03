const express = require('express') 
const uuid = require('uuid') // Biblioteca para a randomização de IDs
const postgres = require('postgres')

const app = express()
app.use(express.json()) // Faz o sistema entender o json

const sql = postgres('postgres://postgres:caio1212@localhost:5432/to_do')

const PORT = 3333
let DATA_BASE = [] //Database local temporária


async function createList(status, title, desc) {
    console.log(status, title, desc)
    try {
        const created = await sql`
        INSERT INTO list (status_id, title, description)
        VALUES
            (${status}, ${title}, ${desc})
        RETURNING *; 
    ` 
    return created[0]; // Retorna o primeiro registro inserido
    } catch (error) {
        return error;
    }
}

async function searchList() {
    try {
        const search = await sql`
        SELECT 
            l.title, l.description, s.name
        FROM list AS l
        INNER JOIN status AS s
        ON l.status_id = s.id;
    ` 
    return search; 
    } catch (error) {
        return error;
    }
}



app.get('/', async (req, res) => { 
    const result = await searchList()

    res.status(200).json({
        status: 200,
        message: "Success",
        data: {
            todo: result
        }
    })
})

app.post('/', async (req, res) => {
    const payload = req.body // Pega os dados passados pelo usuário

    const result = await createList(
        payload.status_id, 
        payload.title,
        payload.description
    )

    return res.status(201).json({
        status: 201,
        message: "Created",
        data: {
            todo: result
        }
    })
})

app.put('/:id', (req, res) => {
    const id = req.params.id
    const payload = req.body

    DATA_BASE = DATA_BASE.map((item) => {
        if (item.id === id) {
            return {
                id: item.id,
                status: payload.status,
                title: payload.title,
                description: payload.description
            } 
        }
        return item
    }) 
    res.status(200).json(payload)
})

app.patch('/:id/:status', (req, res) => {
    const {id, status} = req.params //Desestrutura o objeto e recebe no ".params"

    DATA_BASE = DATA_BASE.map((item) => {
        if (item.id === id) {
            return {
                ...item,
                status: status
            } 
        }
        return item
    }) 
    res.status(200).json(DATA_BASE)
})

app.delete('/:id', (req, res) => {
    const id = req.params.id
    DATA_BASE = DATA_BASE.filter((item) => {
        if (item.id !== id) {
            return {
                id: item.id,
                status: item.status,
                title: item.title,
                description: item.description
            } 
        }
    }) 
    res.status(200).json(DATA_BASE)
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})