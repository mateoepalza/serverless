const middy = require('middy');
const { middleware1, middleware2 } = require('../Middlewares/Middlewares');

const hello = async (event, context, callback) => {
  console.log("Inside the handler");
  const response =  {
    statusCode: 200,
    body: JSON.stringify(
      {
        data: 'Hello World!!!'
      },
    ),
  };

  return callback(null, response)
};

const handler = middy(hello);
handler.use(middleware1());
handler.use(middleware2());


module.exports = {
  handler
}
