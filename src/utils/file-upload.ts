import * as React from 'react'
import {config, s3} from './aws'
import {useAsync} from './hooks'

function useUploadImage() {
  const [progress, setProgress] = React.useState(0)
  const [imageUrl, setimageUrl] = React.useState<string>()
  const {
    run,
    setError,
    isSuccess,
    isError,
    isLoading,
    isIdle,
    error,
    reset,
  } = useAsync()

  const uploadImage = React.useCallback(
    acceptedFiles => {
      const [blob] = acceptedFiles

      if (!blob) {
        setError('Invalid file uploaded')
        return
      }

      setimageUrl(`${config.digitalOceanSpaces}/${blob.name}`)

      // Constructing upload image request
      const params = {
        Body: blob,
        Bucket: `${config.bucketName}`,
        Key: blob.name,
      }
      const uploadReq = s3.putObject(params)
      uploadReq
        .on('build', request => {
          request.httpRequest.headers.Host = `${config.digitalOceanSpaces}`
          request.httpRequest.headers['Content-Length'] = blob.size
          request.httpRequest.headers['Content-Type'] = blob.type
          request.httpRequest.headers['Accept'] = '*/*'
          request.httpRequest.headers['Accept-Language'] =
            'en-GB,en-US;q=0.9,en;q=0.8'
          // Header that the image is public
          request.httpRequest.headers['x-amz-acl'] = 'public-read'
        })
        .on('httpUploadProgress', ({loaded, total}) =>
          setProgress((loaded / total) * 100),
        )

      // Start the promise
      run(uploadReq.promise())
    },
    [run, setError],
  )

  return {
    // Status flags
    isError,
    isSuccess,
    isLoading,
    isIdle,

    // potentialerror
    error,

    // function to upload image
    uploadImage,

    progress,

    // imageUrl if upload was succesfull
    imageUrl: isSuccess ? imageUrl : undefined,

    reset,
  }
}

export {useUploadImage}
