import * as React from 'react'

import {config, s3} from './aws'
import {useAsync} from './hooks'

function useUploadImage() {
  const [imageUrls, setImageUrls] = React.useState<string[]>()
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

  const uploadImages = React.useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles.length || acceptedFiles.length < 1) {
        setError('Invalid file uploaded')
        return
      }

      const urls = acceptedFiles.map(
        file => `${config.digitalOceanSpaces}/${file.name}`,
      )

      setImageUrls(urls)

      // Constructing upload image request

      const uploadPromises = acceptedFiles.map(file => {
        const params = {
          Body: file,
          Bucket: `${config.bucketName}`,
          Key: file.name,
        }

        const uploadReq = s3.putObject(params)
        uploadReq.on('build', request => {
          request.httpRequest.headers.Host = `${config.digitalOceanSpaces}`
          request.httpRequest.headers['Content-Length'] = `${file.size}`
          request.httpRequest.headers['Content-Type'] = file.type
          request.httpRequest.headers.Accept = '*/*'
          request.httpRequest.headers['Accept-Language'] =
            'en-GB,en-US;q=0.9,en;q=0.8'
          // Header that the image is public
          request.httpRequest.headers['x-amz-acl'] = 'public-read'
        })
        return uploadReq.promise()
      })

      // Upload all images at once
      run(Promise.all(uploadPromises))
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
    uploadImages,

    // imageUrl if upload was succesfull
    imageUrl: isSuccess ? imageUrls : undefined,

    reset,
  }
}

export {useUploadImage}
