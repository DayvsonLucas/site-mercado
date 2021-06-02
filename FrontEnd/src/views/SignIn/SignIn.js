import React, { useState } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import { authentication } from '../../actions/auth'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://https://www.sitemercado.com.br">
        Site Mercado
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://static.sitemercado.com.br/assets/img/logos/sitemercado.png)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#0e2fa9',
    backgroundSize: 'auto',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = props => {
  const classes = useStyles();
  const { history } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const handleClickVariant = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      }
    }));
  };


  async function handleSignIn(event) {
    event.preventDefault();
    setLoading(true)

    const { user, password } = formState.values;

    if (!user || !password) {
      console.log("Preencha e-mail e senha para continuar!");
    } else {
      authentication(user, password).then(data => {

        if (!data.success) {
          handleClickVariant('error', data.error)
        }
        else {
          handleClickVariant('success', "Autenticado com sucesso")
          localStorage.setItem('portal-site-mercado', true)
          history.push('/')
        }
        setLoading(false)
      })
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Site Mercado
          </Typography>
          <form className={classes.form} onSubmit={handleSignIn}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="user"
              label="Usuário"
              name="user"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar-me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Entrar
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default withRouter(SignIn);
