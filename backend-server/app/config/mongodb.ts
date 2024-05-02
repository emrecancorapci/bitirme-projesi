import { MongoClient, ServerApiVersion } from 'mongodb';
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const clientCaller = (uri: string) =>
  new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

export default async function runDatabase(uri: string) {
  const client = clientCaller(uri);
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
    return client;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

export async function crud(databaseName: string, collectionName: string) {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI must be provided.');
  const mongoClient = await runDatabase(uri);
  if (!mongoClient) throw new Error('MongoClient not found.');

  try {
    return () => mongoClient.db(databaseName).collection(collectionName);
  } finally {
    await mongoClient.close();
  }
}
