export interface DeleteMovieUseCaseIf {
    execute(id: string): Promise<void>
}
