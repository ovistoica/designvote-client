import aws from 'aws-sdk'

let doEndpoint = process.env.REACT_APP_DO_ENDPOINT

if (!doEndpoint) {
  throw new Error('Please provide a valid REACT_APP_DO_ENDPOINT env variable')
}

const spacesEndpoint = new aws.Endpoint(doEndpoint)

const s3 = new aws.S3({
  secretAccessKey: process.env.REACT_APP_DO_SECRET,
  accessKeyId: process.env.REACT_APP_DO_ACCESS_KEY,
  endpoint: spacesEndpoint,
})

const bucketName = process.env.REACT_APP_DO_BUCKETNAME
const endPoint = process.env.REACT_APP_DO_ENDPOINT
const digitalOceanSpaces = `https://${bucketName}.${endPoint}`

const config = {
  digitalOceanSpaces,
  bucketName,
}

export {s3, config}
