import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Upcoming from './components/Upcoming'
import Popular from './components/Popular'
import TopRated from './components/TopRated'
import MovieDetails from './components/MovieDetails'
import Search from './components/Search'
import SearchMoviesContext from './context/SearchMoviesContext'

import './App.css'

class App extends Component {
  state = {searchedData: []}

  onUpdateSearchedData = async searchInput => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=52467f75568178b02de27a978fcbc6bd&language=en-US&query=${searchInput}&page=1`
    console.log(searchInput)
    const API_KEY = '52467f75568178b02de27a978fcbc6bd'

    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()

      const movieDetails = data.results.map(each => ({
        adult: each.adult,
        backdropPath: each.backdrop_path,
        id: each.id,
        originalLanguage: each.original_language,
        originalTitle: each.original_title,
        overview: each.overview,
        popularity: each.popularity,
        posterPath: `https://image.tmdb.org/t/p/w500${each.poster_path}`,
        releaseDate: each.release_date,
        title: each.title,
        video: each.video,
        voteAverage: each.vote_average,
        voteCount: each.vote_count,
      }))

      this.setState({searchedData: movieDetails})
      const stringified = JSON.stringify(movieDetails)
      localStorage.setItem('searchedData', stringified)
    }
  }

  render() {
    const {searchedData} = this.state
    return (
      <SearchMoviesContext.Provider
        value={{
          searchedData,
          onUpdateSearchedData: this.onUpdateSearchedData,
        }}
      >
        <Switch>
          <Route exact path="/" component={Popular} />
          <Route exact path="/top-rated" component={TopRated} />
          <Route exact path="/upcoming" component={Upcoming} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/:id" component={MovieDetails} />
        </Switch>
      </SearchMoviesContext.Provider>
    )
  }
}

export default App
