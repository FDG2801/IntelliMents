import Row from '@mui/material/Container';
import Col from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import {
    Grid, Card, Box, Button, Typography,
} from "@mui/material";

const styleObj = {
    paddingTop: "50px",
    alignItems: 'center',
}

export default function ContactComp(props) {

    return (
        <Grid container fluid>
            <Row>
                <Col>
                    <Card style={{ padding: "15px", marginTop: "25px", marginBottom: "5px"}}>
                        <Typography variant="h5" gutterBottom style={styleObj}>Mobile phone: +123456789</Typography>
                        
                        <p>Our live chat is now: <b>closed - We are open on Saturday and Sunday, both days from 08:00 CET to 20:00 CET</b></p>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Button style={{marginTop: "20px"}} variant="contained" color="primary" size='large'>Chat with us</Button>
                        </Box>

                        <Card display="flex" justifyContent="center" alignItems="center" style={{padding: "20px", marginTop: "30px", marginBottom: "30px", backgroundColor: "#eee"}} sx={{ border: 1, borderRadius: '16px' }}>
                
                        <form style = {{marginTop: "20px"}}>
                        <p><b>Send us an email</b></p>
                        <Card component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
                        <div>
                            <TextField id="filled-multiline-flexible" label="Email" multiline maxRows={4} variant="filled"/>

                            <TextField id="filled-multiline-static" label="Message" multiline rows={4} placeholder="Your message" variant="filled"/>
                        </div>
                        </Card>

                        <Box display="flex" justifyContent="center" alignItems="center">
                            <Button style={{marginTop: "20px"}} variant="contained" color="primary" size='large'>Submit</Button>
                        </Box>
                        </form>
                        </Card>
                    </Card>
                </Col>
            </Row>
        </Grid>
    );
}


export {ContactComp}
