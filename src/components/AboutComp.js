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

export default function AboutComp(props) {

    return (
        <Grid container fluid>
            <Row>
                <Col>
                    <Card style={{ padding: "15px", marginTop: "25px", marginBottom: "5px"}}>
                        <Typography variant="h3" gutterBottom style={styleObj}>Learn from stories of successful and bad investments with detailed reasoning</Typography>
                        <Divider></Divider>

                        <Typography variant="h5" gutterBottom style={styleObjBold}>Our story</Typography>
                        <Typography variant="body1" gutterBottom>The moderate task is covered in the Investor section. The user here can search the top investors in the platform and follow them, to understand their investments and how they did act in those. The user can also search for a particular investor if he wants. The user can also visualize the followed investors. The user can also read stories in the Stories section. Here the user will see some stories that an algorithm think could be useful for him. Stories are wrote from humans or from an Artificial Intelligence.</Typography>
                        <br/>

                        <Typography variant="body1" gutterBottom>The complex task can be found in the Stories section, when the user decide to write a story. The user can decide of which investments he wants to talk about in a story, then he will write the story and, eventually, become a storyteller if the staff approves.</Typography>
                        <Box m={1} display="flex" justifyContent="flex-end" alignItems="flex-end">
                            <Button style={{marginTop: "50px"}} variant="contained" color="primary" size='large' onClick={()=> window.location.href='/About/Contact'}>Contact us</Button>
                        </Box>
                    </Card>
                </Col>
            </Row>
        </Grid>
    );
}

export {AboutComp}
