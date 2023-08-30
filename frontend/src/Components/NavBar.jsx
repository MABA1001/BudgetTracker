import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useAuth } from './../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

import budgetLogo from './../assets/budgetLogo.png';
import './../App.css';

const settings = ['Analytics', 'Dashboard', 'Logout'];

function NavBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { token, removeAuthToken } = useAuth();
  const navigate = useNavigate();

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
    console.log(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const goToLogout = () => {
    removeAuthToken();
    setAnchorElUser(null);
    localStorage.removeItem('userToken');
    navigate('/');
  };

  const goToDashboard = () => {
    navigate('/Dashboard');
  };
  const goToAnalytics = () => {
    navigate('/Analytics');
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'white', color: 'black' }}>
      <Container maxWidth="xxl">
        <Toolbar
          disableGutters
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              alt="logo"
              src={budgetLogo}
              sx={{ display: { md: 'flex' }, marginRight: 1 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              Budget Tracker
            </Typography>
          </div>
          <div>
            {token ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User" sx={{ bgcolor: '#FDC414' }} />
                </IconButton>
              </Tooltip>
            ) : null}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map(setting => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    if (setting === 'Logout') {
                      goToLogout();
                    } else if (setting === 'Dashboard') {
                      goToDashboard();
                    } else if (setting === 'Analytics') {
                      goToAnalytics();
                    } else {
                      handleCloseUserMenu();
                    }
                  }}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
