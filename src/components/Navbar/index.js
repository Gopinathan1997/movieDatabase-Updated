import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import SearchMoviesContext from '../../context/SearchMoviesContext'

import './index.css'

class Navbar extends Component {
  state = {
    searchInput: '',
    apiStatus: 'in_progress',
    movieDetails: [],
  }

  updateInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  renderSearchBar = () => {
    const {searchInput} = this.state
    return (
      <SearchMoviesContext.Consumer>
        {value => {
          const {onUpdateSearchedData} = value

          const onSearchHandler = event => {
            this.setState({searchInput: event.target.value})
          }

          const searching = async event => {
            event.preventDefault()
            onUpdateSearchedData(searchInput)
            const {history} = this.props
            history.replace('/search')
          }

          return (
            <div className="row-search">
              <input
                type="input"
                className="input"
                placeholder="Search"
                onChange={onSearchHandler}
              />

              <button onClick={searching} type="submit">
                search
              </button>
            </div>
          )
        }}
      </SearchMoviesContext.Consumer>
    )
  }

  render() {
    return (
      <nav className="nav-bar">
        <h1 className="title">movieDB</h1>
        <div className="row">
          <Link className="link" to="/" onClick={this.changeActiveTab}>
            Popular
          </Link>
          <Link className="link" onClick={this.changeActiveTab} to="/top-rated">
            Top Rated
          </Link>
          <Link className="link" onClick={this.changeActiveTab} to="/upcoming">
            Upcoming
          </Link>
          {this.renderSearchBar()}
        </div>
      </nav>
    )
  }
}
export default withRouter(Navbar)
