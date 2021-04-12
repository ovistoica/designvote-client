import {NormalizedDesign, VoteStyle} from 'types'

export const loadingDesign: NormalizedDesign = {
  design: {
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
    designType: 'mobile',
    shortUrl: 'Loading...',
    voteStyle: VoteStyle.Choose,
  },
  pictures: {},
  opinions: {},
  versions: {},
}
