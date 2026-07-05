import dotenv from 'dotenv';
import mongoose from 'mongoose';
import InfoPage from './src/models/infoPage.mjs';
import Job from './src/models/job.mjs';
import FAQ from './src/models/faq.mjs';
import PressRelease from './src/models/pressRelease.mjs';

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
console.log('Connected to DB');

const infoCount = await InfoPage.countDocuments();
console.log('InfoPage count:', infoCount);
console.log('InfoPage pages:', await InfoPage.find({}, 'slug'));

const jobCount = await Job.countDocuments();
console.log('Job count:', jobCount);

const faqCount = await FAQ.countDocuments();
console.log('FAQ count:', faqCount);

const pressCount = await PressRelease.countDocuments();
console.log('PressReleases count:', pressCount);

process.exit(0);
