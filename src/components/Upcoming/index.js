import {Component} from 'react'

import {Link} from 'react-router-dom'
import Pagination from '../Pagination'
import Navbar from '../Navbar'
import './index.css'

class Popular extends Component {
  state = {movieDetails: [], pageDetails: []}

  componentDidMount() {
    this.getApiCall()
    console.log('upcoming')
  }

  getApiCall = async (page = 1) => {
    const API_KEY = '52467f75568178b02de27a978fcbc6bd'
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=52467f75568178b02de27a978fcbc6bd&language=en-US&page=${page}`
    const response = await fetch(url)
    const data = await response.json()
    const pageDetails = {
      totalPages: data.total_pages,
      totalResults: data.total_results,
    }
    console.log(data)
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
    this.setState({movieDetails, pageDetails})
  }

  render() {
    const {movieDetails, pageDetails} = this.state

    return (
      <>
        <Navbar />
        <div className="container">
          <h1 className="def">Upcoming</h1>
          <ul className="ul">
            {movieDetails.map(eachMovie => (
              <li className="item" key={eachMovie.id}>
                <div className="row">
                  <img
                    className="poster"
                    src={eachMovie.posterPath}
                    alt={eachMovie.movie}
                  />
                  <div className="name">
                    <h1>{eachMovie.title}</h1>
                    <p>{eachMovie.voteAverage}</p>
                    <Link to={`/${eachMovie.id}`} className="link-item">
                      <button className="view">View Details</button>
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Pagination
            totalPages={pageDetails.totalPages}
            apiCallback={this.getApiCall}
          />
        </div>
      </>
    )
  }
}
export default Popular
