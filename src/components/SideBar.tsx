import { useEffect, useState } from 'react';

import { Button } from './Button';

// import { SideBar } from './components/SideBar';
// import { Content } from './components/Content';

import { api } from '../services/api';

import '../styles/sidebar.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps {
  selectedGenreId: number;
  setSelectedGenreId: (id: number) => void;
}

export function SideBar(props: SideBarProps) {
  const { selectedGenreId, setSelectedGenreId } = props;

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);


  useEffect(() => {
    const getData = async () => {
      const response = await api.get<GenreResponseProps[]>('genres')
      setGenres(response.data);
    }

    getData()
  }, []);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}