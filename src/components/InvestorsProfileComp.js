import Row from '@mui/material/Container';
import Col from '@mui/material/Container';
import { Icon } from '@iconify/react';
import {useNavigate} from 'react-router-dom';
import Grid2 from "@mui/material/Unstable_Grid2";
import * as React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import IconButton from "@mui/material/IconButton";
import {useState} from "react";
import {useLocation} from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import {
    Button, CardActions, Chip,
    Dialog, DialogActions, CardMedia, Divider,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Switch, Tooltip, Stack,
} from "@mui/material";

import {
    Bookmark,
    FavoriteBorder,
    Favorite,
    FilterList,
    Info, ReviewsOutlined,
    Search, VoiceChatOutlined, Recommend, PlayCircle
} from "@mui/icons-material";

import {
    Grid, Card, Box, CardContent,
    CardActionArea, Typography,
} from "@mui/material";


export default function InvestorsProfileComp(props) {

    const navigate = useNavigate();
    const location = useLocation();
    const story = location.state
    const name = story.name
    const content = story.content

    const stocks_list = [
        {title: 'Apollo', AKA: 'APL'},
        {title: 'Bitcoin', AKA: 'BTC'},
        {title: 'Ethereum', AKA: 'ETH'},
        {title: 'Juventus', AKA: 'JUVE.MI'}
    ]

    const theme = createTheme({
    components: {
        MuiIcon: {
        styleOverrides: {
            root: {
            // Match 24px = 3 * 2 + 1.125 * 16
            boxSizing: 'content-box',
            padding: 3,
            fontSize: '1.125rem',
            },
        },
        },
    },
    });

    let stories = [
        {
            id: 1,
            title: 'You have to be better than me',
            body: 'I lost $2000 in two days.\n' +
                'Please avoid these mistakes',
            content: [{
                type: 'Subtitle',
                content: 'The Secret to Financial Freedom Is Investing Over Time\n',
                show_buttons: false,
                alignment: 'left',
                formats: []
            }, {
                type: 'Paragraph',
                content: 'Jack\'s earnings will grow so large, they\'ll exceed all of his contributions combined. After 20 years of investing, Jack contributed $48,000 total. That same year, his $48,000 earned over $56,000. By year 25, his earnings ($103,000) are over 70 percent larger than his total contributions ($60,000).\n' +
                    '\n' +
                    'This is why time is so important in investing: Given enough time, your earnings can compound to take on a life of their own. Even better is they can become self-sustainable. When your money is earning enough money that you no longer need to work, you\'ve achieved financial independence.',
                show_buttons: false,
                image: './static/images/story/graph_story.png',
                alignment: 'left',
                formats: []
            }],
            asset: ['JUVE.MI', 'APL'],
            date_idx: 2,
            by: '',
            generateDate: '17 hours ago',
            generate: 'AI',
            views: 213,
            likes: 90,
            liked: true,
            bookMark: false,
            width: 6,
            isAI: true,
            review: '80%',
            cover_img: 'cover_4',
            video_available: false
        },
        {
            id: 2,
            title: 'Earn over time',
            body: 'Dollar-cost averaging is a simple technique that entails investing a fixed amount of money in the same fund or stock at regular intervals over a long period of time.',
            content: [{
                type: 'Subtitle',
                content: 'Use Dollar-Cost Averaging to Build Wealth Over Time',
                show_buttons: false,
                alignment: 'left',
                formats: []
            }, {
                type: 'Paragraph',
                content: 'Dollar-cost averaging is a simple technique that entails investing a fixed amount of money in the same fund or stock at regular intervals over a long period of time.\n' +
                    '\n' +
                    'If you have a 401(k) retirement plan, you\'re already using this strategy.\n' +
                    '\n' +
                    'Make no mistake, dollar-cost averaging is a strategy, and it\'s one that can get results that are as good or better than aiming to buy low and sell high. As many experts will tell you, nobody can time the market.',
                show_buttons: false,
                alignment: 'left',
                formats: []
            }, {
                type: 'Subtitle',
                content: 'Lorem Ipsum',
                show_buttons: false,
                alignment: 'left',
                formats: []
            }, {
                type: 'Paragraph',
                content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                show_buttons: false,
                alignment: 'left',
                formats: []
            }],
            asset: ['ETH', 'APL'],
            date_idx: 4,
            by: 'Mario Rossi',
            generateDate: '20 minutes ago',
            generate: 'Mario Rossi',
            views: 132,
            likes: 90,
            liked: true,
            bookMark: true,
            width: 3,
            isAI: false,
            review: '55%',
            cover_img: 'cover_2',
            video_available: true,
            video: 'video_1'
        },
        {
            id: 3,
            title: "This is the right pattern to start",
            body: 'I lost $2000 in two days.\n' +
                'Please avoid these mistakes',
            content: [{
                type: 'Subtitle',
                content: 'The Secret to Financial Freedom Is Investing Over Time\n',
                show_buttons: false,
                alignment: 'left',
                formats: []
            }, {
                type: 'Paragraph',
                content: 'Jack\'s earnings will grow so large, they\'ll exceed all of his contributions combined. After 20 years of investing, Jack contributed $48,000 total. That same year, his $48,000 earned over $56,000. By year 25, his earnings ($103,000) are over 70 percent larger than his total contributions ($60,000).\n' +
                    '\n' +
                    'This is why time is so important in investing: Given enough time, your earnings can compound to take on a life of their own. Even better is they can become self-sustainable. When your money is earning enough money that you no longer need to work, you\'ve achieved financial independence.',
                show_buttons: false,
                image: './static/images/story/graph_story.png',
                alignment: 'left',
                formats: []
            }],
            asset: ['APL'],
            date_idx: 1,
            by: 'Lorenzo Santo',
            generateDate: '2 days ago',
            generate: 'Lorenzo Santo',
            views: 687,
            likes: 90,
            liked: true,
            bookMark: false,
            width: 3,
            isAI: false,
            review: '80%',
            cover_img: 'cover_1',
            video_available: true,
            video: 'video_2'
        },
        {
            id: 4,
            title: 'Learn from my mistakes',
            body: 'Nobody\'s perfect. We are all going to have our wins and losses, especially when it comes to investing. But some of the stocks are actually pretty common and by no means reserved exclusively for [...]',
            content: [{
                type: 'Subtitle',
                content: 'The Secret to Financial Freedom Is Investing Over Time\n',
                show_buttons: false,
                alignment: 'left',
                formats: []
            }, {
                type: 'Paragraph',
                content: 'Jack\'s earnings will grow so large, they\'ll exceed all of his contributions combined. After 20 years of investing, Jack contributed $48,000 total. That same year, his $48,000 earned over $56,000. By year 25, his earnings ($103,000) are over 70 percent larger than his total contributions ($60,000).\n' +
                    '\n' +
                    'This is why time is so important in investing: Given enough time, your earnings can compound to take on a life of their own. Even better is they can become self-sustainable. When your money is earning enough money that you no longer need to work, you\'ve achieved financial independence.',
                show_buttons: false,
                image: './static/images/story/graph_story.png',
                alignment: 'left',
                formats: []
            }],
            asset: ['ETH', 'BTC'],
            date_idx: 3,
            by: '',
            generateDate: '3 hours ago',
            generate: 'AI',
            views: 234,
            likes: 90,
            liked: true,
            bookMark: true,
            width: 3,
            isAI: true,
            review: '85%',
            cover_img: 'cover_3',
            video_available: true,
            video: 'video_3'
        },
    ]

    const [storiesState, setStoriesState] = useState(stories);
    const [includeAIstories, setIncludeAIstories] = useState(true)
    const [bookMark, setBookMark] = React.useState(false)
    const [selected, setSelected] = React.useState(false);

    const setFavourite = (i) => {
        let newStoriesState = [...storiesState]
        newStoriesState[i.id-1].bookMark = !newStoriesState[i.id-1].bookMark
        setStoriesState((newStoriesState) => [...newStoriesState])
    }

    const showStory = (i) => {
        navigate('/watchStory',{state: i});
    }

    const [changeState,setChangeState] =useState(story.followed)
    
    return (
        <>
        <Grid container fluid>
            <Row>
                <Col>
                    <IconButton aria-label="account" onClick={() => navigate(-1)}>
                        <ArrowBackIcon sx={{ fontSize: 50 }} />
                    </IconButton>
                    <Typography gutterBottom variant="h2" component="div" justifyContent="center" alignItems="center">
                        <center>Overviews</center>
                    </Typography>
                </Col>
            </Row>
        </Grid>

        <Grid container fluid>
            <Row>
                <Col>
                    <Grid sx={{ borderRadius: '16px' }} style={{ padding: "10px", marginTop: "5px", marginBottom: "25px", backgroundColor: "#eee"}}>
                        <Box display="flex" sx={{ flexGrow: 1 }}>
                            <Grid container spacing={3}>
                                <Grid item xs sm={3}>
                                    <Icon aria-label="account">
                                        <AccountCircleOutlinedIcon sx={{ fontSize: 180 }}/>
                                    </Icon>
                                </Grid>
                                <Grid item xs={3} sm={8}>
                                    <Typography gutterBottom variant="h3" component="div">
                                        {name}                                    
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="div">
                                        Story teller<br></br>
                                    </Typography>
                                    {story.description}<br></br>
                                    {/* <Typography gutterBottom variant="h6" component="div">
                                       <ThemeProvider theme={theme}>
                                           <Icon icon="mdi:bitcoin" />
                                       </ThemeProvider>
                                       <ThemeProvider theme={theme}>
                                           <Icon icon="mdi:bitcoin" />
                                       </ThemeProvider>             
                                    </Typography> */}
                                </Grid>
                                <Grid item xs={1} sm={1}>
                                    <Card display="flex" m="auto" style={{float:'right', marginBottom: "5px"}}>
                                        <IconButton aria-label="favorite" onClick={()=>setChangeState(!changeState)}>
                                            {changeState===true ? <Favorite></Favorite> : <FavoriteBorder></FavoriteBorder>}
                                        </IconButton>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Box>
                        
                        <Typography component="div">
                            {content}                        
                        </Typography>
                    </Grid>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Typography gutterBottom variant="h2" component="div">
                            <center>{name.split(" ")[0]}'s Stories</center>
                        <Divider />
                    </Typography>
                </Col>

                <Col>
                    <Grid container spacing={4} style={{paddingBottom: '50px'}} columnSpacing={{xs: 3, sm: 4, md: 5}}>
                        {storiesState.map(i => (
                            <Grid key={i.id} item xs={6}>
                                <Card variant="outlined" sx={{minWidth: 350}}>
                                    <CardActionArea onClick={() => showStory(i)}>
                                        <CardMedia
                                            component="img"
                                            height="194"
                                            image={i.cover_img.startsWith('cover') ? `../static/images/stories/${i.cover_img}.jpg` : `${i.cover_img}`}
                                            alt="Paella dish"
                                        />
                                        <CardContent>
                                            <Grid2 container spacing={0}>
                                                <Grid2 item xs={9}>
                                                    <Typography variant="h4" component="div">
                                                        {i.title}
                                                    </Typography>
                                                </Grid2>

                                                <Grid2 item xsOffset={1} xs={2} display={"flex"} justifyContent={"end"}
                                                       alignItems={"end"}>
                                                    {i.asset.map((element, index) => (
                                                        <>
                                                            <Tooltip title={stocks_list.find((e) => e.AKA === element).title} placement={"top"}><Chip label={element} variant="outlined"/></Tooltip>
                                                            <div>&nbsp;</div>
                                                        </>
                                                    ))}
                                                </Grid2>
                                            </Grid2>
                                            <Typography style={{fontSize: 16}} variant="subtitle2">Written by {i.generate}</Typography>
                                            <br></br>
                                            <Stack direction="row"
                                                   justifyContent="start"
                                                   alignItems="center"
                                            >   <Box sx={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
                                                <Tooltip style={{fontSize: '28px'}} title={'Satisfaction rate'} placement={'top'}><Recommend fontSize={'inherit'} color={'primary'}></Recommend></Tooltip>
                                                <Typography style={{fontSize: '16px'}} color={'primary'} variant={'body 1'}>{i.review}</Typography>
                                            </Box>

                                                {/*{i.video_available ? <Divider orientation={'vertical'} flexItem ></Divider> : ''}*/}
                                                {i.video_available ? <div style={{paddingLeft: '8px'}}></div> : ''}

                                                {i.video_available ? <Tooltip style={{fontSize: '28px'}} title={'Video available'} placement={'top'}><PlayCircle fontSize={'inherit'} color={'error'}></PlayCircle></Tooltip> : ''}
                                            </Stack>
                                            <br></br>
                                            <Divider/>
                                            <br></br>

                                            <Typography style={{minHeight: '75px'}} variant="h6" >
                                                "{i.body}"
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <Grid2 container spacing={0} style={{paddingLeft: 25}}>
                                        <Grid2 item xs={9}>
                                            <Typography variant="body2">Published: {i.generateDate}</Typography>
                                        </Grid2>
                                        <Grid2 item xsOffset={1} xs={2} display={"flex"} justifyContent={"end"}
                                               alignItems={"end"}>
                                            <CardActions style={{float: 'right'}}>
                                                <Tooltip title={'Add to favourites'}>
                                                    <IconButton onClick={() => setFavourite(i)}
                                                                color={i.bookMark ? "primary" : ""} aria-label="like">
                                                        <Bookmark sx={{fontSize: 30}}/>
                                                    </IconButton>
                                                </Tooltip>
                                            </CardActions>
                                        </Grid2>
                                    </Grid2>

                                </Card>
                    </Grid>
                        ))}
                    </Grid>
                </Col>
            </Row>
        </Grid>
        </>
        );
    }
export {InvestorsProfileComp}
