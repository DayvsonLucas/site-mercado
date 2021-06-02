import React, { useEffect } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import {
  createStyles,
  jssPreset,
  makeStyles,
  StylesProvider,
  ThemeProvider
} from '@material-ui/core';
import { chartjs } from './helpers';
import { createTheme } from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import Routes from './Routes';
import { SnackbarProvider } from 'notistack'
import useSettings from './hooks/useSettings';

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});


const useStyles = makeStyles(() => createStyles({
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    },
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      height: '100%',
      width: '100%'
    },
    body: {
      height: '100%',
      width: '100%'
    },
    '#root': {
      height: '100%',
      width: '100%'
    }
  }
}));

function App() {
  useStyles();

  const { settings } = useSettings();

  useEffect(() => {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      ele.classList.add('available')
      setTimeout(() => {
        ele.outerHTML = ''
      }, 2000)
    }
  }, [])

  return (
    <ThemeProvider theme={createTheme(settings)}>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        autoHideDuration={3000}
      >
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
export default App;