import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import MyProfile from 'components/myProfile';
import BaseAlert from 'components/baseAlert';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
        ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(7),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

export default function Dashboard({ListItems}) {
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(true);
    const [account, setAccount] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [message, setMessage] = useState(null);
    const [severity, setSeverity] = useState(null);
    const [profile, setProfile] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const location = useLocation();
    const accountOpen = Boolean(account);
    const department = sessionStorage.getItem('job_department_name');
    const team = sessionStorage.getItem('job_team_name');
    const { isMsg, sendSvt, sendMsg } = location.state ? location.state : {};

    useEffect(() => {
        if(isMsg) {
            handleSnackbar(sendSvt, sendMsg);
            navigate(location.pathname, {});
        }
    });

    function handleSnackbar(svt, msg) {
        setSeverity(svt);
        setMessage(msg);
        setSnackbarOpen(true);
    }

    const handleClick = (e) => {
        setAccount(e.currentTarget);
    }

    const handleProfile = () => {
        setData(null);
        setLoading(true);
        setProfile(true);

        const employeeId = sessionStorage.getItem('employee_id');
        axios.get("http://localhost:8000/get_profile", {
            params: {
                employeeId: employeeId
            }
        })
        .then((res) => {
            setData(res.data);
        }).catch((e) => {
            alert(e);
        });

        setAccount(null);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        setAccount(null);
        navigate("/login", { state: { isMsg: true, svt: 'success', sendMsg: '로그아웃 되었습니다.' }});
    };

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={drawerOpen}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(drawerOpen && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            OT Company
                        </Typography>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            {department} {team}
                        </Typography>
                        <IconButton
                            id="account-button"
                            color="inherit"
                            aria-controls={accountOpen ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={accountOpen ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id='account-menu'
                            anchorEl={account}
                            open={accountOpen}
                            onClose={()=>setAccount(null)}
                            MenuListProps={{
                                'aria-labelledby': 'account-button'
                            }}
                        >
                            <MenuItem onClick={handleProfile}>
                                <ListItemIcon>
                                    <AccountCircle />
                                </ListItemIcon>
                                My profile
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={drawerOpen}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        {ListItems}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Outlet />
                </Box>
            </Box>
            <MyProfile open={profile} setOpen={setProfile} formLoading={loading} setFormLoading={setLoading} data={data}/>
            <BaseAlert open={snackbarOpen} setOpen={setSnackbarOpen} svt={severity} msg={message} />
        </ThemeProvider>
    );
}