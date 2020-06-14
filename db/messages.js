const Joi = require('joi');
const db = require('./connection');

// * username - default to anonymous
// * subject
// * message
// * imageURL
// * created

const schema = Joi.object().keys({
  username: Joi.string().max(25),
  subject: Joi.string().max(50).required(),
  message: Joi.string().max(500).required(),
  imageURL: Joi.string().uri({
    scheme: [
      /https?/
    ]
  })
});

const messages = db.get('messages');

function getAll() {
  return messages.find();
}

function create(message) {
  const gifs = ["https://media.giphy.com/media/BWQVFNGC8CXafwwvk8/giphy.gif", "https://media.giphy.com/media/WDn21GO1KmpNK/giphy.gif", "https://media.giphy.com/media/12UlfHpF05ielO/giphy.gif", "https://media.giphy.com/media/ujTeFADJLiqmcy1mXp/giphy.gif", "https://media.giphy.com/media/fUw7oSLn57ioIqypGE/giphy.gif", "https://media.giphy.com/media/YfACqrGia4YV2/giphy.gif", "https://media.giphy.com/media/POlPO0U0KuwDu/giphy.gif", "https://media.giphy.com/media/go3X4svFhKdzi/giphy.gif", "https://media.giphy.com/media/YPyUkgR0s552oOooGk/giphy.gif"];
  const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
  
  if (!message.username) message.username = 'Anonymous';
  if(!message.imageURL) message.imageURL = randomGif;

  const result = Joi.validate(message, schema);
  if (result.error == null) {
    message.created = new Date();
    return messages.insert(message);
  } else {
    return Promise.reject(result.error);
  }
}

module.exports = {
  create,
  getAll
};