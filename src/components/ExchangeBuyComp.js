import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import ExploreIcon from '@mui/icons-material/Explore';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ExchangeBuyComp(prop) {
    const [expanded, setExpanded] = React.useState(false);
    const navigate=useNavigate();
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const [currency, setCurrency] = React.useState('');

    const handleChange2 = (event) => {
        setCurrency(event.target.value);
    };

    const [payment, setPayment] = React.useState('');

    const handleChange3 = (event) => {
        setPayment(event.target.value);
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [open2, setOpen2] = React.useState(false);

    const handleClickOpen2 = () => {
        setOpen(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    const close1Open2 = () => {
        setOpen(false);
        setOpen2(true);
    };

    const [exitDialog, setExitDialog] = React.useState(false);

    const handleExitOpen = () => {
        setExitDialog(true);
    };

    const handleExitClose = () => {
        setExitDialog(false);
    };
    
    return (
        <>
        {/* Insert Balance and Explore instead of Story and my stories
        */}
        <Grid container rowSpacing={2}>
                <Grid item xs={3}>
                <IconButton aria-label="account" onClick={handleExitOpen}>
                        <ArrowBackIcon sx={{ fontSize: 50 }} />
                    </IconButton>
                    <Dialog
                        open={exitDialog}
                        onClose={handleExitClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                        {"Are you sure you want to cancel your purchase?"}
                        </DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            You are in the purchase page and are about to purchase some currency. 
                            Are you sure you want to cancel your purchase? If you click "I AM SURE" you will cancel your purchase and you have to begin a new one.
                            If you are not sure, click "NO, STAY"
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleExitClose}>NO, STAY</Button>
                        <Button onClick={()=>navigate(-1)}>I AM SURE</Button>
                        </DialogActions>
                    </Dialog>
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
        <Accordion expanded={true} onChange={handleChange('panel2')}>
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
                        <Grid2>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={currency}
                            label="Currency"
                            onChange={handleChange2}
                            required="required"
                        >
                            <MenuItem value={"Eur"}>€</MenuItem>
                            <MenuItem value={"USD"}>$</MenuItem>
                            <MenuItem value={"JPY"}>¥</MenuItem>
                            <MenuItem value={"BTC"}>฿</MenuItem>
                        </Select>
                        <FormHelperText>Select the currency you want to charge</FormHelperText>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Insert the amount "
                                multiline
                                maxRows={4}
                                required="required"
                            />
                            <FormHelperText>Write the amount you want to charge</FormHelperText>
                            </FormControl>
                                <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Payment</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={payment}
                                    label="Payment"
                                    onChange={handleChange3}
                                    required="required"
                                    >
                                    <MenuItem value={"pp"}>PayPal</MenuItem>
                                    <MenuItem value={"bonifico"}>Bank transfer</MenuItem>
                                    </Select>
                                    <FormHelperText>Select your preferred payment method</FormHelperText>
                                </FormControl>
                                <br></br>
                                <br></br>
                                </Box>
                                <Box sx={{ minWidth: 120 }}>
                                <FormControl fullWidth>
                                    <Stack direction="row" spacing={2}>
                                    <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleExitOpen}>
                                        Cancel Operation
                                    </Button>
                                    <Button variant="contained" endIcon={<ShoppingCartCheckoutIcon />} onClick={handleClickOpen}>
                                        Buy BTC
                                    </Button>
                                    </Stack>
                                    <Dialog
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">
                                        {"Purchase confirmed"}
                                        </DialogTitle>
                                        <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Clicking confirm will buy you the amount you inserted. Do you want to continue?
                                        </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                        <Button onClick={handleClose}>NO, I DO NOT</Button>
                                        <Button onClick={close1Open2} autoFocus>
                                            YES, CONTINUE
                                        </Button>
                                        </DialogActions>
                                </Dialog>
                                <Dialog
                                        open={open2}
                                        onClose={handleClose2}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">
                                        {"Purchase Confirmed"}
                                        </DialogTitle>
                                        <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            Thank you for your purchase. Clicking CONTINUE will redirect you to the Exchange page.
                                        </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                        <Button onClick={() => navigate('/Exchange')} autoFocus>
                                            CONTINUE
                                        </Button>
                                        </DialogActions>
                                </Dialog>
                                </FormControl>
                                </Box>
                        </Grid2>
                    </Grid2>
                    <Grid2 container spacing={2} columns={16} style={{paddingTop: '30px'}}>
                        <Grid2 xs={8}>
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                <Button onClick={() => navigate('/ExchangeBuy')} disabled>Buy</Button>
                                <Button disabled>Sell</Button>
                            </ButtonGroup>
                        </Grid2>
                        <Grid2 xs={8}>
                            
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

export {ExchangeBuyComp}