import './App.css';
import './index.css';
import MovieList from './components/MovieList';
import movies from './data/movies';

function App() {
  return (
    <div className="App">
      <MovieList movies={movies} />
    </div>
  );
}

export default App;
