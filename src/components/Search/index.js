import {Component} from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import './index.css'
import SearchMoviesContext from '../../context/SearchMoviesContext'

class Search extends Component {
  state = {
    movieDetails: [],
    apiStatus: 'success',
  }

  componentDidMount() {
    console.log('Search Component')
    const stringi = localStorage.getItem('searchedData')
    const real = JSON.parse(stringi)
    this.setState({movieDetails: real})
  }

  render() {
    const {movieDetails, apiStatus} = this.state

    return (
      <>
        {apiStatus === 'success' ? (
          <SearchMoviesContext.Consumer>
            {value => {
              const {searchedData, onUpdateSearchedData} = value
              console.log(searchedData)

              return (
                <>
                  {movieDetails.length !== 0 ? (
                    <>
                      <Navbar />
                      <div className="container">
                        <h1 className="def">Search Results</h1>
                        <ul className="ul">
                          {searchedData.map(eachMovie => (
                            <li className="item" key={eachMovie.id}>
                              <div className="row">
                                <img
                                  className="poster"
                                  src={eachMovie.posterPath}
                                  alt={eachMovie.movie}
                                />
                                {console.log(eachMovie.posterPath)}
                                <div className="name">
                                  <h1>{eachMovie.title}</h1>
                                  <p>{eachMovie.voteAverage}</p>
                                  <Link
                                    to={`/${eachMovie.id}`}
                                    className="link-item"
                                  >
                                    <button className="view">
                                      View Details
                                    </button>
                                  </Link>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    ''
                  )}
                </>
              )
            }}
          </SearchMoviesContext.Consumer>
        ) : (
          ''
        )}
      </>
    )
  }
}
export default Search
