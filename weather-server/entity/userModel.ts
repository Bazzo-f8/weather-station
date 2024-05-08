import mongoose from "mongoose";
const { Schema } = mongoose;

//SCHEMA -> Definisco struttura dei dati per una collezione MongoDB
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    favourites: {
        type: [],
        default: []
    }
})

/*MODEL -> Costruttore per lo schema
+ Converto lo schema in un modello
+ l'istanza creata dal costruttore viene chiamata documento
+ i model sono responsabili della creazione e della lettura di documenti dal db Mongo*/
const User = mongoose.model('User', userSchema)

export default User
