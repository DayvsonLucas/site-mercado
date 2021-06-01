import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.15)'
  },
  progress: {
    position: 'fixed',
    left: '50%',
    top: '50%',
    width: '100%',
    height: '100%',
    zIndex: 9999,
    color: '#0e2fa9'
  }
}));

const Loading = props => {

  const classes = useStyles();

  return (
    <Backdrop
      className={classes.backdrop}
      open={true}
    >
      <CircularProgress
        className={classes.progress}
        size={80}
        thickness={7}
      />
    </Backdrop>

  )
};

Loading.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object
};

export default Loading;
