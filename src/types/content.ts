import {DesignType, VoteStyle} from './enums'

export interface Vote {
  id: string
  versionId: string
  uid: string | null
  rating: number | null
}

export interface Opinion {
  opinionId: number
  opinion: string
  versionId: string
  designId: string
  uid: string
  thumbsUp: number
  voterName?: string
  ownerName: string
  ownerNickname: string
  ownerPicture: string
  createdAt: string
  updatedAt: string
}

export interface Picture {
  pictureId: string
  uri: string
  versionId: string
}

export interface Version {
  versionId: string
  name: string
  description: string | null
  designId: string
  votes: Vote[]
  imageUrl: string
  opinions: Opinion[]
}

export interface Design {
  designId: string
  description?: string | null
  opinions: Opinion[]
  versions: Version[]
  ownerPicture?: string
  ownerNickname: string
  ownerName?: string
  uid: string
  name: string
  public: boolean
  totalVotes: number
  totalOpinions: number
  shortUrl: string
  img: string
  question: string
  designType: DesignType
  voteStyle: VoteStyle
  createdAt: string
  updatedAt: string
  votes: Vote[]
}

export interface NormalizedDesign {
  design: Design
  versions: Record<string, Version>
  pictures: Record<string, Picture>
  opinions: Record<string, Opinion>
}
