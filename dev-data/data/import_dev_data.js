const dotenv = require('dotenv');
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASS,
);
async function dbConnect() {
  await mongoose.connect(DB).then(() => console.log('DBCoonected...'));
}

dbConnect().catch((err) => console.log(err));

///Reacd json File
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

//Import into DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('imported successfully');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

//Delete all data from DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('deleted successfully');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
