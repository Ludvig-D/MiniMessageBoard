const messages = [
  {
    text: 'Hi there!',
    user: 'Amando',
    added: new Date(),
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: new Date(),
  },
];

function newMessage(text, user) {
  let message = {
    text,
    user,
    added: new Date(),
  };

  messages.push(message);
}

export { messages, newMessage };
