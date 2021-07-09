import { useEffect, useState } from 'react';

import { MovieCard } from '../components/MovieCard';

import { api } from '../services/api';

import '../styles/content.scss';
import { Header } from './Header';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}
interface ContentProps {
  selectedGenreId: number;
}

export function Content(props: ContentProps) {
  const { selectedGenreId } = props

  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    const getData = async () => {
      const response = await api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`);
      setMovies(response.data);

      const responseGenres = await api.get<GenreResponseProps>(`genres/${selectedGenreId}`);
      setSelectedGenre(responseGenres.data);
    }

    getData()
  }, [selectedGenreId]);

  return (
    <div className="container">
      <Header title={selectedGenre.title} />

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}