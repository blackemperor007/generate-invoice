import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
    throw new Error(
        "SVPL. definir la variable d'environnement MONGODB_URI dans le fichier .env.local"
    )
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

// connect db fonction 

export async function connectDB() {
    if (cached.conn) {
        return cached.conn
    }

    // la promise pour la connexion n'est pas etablit
    if (!cached.promise) {
        const options = {
            bufferCommands: false,
            maxPoolSize: 10,
        }
        cached.promise = mongoose.connect(MONGODB_URI, options).then(mongoose => mongoose.connection)
    }

    // promise en cours de connexion
    try {
        cached.conn = await cached.promise
    } catch (e) {
        cached.promise = null
        process.exit(1)
    }
}