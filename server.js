const dotenv = require('dotenv');
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASS,
);
async function dbConnect() {
  await mongoose.connect(DB).then(() => console.log('DBCoonected...'));
}

dbConnect().catch((err) => console.log(err));

const port = process.env.PORT;
app.listen(port, () => console.log(`Natours app listening on port ${port}...`));
console.log('sanyog');
