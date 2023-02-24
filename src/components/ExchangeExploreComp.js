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
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createEntry(currency, price, change, market_cap) {
    return { currency, price, change, market_cap };
}

const rows = [
    createEntry('BTC', "+$500", "...", "..."),
    createEntry('BNB', "+$125", "...", "..."),
    createEntry('LTC', "-57", "...", "..."),
    createEntry('ETH', "+$12", "...", "..."),
];

export default function ExchangeExploreComp(prop) {
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
            <TextField fullWidth id="outlined-basic" label="Search for a crypto" variant="outlined" />
            <br></br>
            <br></br>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Currency name</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Change&nbsp;(g)</TableCell>
                    <TableCell align="right">Market cap&nbsp;(g)</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow
                    key={row.currency}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.currency}
                    </TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.change}</TableCell>
                    <TableCell align="right">{row.market_cap}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </Grid2>
        </>
    );
}

export {ExchangeExploreComp}