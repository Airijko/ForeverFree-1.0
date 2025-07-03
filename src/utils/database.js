import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('MongoDB: already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'foreverfree',
    });

    isConnected = true;
    console.log('MongoDB: connected');
  } catch (error) {
    console.log('MongoDB: error connecting', error);
  }
};
