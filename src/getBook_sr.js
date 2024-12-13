const AWS = require("aws-sdk");

exports.getBooks_sr = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const result = await dynamodb.scan({
    TableName: "BooksRiofrio",  
  }).promise();

  const books = result.Items;  

  return {
    statusCode: 200,
    body: JSON.stringify({ books }), 
  };
};
