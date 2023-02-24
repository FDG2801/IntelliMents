import Row from '@mui/material/Container';
import Col from '@mui/material/Container';

import {
    Grid, Card, Box, Button, Typography, Divider,
} from "@mui/material";

const styleObj = {
    fontSize: 35,
    color: "#000",
    paddingTop: "25px",
    paddingBottom: "30px",
}

const styleObjBold = {
    fontSize: 25,
    color: "#000",
    fontWeight: "bold",
    paddingTop: "30px",
}

export default function HelpComp(props) {

    return (
        <Grid container fluid>
            <Row>
                <Col>
                    <Card style={{ padding: "15px", marginTop: "25px", marginBottom: "5px"}}>
                        <Typography variant="h3" gutterBottom style={styleObj}>FAQ</Typography>
                        <Divider></Divider>

                        <Typography variant="h5" gutterBottom style={styleObjBold}>Question 1</Typography>
                        <Typography variant="body1" gutterBottom><b>Answers:</b> Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica with ranging across all continents except Antarctica</Typography>
                        
                        <Typography variant="h5" gutterBottom style={styleObjBold}>Question 2</Typography>
                        <Typography variant="body1" gutterBottom><b>Answers:</b> Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica with ranging across all continents except Antarctica</Typography>

                        <Typography variant="h5" gutterBottom style={styleObjBold}>Question 3</Typography>
                        <Typography variant="body1" gutterBottom><b>Answers:</b> Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica with ranging across all continents except Antarctica</Typography>

                        <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
                            <Button style={{marginTop: "50px"}} variant="contained" color="primary" size='large' onClick={()=> window.location.href='/About/Contact'}>Contact us</Button>
                        </Box>
                    </Card>
                </Col>
            </Row>
        </Grid>
    );
}

export {HelpComp}
