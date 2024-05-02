import mongoose from 'mongoose';

export default async function run(uri: string) {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, {
      serverApi: { version: '1', strict: true, deprecationErrors: true },
    });
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } catch {
    console.error('Error connecting to MongoDB');
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
