import {Component} from 'react'
import Navbar from '../Navbar'
import './index.css'

class MovieDetails extends Component {
  state = {movieDetails: [], moviestatus: 'loading', castStatus: 'loading'}

  componentDidMount() {
    this.getMoviedetails()
    this.getCastdetails()
    console.log('MovieDetails')
  }

  getMoviedetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const API_KEY = '52467f75568178b02de27a978fcbc6bd'
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    const response = await fetch(movieDetailsUrl)
    const data = await response.json()
    if (response.ok) {
      const movieDetails = {
        movieName: data.title,
        image: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        rating: data.vote_average,
        relaseDate: data.release_date,
        genre: data.genres.map(each => each.name),
        overview: data.overview,
        duration: data.runtime,
      }
      this.setState({movieDetails, moviestatus: 'success'})
    } else {
      this.setState({moviestatus: 'failure'})
    }
  }

  getCastdetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const API_KEY = '52467f75568178b02de27a978fcbc6bd'

    const castDetailsUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
    const response = await fetch(castDetailsUrl)
    if (response.ok) {
      const data = await response.json()
      const castDetail = data.cast.map(each => ({
        originalName: each.original_name,
        dp: each.profile_path,
        characterName: each.character,
      }))
      this.setState({castDetail, castStatus: 'success'})
      console.log(castDetail)
    } else {
      this.setState({castStatus: 'failure'})
    }
  }

  rendersuccess = () => {
    const {movieDetails, castStatus} = this.state
    const {duration, genre, relaseDate, movieName, rating, overview, image} =
      movieDetails

    return (
      <div className="card">
        <img className="banner" src={image} alt={movieName} />
        <div className="name">
          <h1>{movieName}</h1>
          <div className="duration">
            <p>{duration} Mins</p>
            <p>{relaseDate}</p>
          </div>
          <p className="rating">{rating}/10</p>
          <div>
            {genre.map(each => (
              <p key={each} className="genre">
                {each}
              </p>
            ))}
          </div>
          <p className="overview">{overview}</p>
          {castStatus === 'success' ? this.renderCast() : null}
        </div>
      </div>
    )
  }

  renderCast = () => {
    const {castDetail} = this.state
    return (
      <ul className="cast-detail">
        {castDetail.map(each => (
          <li className="cast-item">
            <img
              className="dp"
              src={`https://image.tmdb.org/t/p/w500/${each.dp}`}
              alt={each.characterName}
            />
            <p className="original">{each.originalName}</p>
            <p>{each.characterName}</p>
          </li>
        ))}
      </ul>
    )
  }

  render() {
    const {moviestatus} = this.state
    return (
      <>
        <Navbar />
        {moviestatus === 'success' ? this.rendersuccess() : null}
      </>
    )
  }
}
export default MovieDetails
