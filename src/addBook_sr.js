const { v4 } = require("uuid");
const AWS = require("aws-sdk");

exports.addBook_sr = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { title, author, publishedYear, genre } = JSON.parse(event.body);
  const createdAt = new Date();
  const BookID = v4();  

  const newBook = {
    BookID,             
    Title: title,
    Author: author,
    PublishedYear: publishedYear,
    Genre: genre,
    CreatedAt: createdAt.toISOString(), 
  };

  await dynamodb
    .put({
      TableName: "BooksRiofrio",  
      Item: newBook,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(newBook),
  };
};
