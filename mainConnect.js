import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://santiago:kovac@localhost:27017';
export const client = new MongoClient(url);
await client.connect()