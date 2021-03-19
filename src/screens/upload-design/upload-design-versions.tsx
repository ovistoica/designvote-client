import * as React from 'react'
import {Flex, Text} from '@chakra-ui/react'
import {useParams} from 'react-router-dom'

import {ImageSwitch, Mode} from 'components/image-switch'
import {MobileUpload} from './mobile-upload'
import {WebUpload} from './web-upload'
import {useEditDesign} from 'utils/designs'
import {FullPageSpinner} from 'components/lib'

function UploadDesign() {
  const {designId} = useParams()
  const {mutate: editDesign, isLoading} = useEditDesign(designId)
  const [currentMode, setMode] = React.useState(Mode.Mobile)

  const toggle = (mode: Mode) => {
    if (mode !== currentMode) {
      editDesign({designType: mode})
    }
    setMode(mode)
  }

  const renderContent = () =>
    currentMode === Mode.Mobile ? (
      <MobileUpload designId={designId} />
    ) : (
      <WebUpload designId={designId} />
    )

  return (
    <Flex flex="1" align="center" flexDir="column">
      <Text fontSize="1.5rem" textAlign="center">
        Upload two or more versions of the same design
      </Text>
      <ImageSwitch mode={currentMode} toggle={toggle} mt="1em" />
      {isLoading ? <FullPageSpinner /> : renderContent()}
    </Flex>
  )
}

export {UploadDesign}
