export interface DeleteMovieUseCaseIf {
    execute(id: string, uid: string): Promise<void>
}
