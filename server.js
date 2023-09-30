const express = require('express') 
const uuid = require('uuid')

const app = express()
app.use(express.json()) // Faz o sistema entender o json

const PORT = 3333
let DATA_BASE = []

app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: "Success",
        data: {
            todo: DATA_BASE
        }
    })
})

app.post('/', (req, res) => {
    const payload = req.body

    DATA_BASE.push({
        ...payload,
        id: uuid.v4()
    })
    return res.status(201).json({
        status: 201,
        message: "Created",
        data: {
            todo: payload
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