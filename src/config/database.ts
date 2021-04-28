import { connect } from 'mongoose';

const mongoUri = process.env.MONGO_URI;

export default async function (): Promise<void> {
  try {
    await connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('🔥 Database is connected');
  } catch (error) {
    throw new Error(error.message);
  }
}
