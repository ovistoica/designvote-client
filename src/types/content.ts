import {DesignType, VoteStyle} from './enums'

export interface Vote {
  voteId: string
  versionId: string
  uid: string | null
  rating: number | null
}

export interface Opinion {
  opinionId: number
  opinion: string
  versionId: string
  designId: string
  uid: string | null
  thumbsUp: number
  voterName?: string
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
  opinions: number[]
  versions: Version[]
  owner?: {
    nickname: string
    picture: string
    name: string
  }
  uid: string
  name: string
  public: boolean
  totalVotes: number
  shortUrl?: string
  img?: string | null
  question: string
  designType: DesignType
  voteStyle: VoteStyle
  createdAt: string
  updatedAt: string
}

export interface NormalizedDesign {
  design: Design
  versions: Record<string, Version>
  pictures: Record<string, Picture>
  opinions: Record<string, Opinion>
}
