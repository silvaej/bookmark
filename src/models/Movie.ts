export interface MovieBase {
    uid: string
    title: string
    website: string
    url: string
    custom_tags: Array<string>
}

export interface MovieResponse extends MovieBase {
    id: string
}
