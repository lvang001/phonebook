// const http = require('http')
const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(express.json())

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :Person"))

let persons = [{
        id: 1,
        name: "Arto Hellas",
        number: "040-123456"
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523"
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345"
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122"
    }
]

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'text/plain' })
//   response.end('Hello World')
// })

//used to return 
// const app = http.createServer((request, response) => {
//     response.writeHead(200, { 'Content-Type': 'application/json' })
//     response.end(JSON.stringify(persons))
//   })
morgan.token('Person', (req, res) => {
    if (req.method === 'POST'){
        return JSON.stringify(req.body)
    }
    else{
    return null
    }
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    res.end(`Phonebook has info for 4 people ${new Date()}`)
    res.status(404).end()
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    console.log(person)

    if (persons) {
        res.json(persons)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return maxId + 1
}

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(404).json({
            error: 'content missing'
        })
    }

    if(body.name != undefined || body.number != undefined) {
        const match = persons.find(person => person.name == body.name)
        if(match != undefined) {
            return response.status(400).json({
                error: 'name must be unique'
            })
        }
        
    }
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)

    response.json(person)
})


const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)