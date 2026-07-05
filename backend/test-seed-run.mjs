import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { seedDatabase } from './src/config/seedData.mjs';

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
console.log('Connected to DB');
await seedDatabase();
console.log('Seed database finished');
process.exit(0);
