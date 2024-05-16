const path = require('node:path');
require('dotenv').config({ path: path.join(__dirname, 'config.env') });

const mongoose = require('mongoose');
const app = require('./app');

async function main() {
  try {
    await mongoose.connect(process.env.DB_HOST);
    console.log('Database connected.');
    const PORT = Number(process.env.PORT) || 3000;
    app.listen(PORT, () =>
      console.log(`Server listening for request on PORT ${PORT}.`)
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
