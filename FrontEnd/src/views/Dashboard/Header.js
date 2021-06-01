import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
    Breadcrumbs,
    Grid,
    Link,
    Typography,
    makeStyles,
    SvgIcon,
    Button
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import {
    PlusCircle as PlusCircleIcon
} from 'react-feather';

const useStyles = makeStyles((theme) => ({
    root: {},
    actionIcon: {
        marginRight: theme.spacing(1)
    }
}));

function Header({ className, ...rest }) {
    const classes = useStyles();
    return (
        <Grid
            container
            spacing={3}
            justify="space-between"
            className={clsx(classes.root, className)}
            {...rest}
        >
            <Grid item>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    <Link
                        variant="body1"
                        color="inherit"
                        to="/"
                        component={RouterLink}
                    >
                        Início
                    </Link>
                    <Typography
                        variant="body1"
                        color="textPrimary"
                    >
                        Produtos
                    </Typography>
                </Breadcrumbs>
            </Grid>
            <Grid item>
                <Button
                    color="secondary"
                    variant="contained"
                    className={classes.action}
                    to='/dashboard/manter'
                    component={RouterLink}
                >
                    <SvgIcon
                        fontSize="small"
                        className={classes.actionIcon}
                    >
                        <PlusCircleIcon />
                    </SvgIcon>
                    Novo Produto
                </Button>
            </Grid>
        </Grid>
    );
}

Header.propTypes = {
    className: PropTypes.string
};

export default Header;
