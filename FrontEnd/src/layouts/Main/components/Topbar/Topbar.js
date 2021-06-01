import React, { useState, useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  SvgIcon,
  Badge
} from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import { Menu as MenuIcon } from 'react-feather';
import { Logo, NotificationsPopover } from 'components';
import { THEMES } from '../../../../constants';
import Account from './Account';

//import Search from './Search';
import Settings from './Settings';

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    ...theme.name === THEMES.LIGHT ? {
      boxShadow: 'none',
      backgroundColor: theme.palette.primary.main
    } : {},
    ...theme.name === THEMES.DARK ? {
      backgroundColor: theme.palette.background.default
    } : {}
  },
  toolbar: {
    minHeight: 64
  },
  notificationsButton: {
    marginLeft: theme.spacing(1)
  },
  notificationsBadge: {
    backgroundColor: theme.palette.background.default
  },
}));

function Topbar({
  className,
  onSidebarOpen,
  ...rest
}) {
  const classes = useStyles();

  const [notifications, setNotifications] = useState([]);
  const [openNotifications, setOpenNotifications] = useState(false);
  const notificationsRef = useRef(null);
  useEffect(() => {
    let mounted = true;


    return () => {
      mounted = false;
    };
  }, []);

  const handleNotificationsOpen = () => {
    setOpenNotifications(true);
  };

  const handleNotificationsClose = () => {
    setOpenNotifications(false);
  };

  return (
    <AppBar
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <Hidden lgUp>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            onClick={onSidebarOpen}
          >
            <SvgIcon fontSize="small">
              <MenuIcon />
            </SvgIcon>
          </IconButton>
        </Hidden>
        <Hidden mdDown>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Hidden>
        <Box
          ml={2}
          flexGrow={1}
        />
        {/* <Search /> */}
        <IconButton
          className={classes.notificationsButton}
          color="inherit"
          onClick={handleNotificationsOpen}
          ref={notificationsRef}>
          <Badge
            badgeContent={notifications.length}
            classes={{ badge: classes.notificationsBadge }}
            variant="dot">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Settings />
        <Box ml={2}>
          <Account />
        </Box>
      </Toolbar>
      <NotificationsPopover
        anchorEl={notificationsRef.current}
        notifications={notifications}
        onClose={handleNotificationsClose}
        open={openNotifications}
      />
    </AppBar>
  );
}

Topbar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default Topbar;
