import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import CameraIcon from '@material-ui/icons/Gamepad'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {withStyles} from '@material-ui/core/styles'
import CurrencyFormat from 'react-currency-format'
import axios from 'axios'

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
  cardActions: {
    display: 'flex',
    flexDirection: 'column',
  },
})

class Album extends React.Component {
  static async getInitialProps({req}) {
    const res = await axios.get('http://localhost:3001/catalog')
    const games = res.data

    return {games}
  }

  render() {
    const {classes, games} = this.props

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <CameraIcon className={classes.icon} />
            <Typography variant="title" color="inherit" noWrap>
              Games Store
            </Typography>
          </Toolbar>
        </AppBar>
        <main>
          {/* Hero unit */}
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography
                variant="display3"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Games Store
              </Typography>
              <Typography
                variant="title"
                align="center"
                color="textSecondary"
                paragraph
              >
                Todos os games em um só lugar, steam, Xbox, PLaystation
              </Typography>
            </div>
          </div>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            {/* End hero unit */}
            <Grid container spacing={40}>
              {games.map(game => (
                <Grid item key={game.title} sm={6} md={4} lg={3}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={game.image}
                      title={game.title}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography
                        gutterBottom
                        variant="headline"
                        component="h2"
                      >
                        {game.title}
                      </Typography>
                      <Typography>{game.genre.join(', ')}</Typography>
                    </CardContent>
                    <CardActions className={classes.cardActions}>
                      {Object.keys(game.brands).map(key => {
                        const {sku, price} = game.brands[key]

                        return (
                          <Button key={sku} size="small" color="primary">
                            <CurrencyFormat
                              value={price}
                              displayType="text"
                              prefix={`${key} - R$ `}
                              thousandSeparator="."
                              decimalSeparator=","
                              decimalScale={2}
                              fixedDecimalScale
                            />
                          </Button>
                        )
                      })}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </main>
        {/* Footer */}
        <footer className={classes.footer}>
          <Typography variant="title" align="center" gutterBottom>
            Games Store
          </Typography>
          <Typography
            variant="subheading"
            align="center"
            color="textSecondary"
            component="p"
          >
            Concept of microservices store by Guilherme M Gregio
            (www.thegregio.com)
          </Typography>
        </footer>
        {/* End footer */}
      </React.Fragment>
    )
  }
}

Album.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Album)
