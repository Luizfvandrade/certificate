import { document } from "../utils/dynamodbClient"

const handler = async (event) => {
  const { id } = event.pathParameters

  const response = await document.query({
    TableName: 'users_certificate',
    KeyConditionExpression: 'id = :id',
    ExpressionAttributeValues: {
      ':id': id
    }
  }).promise()

  const userCertificate = response.Items[0]

  if (userCertificate) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Certificate emitted!',
        name: userCertificate.name,
        url: `https://certificates06222022.s3.amazonaws.com/${id}.pdf`
      })
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: 'Certificate not emitted or invalid!',
    })
  }
}

export { handler }
