
const handler = async (event, context, callback) =>{
    console.log(event.queryStringParameters);
    console.log(event.pathParameters);
    console.log(event.body);
    // Here we define the response 
    const response = {
        statusCode:  200,
        body: JSON.stringify({
            message: 'This is a response of a post request'
        })
    }
    return callback(null, response);
}


module.exports = {
    handler
}