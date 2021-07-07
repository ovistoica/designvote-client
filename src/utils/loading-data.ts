import {DesignType, NormalizedDesign, NormalizedPoll, VoteStyle} from 'types'

export const loadingDesign: NormalizedDesign = {
  design: {
    nickname: 'loading',
    name: 'Loading design',
    designId: 'loading',
    uid: 'loading',
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
  },
  pictures: {},
  opinions: {},
  versions: {},
}

export const loadingPoll: NormalizedPoll = {
  poll: {
    nickname: 'loading',
    name: 'Loading design',
    pollId: 'loading',
    uid: 'loading',
    question: 'Loading',
    isPublic: false,
    description: 'loading',
    img: null,
    versions: [],
    totalVotes: 0,
    designType: DesignType.Mobile,
    shortUrl: 'Loading...',
    voteStyle: VoteStyle.Choose,
  },
  versions: {},
}
