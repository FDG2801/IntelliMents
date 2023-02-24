import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {CurrencyExchange, Help, Info, Movie, Newspaper, Work} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router";
import {cloneElement, useEffect, useState} from "react";
import Button from '@mui/material/Button';
import {Tooltip} from "@mui/material";


const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
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

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer() {
    const theme = useTheme()
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false)
    const menuOptionsArr = [{
        text: 'Stories',
        icon: <Tooltip style={{fontSize: '28px'}} title={'Stories'} placement={'right'}><Movie></Movie></Tooltip>
    },
        {
            text: 'News',
            icon: <Tooltip style={{fontSize: '28px'}} title={'News'}
                           placement={'right'}><Newspaper></Newspaper></Tooltip>
        },
        {
            text: 'Investors',
            icon: <Tooltip style={{fontSize: '28px'}} title={'Investors'} placement={'right'}><Work></Work></Tooltip>
        },
        {
            text: 'Exchange',
            icon: <Tooltip style={{fontSize: '28px'}} title={'Exchange'}
                           placement={'right'}><CurrencyExchange></CurrencyExchange></Tooltip>
        },
        {
            text: 'About',
            icon: <Tooltip style={{fontSize: '28px'}} title={'About'} placement={'right'}><Info></Info></Tooltip>
        },
        {
            text: 'Help',
            icon: <Tooltip style={{fontSize: '28px'}} title={'Help'} placement={'right'}><Help></Help></Tooltip>
        },
        {
            text: 'Login',
            icon: <Tooltip style={{fontSize: '28px'}} title={'Login'} placement={'right'}><Help></Help></Tooltip>
        }]
    const [menuOptions, setMenuOptions] = useState(menuOptionsArr)
    const location = useLocation();
    let pathname = location.pathname
    let currentOption = menuOptions.find((i) => pathname.includes(i.text))
    let login = false
    if (pathname.includes("login")) {
        login = true
    }
    let index = 0
    if (currentOption !== undefined) {
        index = menuOptions.indexOf(currentOption)
    }
    const [activeIndex, setActiveIndex] = React.useState(index)
    useEffect(() => {
        setActiveIndex(index)
    }, [index])
    useEffect(() => {
        setMenuOptions(menuOptions.map((o, index) => {
            let newI
            if (activeIndex === index) {
                newI = cloneElement(o.icon, {color: "primary"});
            } else {
                newI = cloneElement(o.icon, {color: ""});
            }
            return {...o, icon: newI}
        }))
    }, [activeIndex])

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // //check authentification of user
    // if (!sessionStorage.getItem('auth-token')) {
    //     console.log('No auth token set.');
    // } else {
    //     const authToken = '123456abcdef';
    //     if (sessionStorage.getItem('auth-token') === authToken) {
    //         console.log('Good token. Log in.')
    //     } else {
    //         console.log('Bad token.')
    //     }
    // }
    const handleLoginPage = () => {
        navigate("/login");
    }

    const handleLogout = () => {
        sessionStorage.clear()
        navigate("/");
    }

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && {display: 'none'}),
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
                        {login ? "Login" : menuOptions[activeIndex].text}
                    </Typography>
                    {/**Logged in or not */}
                    {sessionStorage.getItem('auth-token') != null ?
                        <div style={{fontSize: '18px', paddingRight: '15px'}}>Welcome, Test user</div> :
                        <Typography></Typography>}
                    {sessionStorage.getItem('auth-token') != null ?
                        <Button variant={'outlined'} size='large' sx={{fontSize: '16px'}} color="inherit"
                                onClick={handleLogout}>Log-out</Button> :
                        <Button variant={'outlined'} size='large' sx={{fontSize: '16'}} color="inherit"
                                onClick={handleLoginPage}>Log-in</Button>}
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    {menuOptions.slice(0, 4).map(({text, icon}, index) => (
                        <ListItem key={text} disablePadding sx={{display: 'block'}}>
                            <ListItemButton onClick={() => {
                                setActiveIndex(index);
                                navigate('/' + text);
                                handleDrawerClose()
                            }} selected={index === activeIndex}
                                            sx={{
                                                minHeight: 60,
                                                justifyContent: open ? 'initial' : 'center',
                                                px: 2.5,
                                            }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{opacity: open ? 1 : 0}}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {menuOptions.slice(4, 6).map(({text, icon}, index) => (
                        <ListItem key={text} disablePadding sx={{display: 'block'}}>
                            <ListItemButton onClick={() => {
                                setActiveIndex(4 + index);
                                navigate('/' + text)
                            }} selected={4 + index === activeIndex}
                                            sx={{
                                                minHeight: 60,
                                                justifyContent: open ? 'initial' : 'center',
                                                px: 2.5,
                                            }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={text} sx={{opacity: open ? 1 : 0}}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </Box>
    );
}