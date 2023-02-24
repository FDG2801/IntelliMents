import {
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
} from "@mui/material";
import {Favorite, Share} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {useState} from "react";

const news = [
    {
        id: 1,
        title: 'News1',
        body: 'Lizards are a widespread group of squamate reptiles, with over 6,000\n' +
            'species, ranging across all continents except Antarctica with ranging across all continents except Antarctica with ranging across all continents except Antarctica with ranging across all continents except Antarctica with ranging across all continents',
        img: 'cover_1',
        views: 213,
        likes: 90,
        liked: true,
        width: 6
    },
    {
        id: 2,
        title: 'News2',
        body: 'Lizards are a widespread group of squamate reptiles, with over 6,000\n' +
            'species, ranging across all continents except Antarctica with ranging across all continents except Antarctica',
        img: 'cover_2',
        views: 132,
        likes: 90,
        liked: true,
        width: 3
    },
    {
        id: 3,
        title: 'News3',
        body: 'Lizards are a widespread group of squamate reptiles, with over 6,000\n' +
            'species, ranging across all continents except Antarctica with ranging across all continents except Antarctica',
        img: 'cover_3',
        views: 687,
        likes: 90,
        liked: true,
        width: 3
    },
    {
        id: 4,
        title: 'News4',
        body: 'Lizards are a widespread group of squamate reptiles, with over 6,000\n' +
            'species, ranging across all continents except Antarctica with ranging across all continents except Antarctica',
        img: 'cover_4',
        views: 234,
        likes: 90,
        liked: true,
        width: 3
    },
    {
        id: 5,
        title: 'News5',
        body: 'Lizards are a widespread group of squamate reptiles, with over 6,000\n' +
            'species, ranging across all continents except Antarctica with ranging across all continents except Antarctica',
        img: 'cover_5',
        views: 33,
        likes: 90,
        liked: true,
        width: 3
    },
    {
        id: 6,
        title: 'News6',
        body: 'Lizards are a widespread group of squamate reptiles, with over 6,000\n' +
            'species, ranging across all continents except Antarctica with ranging across all continents except Antarctica',
        img: 'cover_6',
        views: 443,
        likes: 90,
        liked: true,
        width: 3
    },
    {
        id: 7,
        title: 'News7',
        body: 'Lizards are a widespread group of squamate reptiles, with over 6,000\n' +
            'species, ranging across all continents except Antarctica with ranging across all continents except Antarctica',
        img: 'cover_7',
        views: 123,
        likes: 90,
        liked: true,
        width: 3
    }
]


export default function NewsComp(props) {
    const [newsState, setNewsState] = useState(news)

    const setFavourite = (i) => {
        let newNews = [...newsState]
        newNews[i.id - 1].liked = !newNews[i.id - 1].liked
        setNewsState((newNews) => [...newNews])
    }

    return (
        <>
            <Typography align="center" variant="h2" style={{paddingBottom: '30px'}}>Make sure you are always up to date</Typography>
            <Grid container fluid="sm" spacing={2} style={{paddingBottom: '50px'}}>
                {newsState.map(i => (
                    <Grid key={i.id} item xs={i.width}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={`./static/images/news/${i.img}.jpg`}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {i.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {i.body}
                                    </Typography>

                                </CardContent>
                            </CardActionArea>
                            <CardActions disableSpacing>
                                <Typography>{i.views} views - {i.likes} likes</Typography>
                                <IconButton onClick={() => setFavourite(i)} color={i.liked ? "primary" : ""}
                                            aria-label="like">
                                    <Favorite/>
                                </IconButton>
                                <IconButton aria-label="share">
                                    <Share/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}


export {NewsComp}
