const AWS = require("aws-sdk");

exports.deleteBook_sr = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { BookID } = event.pathParameters;  

  await dynamodb.delete({
    TableName: "BooksRiofrio",  
    Key: { BookID },  
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Book with ID ${BookID} deleted successfully`, 
    }),
  };
};
