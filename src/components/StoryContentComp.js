import {
    Box,
    Button,
    Card, CardActionArea, CardActions, CardContent, CardMedia, Chip,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider, Grid, Snackbar, Stack,
    Tooltip,
    Typography
} from "@mui/material";
import {
    Bookmark, Close, Recommend,
    StarRate, PlayCircle
} from "@mui/icons-material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { useLocation } from 'react-router-dom';
import { Rating } from "@mui/lab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

/**
 * To use props refer to this:
 *  titolo:i.title,
    id: i.id,
    body:i.body,
    img:i.img,
    views:i.views,
    likes:i.likes,
    liked: i.liked,
    width: i.width
 */
export default function StoryContentComp(props) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [ratingSent, setRatingSent] = useState(false)

    const stocks_list = [
        { title: 'Apollo', AKA: 'APL' },
        { title: 'Bitcoin', AKA: 'BTC' },
        { title: 'Ethereum', AKA: 'ETH' },
        { title: 'Juventus', AKA: 'JUVE.MI' }
    ]

    const handleRatingSentClose = () => {
        setRatingSent(false)
    }

    const sendRating = (
        <Fragment>
            <Button variant="contained" color="primary" size="small" onClick={() => { handleRatingSentClose(); setOpen(true) }}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleRatingSentClose}
            >
                <Close fontSize="small" />
            </IconButton>
        </Fragment>
    );

    const handleClose = () => {
        setOpen(false);
        setRatingSent(true)
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const location = useLocation();
    const story = location.state
    const asset = story.asset
    const content = story.content

    let cover_img
    let videoPresentation
    if (story.id === 5)
        cover_img = story.cover_img
    else
        cover_img = `./static/images/stories/${story.cover_img}.jpg`

    if (story.id === 5)
        videoPresentation = story.video
    else
        videoPresentation = `./static/videos/stories/${story.video}.mp4`
    return (
        <Grid container spacing={0.5} style={{ paddingTop: 30 }}>
            <Grid xs={8}>
                <IconButton aria-label="account" onClick={() => navigate(-1)}>
                    <ArrowBackIcon sx={{ fontSize: 30 }} />
                </IconButton>
                <Typography variant={"h2"}>{story.title}</Typography>
                <Typography variant={"body1"}>Published: {story.generateDate}</Typography>
                {story.by.length === 0 ? <Typography variant={"body1"}>Written by: AI</Typography> : <Typography variant={"body1"}>Written by: {story.by}</Typography>}
                <br></br>
                <Box sx={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <Stack
                        direction="row"
                        spacing={1}
                    >
                        {asset.map((element, index) => (
                            <Chip label={element} variant="outlined" />
                        ))}
                        <Grid2
                            xs={12}
                            container
                            justifyContent="space-between"
                            alignItems="center"
                            flexDirection={{ xs: 'column', sm: 'row' }}
                            sx={{ fontSize: '12px' }}
                        >
                            <Grid2 sx={{ order: { xs: 2, sm: 1 } }}>
                            </Grid2>
                            <Grid2 container columnSpacing={1} sx={{ order: { xs: 1, sm: 2 } }}>

                                <Stack direction="row"
                                    justifyContent="start"
                                    alignItems="center"
                                >   <Box sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                                        <Tooltip style={{ fontSize: '28px' }} title={'Satisfaction rate'} placement={'top'}><Recommend fontSize={'inherit'} color={'primary'}></Recommend></Tooltip>
                                        <Typography style={{ fontSize: '16px' }} color={'primary'} variant={'body 1'}>{story.review}</Typography>
                                    </Box>

                                    {/*{i.video_available ? <Divider orientation={'vertical'} flexItem ></Divider> : ''}*/}
                                    {story.video_available ? <div style={{ paddingLeft: '8px' }}></div> : ''}

                                    {story.video_available ? <Tooltip style={{ fontSize: '28px' }} title={'Video available'} placement={'top'}><PlayCircle fontSize={'inherit'} color={'error'}></PlayCircle></Tooltip> : ''}
                                </Stack>

                                <Grid2>
                                    <Button onClick={handleClickOpen} variant={"outlined"} startIcon={<StarRate></StarRate>}>Rate</Button>
                                    <Snackbar
                                        open={ratingSent}
                                        autoHideDuration={6000}
                                        onClose={handleRatingSentClose}
                                        message="Rating sent! Thank you for your contribution"
                                        action={sendRating}
                                    />
                                </Grid2>
                            </Grid2>
                        </Grid2>
                    </Stack>
                    <br></br>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Make you count!"}
                        </DialogTitle>
                        <DialogContent style={{ maxWidth: 1000 }}>
                            <DialogContentText id="alert-dialog-description">
                                <Grid container>
                                    <Grid xs={9}>
                                        <Typography variant={"body2"}>Do you like this story?</Typography>
                                    </Grid>
                                    <Grid xs={3}>
                                        <Rating name="half-rating" defaultValue={0} />
                                    </Grid>
                                </Grid>
                                <br /><br />
                                <Grid container>
                                    <Grid xs={9}>
                                        <Typography variant={"body2"}>How likely are you to recommend this story to your friends?</Typography>
                                    </Grid>
                                    <Grid xs={3}>
                                        <Rating name="half-rating" defaultValue={0} />
                                    </Grid>
                                </Grid>
                                <br /><br />
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>SEND</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
                {story.cover_img ? <><Box
                    component="img"
                    sx={{
                        width: "100%",
                    }}
                    alt="The house from the offer."
                    src={cover_img}
                /><br></br><br></br></> : ''}
                {story.video_available ? <><Box
                    component="video"
                    controls
                    sx={{
                        width: "100%",
                    }}
                    alt="The house from the offer."
                    src={videoPresentation}
                /><br></br></> : ''}
                <br></br>
                <Divider></Divider>

                <br></br>
                {content.map((element, index) => (
                    element.type === "Subtitle" ? <><Typography variant={"h4"} key={index}>{element.content}</Typography></>
                        :
                        <>
                            <Typography align={element.alignment} key={index} fontSize={18} fontFamily={"`\"Roboto\", \"Helvetica\", \"Arial\", sans-serif`,"} variant={"body1"}>{element.content}</Typography>
                            <br></br>
                        </>
                ))}


            </Grid>
            <Grid style={{ marginLeft: 0 }} item xs>
                <Divider orientation="vertical"></Divider>
            </Grid>
            <Grid xs={3} style={{ paddingLeft: 100 }} justifyContent="center" alignItems="center">
                <Typography variant={"h5"}>Recent Stories & News</Typography>
                <br></br>
                <Stack
                    direction="column"
                    justifyContent="space-evenly"
                    alignItems="center"
                    spacing={4}
                >


                    <Card variant="outlined" sx={{ minWidth: 350 }}>
                        {/*<CardActionArea onClick={() => showStory(i)}>*/}
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="194"
                                image={`./static/images/stories/cover_4.jpg`}
                                alt="Paella dish"
                            />
                            <CardContent>
                                <Grid2 container spacing={0}>
                                    <Grid2 item xs={9}>
                                        <Typography variant="h4" component="div">
                                            Dummy title
                                        </Typography>
                                    </Grid2>

                                    <Grid2 item xsOffset={1} xs={2} display={"flex"} justifyContent={"end"}
                                        alignItems={"end"}>
                                        {['APL', 'BTC'].map((element, index) => (
                                            <><Chip label={element} variant="outlined" />
                                                <div>&nbsp;</div>
                                            </>
                                        ))}
                                    </Grid2>
                                </Grid2>
                                <Typography variant="subtitle2">Written by: Dummy author</Typography>
                                <br></br>
                                <Divider />
                                <br></br>

                                <Typography variant="h6" >
                                    "This is just a dummy quote"
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <Grid2 container spacing={0} style={{ paddingLeft: 25 }}>
                            <Grid2 item xs={9}>
                                <Typography variant="body2">Published: 50 seconds ago</Typography>
                            </Grid2>
                            <Grid2 item xsOffset={1} xs={2} display={"flex"} justifyContent={"end"}
                                alignItems={"end"}>
                                <CardActions style={{ float: 'right' }}>
                                    <Tooltip title={'Add to favourites'}>
                                        {/*<IconButton onClick={() => setFavourite(i)}*/}
                                        {/*            color={i.bookMark ? "primary" : ""} aria-label="like">*/}
                                        <IconButton
                                            aria-label="like">
                                            <Bookmark sx={{ fontSize: 30 }} />
                                        </IconButton>
                                    </Tooltip>
                                </CardActions>
                            </Grid2>
                        </Grid2>

                    </Card>
                </Stack>
            </Grid>

        </Grid>
    );
}



export { StoryContentComp }
