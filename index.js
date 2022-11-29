import express from "express"
import * as dotenv from "dotenv"
import { v4 as uuidv4} from "uuidv"


//habilitar o uso de variáveis de ambiente no servidor
dotenv.config()

//instanciar o express. Toda operação se dará por meio dessa variável
const app = express()

//configurando o servidor para que possa enviar e receber arquivos json.
app.use(express.json())



let data = [

    {
        documentName:"Licitação Enap - Curso Web Dev",
        status: "Em andamento",
        details:"Processo para capacitação de servidores públicos em desenvolvimento de aplicações na WEB. Parceria com IronHack",
        dateInit: "28/11/2022",
        comments: ["Processo aberto", "Proceso partiu para as partes assinarem", "Processo agora está em análise final",
                   "Processo já tem data final"],
        dateEnd:"16/12/2022",
        setor:"enap"

    }
]


app.get('/all', (request, response) => {

    const welcomeMsg = "Bem vindo ao servidor da turma 91 - IronHack"
    
    return response.status(200).json(welcomeMsg)

})


app.post('/create', (request, response) => {

    const newData = {
        //acrescenta um body à rquisição e acrescenta um id aleatório.
        ...request.body,
        id: uuidv4()
    }

    data.push(newData)
    return response.status(201).json(data)

})

app.put('edit/:id', (request, response) => {

    const {id} = request.params

    const update = data.find(item => item.id === id)
    const index = data.indexOf(update)
    
    data[index] = {

        ...update,
        ...request.body
    }

    return response.status(200).json(data[index])

})

app.delete('delete/:id', (request, response) => {

    const {id} = request.params

    const delData = data.find(item => item.id === id)
    const index = data.indexOf(update)
    
    data.splice(index, 1)

    return response.status(200).json(data)

})

app.listen(Number(process.env.PORT), () => {

    console.log("App up and running on port http://localhost:8080")

})
