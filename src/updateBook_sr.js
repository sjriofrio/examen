const AWS = require("aws-sdk");

exports.updateBook_sr = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { BookID } = event.pathParameters;  
  const { title, author, publishedYear, genre } = JSON.parse(event.body);

  // Validación
  if (!title || !author || !publishedYear || !genre) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "All fields (title, author, publishedYear, genre) are required.",
      }),
    };
  }
  try {
    // Actualizacion 
    const result = await dynamodb.update({
      TableName: "BooksRiofrio",  
      Key: { BookID },  
      UpdateExpression: "set Title = :title, Author = :author, PublishedYear = :publishedYear, Genre = :genre",  // Los campos a actualizar
      ExpressionAttributeValues: {
        ":title": title,
        ":author": author,
        ":publishedYear": publishedYear,  
        ":genre": genre,
      },
      ReturnValues: "ALL_NEW", 
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Book with ID ${BookID} updated successfully`,
        updatedBook: result.Attributes,  
      }),
    };
  } catch (error) {
    console.error("Error updating book:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Error updating book with ID ${BookID}`,
        error: error.message,
      }),
    };
  }
};
