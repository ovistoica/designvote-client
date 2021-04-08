export interface Vote {
  voteId: string
  versionId: string
  uid: string | null
}

export interface Opinion {
  opinionId: number
  opinion: string
  versionId: string
  designId: string
  uid: string | null
  thumbsUp: number
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
  votes: string[]
  pictures: string[]
}

export interface Design {
  designId: string
  description?: string | null
  opinions: string[]
  uid: string
  name: string
  public: boolean
  totalVotes: number
  shortUrl?: string
  versions: string[]
  img: null
  question: string
  designType: 'web' | 'mobile'
}

export interface NormalizedDesign {
  design: Design
  versions: Record<string, Version>
  pictures: Record<string, Picture>
  opinions: Record<string, Opinion>
}
