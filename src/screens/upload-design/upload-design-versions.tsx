import * as React from 'react'
import {Flex, Text} from '@chakra-ui/react'
import {useParams} from 'react-router-dom'

import {ImageSwitch, Mode} from 'components/image-switch'
import {MobileUpload} from './mobile-upload'
import {WebUpload} from './web-upload'

function UploadDesign() {
  const {designId} = useParams()

  const [mode, setMode] = React.useState(Mode.Mobile)

  return (
    <Flex flex="1" align="center" flexDir="column">
      <Text fontSize="1.5rem" textAlign="center">
        Upload two or more versions of the same design
      </Text>
      <ImageSwitch mode={mode} toggle={setMode} mt="1em" />
      {mode === Mode.Mobile ? (
        <MobileUpload designId={designId} />
      ) : (
        <WebUpload designId={designId} />
      )}
    </Flex>
  )
}

export {UploadDesign}
