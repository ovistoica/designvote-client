import {Design, DesignType, NormalizedDesign, VoteStyle} from 'types'

export const singleLoadingDesign: Design = {
  ownerNickname: 'loading',
  ownerPicture: 'loading',
  ownerName: 'Loading',
  name: 'Loading design',
  designId: 'loading',
  uid: 'loading',
  votes: [],
  question: 'Loading',
  public: false,
  description: 'loading',
  img: 'loading',
  versions: [],
  totalVotes: 0,
  opinions: [],
  designType: DesignType.Mobile,
  shortUrl: 'Loading...',
  voteStyle: VoteStyle.Choose,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export const loadingDesign: NormalizedDesign = {
  design: singleLoadingDesign,
  pictures: {},
  opinions: {},
  versions: {},
}
