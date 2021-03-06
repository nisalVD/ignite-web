import React, { Component } from 'react'
import Button from 'material-ui/Button'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'


import { listFeeds } from '../api/feed'
import Feed from './Feed'
import { Link } from 'react-router-dom'
import './HomePage.css'

class HomePage extends Component {
  state = {
    feedData: null
  }

  componentDidMount() {
    listFeeds()
      .then(feedData => this.setState({feedData}))
      .catch(error => console.log(error))
  }

  render () {
    const { feedData } = this.state
    return (
      <MuiThemeProvider theme={theme}>
        <div style={{paddingLeft:150,paddingRight:150}}>
          <div id="bg-image">
            {!!this.props.isAuthenticated ? (
              <Button raised color="primary" className="homepage-module-button" component={Link} to="/modules">
                Modules
              </Button>
              ): (
              <Button raised color="primary" className="homepage-module-button" component={Link} to="/sign-in">
                Sign In
              </Button>
              )
            }
          </div>
          <div id="blog">
              { feedData && 
              feedData.reverse().map((feed, idx) => {
                let color = 'primary'
                if (idx%2 == 0) {
                  color = 'secondary'
                }
                  return <Feed key={feed._id} heading={feed.heading} color={color} content={feed.content} date={feed.timePosted}/>
                }
              )
            }
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
const theme = createMuiTheme({
  palette: {
    primary: { main: '#FF7115' } 
  },
})

export default HomePage
