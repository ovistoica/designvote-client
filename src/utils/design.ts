import {DesignType} from 'types'

export function getDesignSurveyType(type: DesignType): string {
  switch (type) {
    case DesignType.Logo: {
      return 'Logo Design Survey'
    }
    case DesignType.Illustration: {
      return 'Illustration Design Survey'
    }
    case DesignType.Mobile: {
      return 'Mobile App Design Survey'
    }
    case DesignType.Web: {
      return 'Web Design Survey'
    }
    default: {
      return 'Design Survey'
    }
  }
}
