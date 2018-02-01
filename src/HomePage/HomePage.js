import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ButtonBase from 'material-ui/ButtonBase';
import Typography from 'material-ui/Typography';

import { listFeeds } from '../api/feed'
import Feed from './Feed'

class ButtonBases extends Component {
  state = {
    feedData: null
  }

  componentDidMount() {
    listFeeds()
      .then(feedData => this.setState({feedData}))
      .catch(error => console.log(error))
  }

  render () {
    const { classes } = this.props
    const { feedData } = this.state

    return (
      <div>
        <div className={classes.root}>
            <ButtonBase
              focusRipple
              key={image.title}
              className={classes.image}
              style={{
                width: image.width,
              }}
            >
              <span
                className={classes.imageSrc}
                style={{
                  backgroundImage: `url(${image.url})`,
                }}
              />
              <span className={classes.imageBackdrop} />
              <span className={classes.imageButton}>
                <Typography
                  component="span"
                  type="subheading"
                  color="inherit"
                  className={classes.imageTitle}
                >
                  {image.title}
                  <span className={classes.imageMarked} />
                </Typography>
              </span>
            </ButtonBase>
        </div>
          { feedData && 
          feedData.map((feed, idx) => {
            let color = 'primary'
            if (idx%2 == 0) {
              color = 'secondary'
            }
              return <Feed key={feed._id} heading={feed.heading} color={color} content={feed.content} date={feed.timePosted}/>
            }
          )
        }
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 300,
    width: '100%',
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('lg')]: {
      width: '100% !important', // Overrides inline-style
      height: 700,
    },
    [theme.breakpoints.down('md')]: {
      width: '100% !important', // Overrides inline-style
      height: 550,
    },
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 400,
    },
    '&:hover': {
      zIndex: 1,
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15,
    },
    '&:hover $imageMarked': {
      opacity: 0,
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor',
    },
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

const image = {
  url: 'https://api.fluro.io/get/5990f07bb9f6ee2594569e63?w=1920&amp;access_token=%242a%2410%24B4J59VQhzlbkneIVKIprB.FVWxDU5.HMCX11nfAKAkssSEcBLZEle&amp;quality=90',
  title: 'Modules',
  width: '50%',
}

ButtonBases.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonBases);
