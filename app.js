const mongoose = require('mongoose')

const url = 'mongodb+srv://user:pass@cluster0.r7cd9.mongodb.net/db1?retryWrites=true&w=majority'

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
.then( ()=> console.log('connect to mongo'))
.catch( (e)=> console.log('error: '+ e))

const personaSchema = mongoose.Schema({
    nombre:String,
    edad:Number,
    pais:String
}, {versionKey: false})

const PersonaModel = mongoose.model('personas', personaSchema)

// mostrar
const mostrar = async ()=>{
    const personas = await PersonaModel.find()
    console.log(personas)
}

// crear
const crear = async ()=>{
    const persona = new PersonaModel({
        nombre: 'Maty',
        edad: '45',
        pais: 'Chile'
    })
    const resultado = await persona.save()
    console.log(resultado)
}

// editar
const actualizar = async (id)=>{
    const persona = await PersonaModel.updateOne({_id:id},
    {
        $set: {
            nombre: 'Artola',
            pais: 'Mongolia'
        }
    })
    console.log(persona)
}

// eliminar
const eliminar = async (id)=>{
    const persona = await PersonaModel.deleteOne({_id:id})
    console.log(persona)
}

// eliminar varios
const killVarios = async ()=>{
    const varios = await PersonaModel.deleteMany({'pais':'Chile'})
    console.log(varios)
}

killVarios()