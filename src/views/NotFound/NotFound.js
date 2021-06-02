import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    paddingTop: 50,
    textAlign: 'center'
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="center"
        spacing={4}
      >
        <Grid
          item
          lg={6}
          xs={12}
        >
          <div className={classes.content}>
            <Typography variant="h2">
              A página que você está procurando não está aqui
            </Typography>
            <Typography variant="subtitle2">
              você tentou alguma rota inexistente ou veio aqui por engano. Seja qual for, tente usar a navegação
            </Typography>
            <img
              alt="Under development"
              className={classes.image}
              src="/images/undraw_page_not_found_su7k.svg"
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFound;
