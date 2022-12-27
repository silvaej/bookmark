export interface DeleteAllMovieUseCaseIf {
    execute(uid: string): Promise<void>
}
