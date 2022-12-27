export interface MovieBase {
    uid: string
    title: string
    description: string
    website: string
    url: string
    custom_tags: Array<string>
}

export interface MovieResponse extends MovieBase {
    id: string
}

export interface Movies {
    data: Array<MovieResponse>
    totalResults: number
    totalPages: number
    page: number
}
