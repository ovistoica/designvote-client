import {Design, DesignType, NormalizedDesign, VoteStyle} from 'types'

export const singleLoadingDesign: Design = {
  owner: {
    nickname: 'loading',
    picture: 'loading',
    name: 'Loading',
  },
  name: 'Loading design',
  designId: 'loading',
  uid: 'loading',
  votes: [],
  question: 'Loading',
  public: false,
  description: 'loading',
  img: null,
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
