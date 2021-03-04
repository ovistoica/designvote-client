export interface ApiPicture {
  'picture-id': string
  uri: string
  'version-id': string
}

export interface ApiVote {
  'version-id': string
  opinion: string
}

export interface ApiVersion {
  'version-id': string
  name: string
  description: null
  'design-id': string
  votes: ApiVote[]
  pictures: ApiPicture[]
}

export interface ApiDesign {
  description: null
  opinions: []
  uid: string
  'design-id': string
  name: string
  public: true
  'total-votes': number
  'short-url': string | null
  versions: ApiVersion[]
  img: string | null
}
