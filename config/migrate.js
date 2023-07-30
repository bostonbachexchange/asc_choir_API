const mongoose = require('mongoose');
const User = require('../app/models/user'); // Update the path to your User model

const mongooseBaseName = ''; // Replace this with your actual database name

// create the mongodb uri for development and test
const database = {
  development: `mongodb://127.0.0.1/${mongooseBaseName}-development`,
  test: `mongodb://127.0.0.1/${mongooseBaseName}-test`,
};

// Identify if development environment is test or development
// select DB based on whether a test file was executed before `server.js`
const mongodbUri = process.env.TESTENV ? database.test : database.development;

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

db.once('open', async () => {
  console.log('Connected to MongoDB.');

  // Your migration logic goes here

  // For example, if you want to update all users to have default settings
  const users = await User.find({});
  for (const user of users) {
    if (!user.settings) {
      user.settings = {
        receiveBlogNotifications: true,
        receiveServiceNotifications: true,
      };
      await user.save();
    }
  }

  console.log('Migration complete.');

  // Close the MongoDB connection after the migration is complete
  mongoose.connection.close();
});
