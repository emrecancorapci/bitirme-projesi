import * as mongoDB from 'mongodb';

export const collections: { data?: mongoDB.Collection } = {};

export async function connectToDatabase() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI must be provided.');

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(uri, {
    serverApi: {
      version: mongoDB.ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();

  const database: mongoDB.Db = client.db('sensors');

  const dataCollection: mongoDB.Collection = database.collection('data-test');

  collections.data = dataCollection;

  console.log(
    `Successfully connected to database: ${database.databaseName} and collection: ${dataCollection.collectionName}`
  );
}
