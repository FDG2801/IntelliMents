import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import {Add, Favorite, FilterList, Folder, Info, Search, Share} from "@mui/icons-material";
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import ExploreIcon from '@mui/icons-material/Explore';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function ExchangeComp(prop) {
    const [expanded, setExpanded] = React.useState(false);
    const navigate=useNavigate();
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    
    return (
        <>
        {/* Insert Balance and Explore instead of Story and my stories
        */}
        <Grid container rowSpacing={2}>
                <Grid item xs={3}>
                    <Button onClick={() => navigate('/Exchange')} variant={"outlined"} startIcon={<CurrencyBitcoinIcon></CurrencyBitcoinIcon>}>Balance</Button>&nbsp;&nbsp;
                    <Button onClick={()=>navigate('/Exchange/Explore')} variant={"outlined"} startIcon={<ExploreIcon></ExploreIcon>}>Explore</Button>
                </Grid>
        </Grid>
        {/**Starting page */}
        <Grid2 style={{paddingTop: '30px'}}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                Your Balance
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Check Your Balance</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Card sx={{ minWidth: 1024 }}>
                <CardContent>
                    <Grid2 container spacing={2} columns={16} style={{paddingTop: '30px'}}>
                        <Grid2 xs={8}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Your current balance: 
                            </Typography>
                            <Typography variant="h5" component="div">
                            +$625.35
                            </Typography>
                        </Grid2>
                        <Grid2 xs={8}>
                            <ButtonGroup variant="text" aria-label="text button group">
                                <Button>All</Button>
                                <Button>1m</Button>
                                <Button>1y</Button>
                                <Button>1h</Button>
                                <Button>1d</Button>
                            </ButtonGroup>
                        </Grid2>
                    </Grid2>
                    <Grid2 container spacing={2} columns={16} style={{paddingTop: '30px'}}>
                        <Grid2 xs={8}>
                        <img src="./static/images/news/chartExchange.png" alt='Graph' width="124" height="124"/>
                        </Grid2>
                        <Grid2 xs={8}>
                            <img src="./static/images/news/secondchartExchange.png" alt='Graph' width="500" height="200"/>
                        </Grid2>
                    </Grid2>
                </CardContent>
                </Card>
            </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
            >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>BTC</Typography>
            <Typography sx={{ color: 'text.secondary' }}>
                Check your BITCOIN balance
            </Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Card sx={{ minWidth: 1024 }}>
                <CardContent>
                    <Grid2 container spacing={2} columns={16} style={{paddingTop: '30px'}}>
                        <Grid2 xs={8}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Your BTC balance: 
                            </Typography>
                            <Typography variant="h5" component="div">
                            +$19.855
                            </Typography>
                        </Grid2>
                        <Grid2 xs={8}>
                            <ButtonGroup variant="text" aria-label="text button group">
                                <Button>All</Button>
                                <Button>1m</Button>
                                <Button>1y</Button>
                                <Button>1h</Button>
                                <Button>1d</Button>
                            </ButtonGroup>
                        </Grid2>
                    </Grid2>
                    <Grid2 container spacing={2} columns={16} style={{paddingTop: '30px'}}>
                        <Grid2 xs={8}>
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                <Button onClick={() => navigate('/ExchangeBuy')}>Buy</Button>
                                <Button>Sell</Button>
                            </ButtonGroup>
                        </Grid2>
                        <Grid2 xs={8}>
                            <img src="./static/images/news/secondchartExchange.png" alt='Graph' width="500" height="200"/>
                        </Grid2>
                    </Grid2>
                </CardContent>
                </Card>
            </AccordionDetails>
        </Accordion>
        </Grid2>
        </>
    );
}

export {ExchangeComp}