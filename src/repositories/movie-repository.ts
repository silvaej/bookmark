import { DataSource } from '@src/interfaces/database/data-source'
import { MovieRepositoryIf } from '@src/interfaces/repositories/movie-repository'
import { DefaultResponse } from '@src/interfaces/database/default-response'
import { MovieBase, MovieResponse } from '@src/models/Movie'

export class MovieRepository implements MovieRepositoryIf {
    constructor(private source: DataSource) {}

    async addMovie(movie: MovieBase): Promise<DefaultResponse<MovieResponse>> {
        return this.source.insertOne(movie)
    }

    async retrieveMovies(filter: object, search?: string): Promise<DefaultResponse<Array<MovieResponse>>> {
        return this.source.find(filter, search)
    }

    async updateMovie(updatedInfo: MovieResponse): Promise<DefaultResponse<MovieResponse>> {
        const { id, ...info } = updatedInfo
        return this.source.findOneByIdAndUpdate(id, info)
    }

    async deleteMovie(id: string, uid: string): Promise<DefaultResponse<MovieResponse>> {
        return this.source.findOneByIdAndDelete(id, uid)
    }

    async deleteAllMovies(uid: string): Promise<DefaultResponse<MovieResponse>> {
        return this.source.deleteAll(uid)
    }
}
