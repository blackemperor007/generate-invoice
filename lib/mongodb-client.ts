// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient, ServerApiVersion } from "mongodb"
 
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}
 
const uri = process.env.MONGODB_URI
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}
 
let client: MongoClient
 
if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient
  }
 
  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options)
  }
  client = globalWithMongo._mongoClient
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
}
 
// Export a module-scoped MongoClient. By doing this in a
// separate module, the client can be shared across functions.
export default client

// mongodb-client.ts - FICHIER CORRECT


// import { MongoClient } from 'mongodb'

// const uri = process.env.MONGODB_URI!
// const options = {}

// let client: MongoClient
// let clientPromise: Promise<MongoClient>

// if (process.env.NODE_ENV === 'development') {
//   // En développement, réutilisez le client via global
//   if (!(global as any)._mongoClientPromise) {
//     client = new MongoClient(uri, options)
//     ;(global as any)._mongoClientPromise = client.connect()
//   }
//   clientPromise = (global as any)._mongoClientPromise
// } else {
//   // En production, créez un nouveau client
//   client = new MongoClient(uri, options)
//   clientPromise = client.connect()
// }

// export default clientPromise // ← Export d'une PROMESSE