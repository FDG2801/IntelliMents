import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {useState, Fragment} from "react";
import {
    Card,
    CardActionArea,
    CardContent,
    Checkbox, Chip,
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel, ListItem,
    MenuItem,
    Paper, Rating,
    Select, Snackbar,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField, Tooltip
} from "@mui/material";
import {
    Add, ArrowDownward, ArrowLeft, ArrowRight, ArrowUpward,
    CheckCircleRounded, Close, Delete,
    FormatAlignCenter,
    FormatAlignLeft,
    FormatAlignRight,
    FormatBold,
    FormatItalic, FormatUnderlined, PostAdd, Publish,
    Refresh,
    Star, StarRate,
    Verified
} from "@mui/icons-material";
import Grid2 from "@mui/material/Unstable_Grid2";
import {ToggleButtonGroup, ToggleButton} from '@mui/material'
import IconButton from "@mui/material/IconButton";
import {useNavigate} from "react-router-dom";
import FileUploader from "./FileUploader";
import AddCoverImage from "./AddCoverImage";
import List from "@mui/material/List";
import AddVideoPresentation from "./AddVideoPresentation";

const steps = ['Select Investments', 'Choose Modality', 'Write the story', 'Upload Material', 'Overview'];

function CreateStoryStepper(props) {
    const navigate=useNavigate();
    const investmentsArr = [{
        startDate: '10-12-2022',
        endDate: 'In progress',
        asset: ['BTC'],
        revenue: '+$150.00',
        selected: false
    },
        {startDate: '05-07-2020', endDate: '08-11-2021', asset: ['ETH'], revenue: '-$1000.00', selected: false},
        {startDate: '10-01-2021', endDate: '10-10-2022', asset: ['APL'], revenue: '+$100.00', selected: false},
    ]
    const [investments, setInvestments] = useState(investmentsArr)
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [aiPicked, setAiPicked] = useState(true)
    const [openRateDialog, setOpenRateDialog] = useState(false);
    const [openGenerateAgainDialog, setOpenGenerateAgainDialog] = useState(false);
    const [openPublishStory, setOpenPublishStory] = useState(false)
    const [snackBarOpen, setSnackBarOpen] = useState(false)
    const [ratingSent, setRatingSent] = useState(false)
    const [coverImage, setCoverImage] = useState(undefined)
    const [coverImageIsUploaded, setCoverImageIsUploaded] = useState(false)
    const [videoPresentationIsUploaded, setVideoPresentationIsUploaded] = useState(false)
    const [videoPresentation, setVideoPresentation] = useState(undefined)
    const [quote, setQuote] = useState('Example of AI-generated Quote')
    const [ratingValue, setRatingValue] = useState(null)
    const [notebook, setNotebook] = useState([{
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
    }])
    const fragmentOptions = ['Subtitle', 'Paragraph']
    const [notebookTitle, setNotebookTitle] = useState('Example of AI-generated Title')

    const selectInvestment = (index) => {
        setInvestments((old) => {
            let newArr = [...old]
            newArr[index] = {...old[index], selected: !old[index].selected}
            return newArr
        })
    }
    const isStepOptional = (step) => {
        return step === 3;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        if (activeStep === 1 && !aiPicked) {
            setNotebookTitle('')
            setQuote('')
            setNotebook([{type: 'Subtitle', content: '', show_buttons: false, alignment: 'left', formats: []}])
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        if (activeStep === 0)
            navigate(-1)
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const publishStory = () => {
        sessionStorage.setItem('title', notebookTitle)
        sessionStorage.setItem('coverImage', JSON.stringify(coverImage))
        sessionStorage.setItem('videoPresentation', JSON.stringify(videoPresentation))
        sessionStorage.setItem('notebook', JSON.stringify(notebook))
        sessionStorage.setItem('quote', JSON.stringify(quote))
        sessionStorage.setItem('storycreated', 'true')
        navigate('/Stories')
        setOpenPublishStory(false)
    }

    const handleRatingSentClose = (event, reason) => {
        setSnackBarOpen(false);
    };

    const sendRating = (
        <Fragment>
            <Button variant="contained" color="primary" size="small" onClick={() => {handleRatingSentClose(); setOpenRateDialog(true); setRatingSent(false)}}>
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

    const showButtonsOfFragment = (index, b) => {
        setNotebook((old) => {
            let newN = [...old]
            newN[index].show_buttons = b
            return newN
        })
    }

    const addFragment = (index, up) => {
        setNotebook((old) => {
            let fragment = {
                type: 'Paragraph',
                content: 'A new Fragment has been added',
                show_buttons: false,
                alignment: 'left',
                formats: []
            }
            if (up) {
                return [...old.slice(0, index), {...fragment}, ...old.slice(index)]
            } else {
                return [...old.slice(0, index + 1), {...fragment}, ...old.slice(index + 1)]
            }

        })
    }

    const addMedia = (index, up, fileUploaded) => {
        setNotebook((old) => {
            let fragment = {
                type: 'Image',
                show_buttons: false,
                alignment: 'left',
                formats: []
            }
            fragment.content = URL.createObjectURL(fileUploaded)
            if (up) {
                return [...old.slice(0, index), {...fragment}, ...old.slice(index)]
            } else {
                return [...old.slice(0, index + 1), {...fragment}, ...old.slice(index + 1)]
            }
        })
    }

    const uploadCoverImage = (fileUploaded) => {
        if (fileUploaded)
            setCoverImage(URL.createObjectURL(fileUploaded))
        else setCoverImage(undefined)
    }

    const uploadVideo = (fileUploaded) => {
        if (fileUploaded)
            setVideoPresentation(URL.createObjectURL(fileUploaded))
        else setVideoPresentation(undefined)
    }

    const deleteFragment = (index) => {
        setNotebook((old) => {
            return [...old.slice(0, index), ...old.slice(index + 1)]
        })
    }

    const updateContent = (value, index) => {
        setNotebook((old) => [...old.slice(0, index), {...old[index], content: value}, ...old.slice(index + 1)])
    }

    function updateTypeOfFragment(value, index) {
        setNotebook((old) => [...old.slice(0, index), {...old[index], type: value}, ...old.slice(index + 1)])
    }

    const handleAlignment = (event, newAlignment, index) => {
        setNotebook((old) => [...old.slice(0, index), {
            ...old[index],
            alignment: newAlignment
        }, ...old.slice(index + 1)])
    };

    const handleFormat = (event, newFormats, index) => {
        setNotebook((old) => [...old.slice(0, index), {...old[index], formats: newFormats}, ...old.slice(index + 1)])
    };

    const moveIndexUp = (index) => {
        setNotebook((old) => [...old.slice(0, index - 1), {...old[index]}, {...old[index - 1]}, ...old.slice(index + 1)])
    }

    const moveIndexDown = (index) => {
        setNotebook((old) => [...old.slice(0, index), {...old[index + 1]}, {...old[index]}, ...old.slice(index + 2)])
    }

    return (
        <Box sx={{width: '100%'}} style={{paddingTop:30}}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <Card>
                <CardContent>
                    {activeStep === 0 ? (
                            <>

                                <Typography variant='h4' align='center'>Select among your investments the ones you want to
                                    write about</Typography>
                                <div style={{paddingTop: '20px'}}></div>
                                <TableContainer component={Paper} elevation={15}>
                                    <Table aria-label="collapsible table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align='center'>Start date</TableCell>
                                                <TableCell align='center'>End date</TableCell>
                                                <TableCell align='center'>Asset</TableCell>
                                                <TableCell align='center'>Revenue</TableCell>
                                                <TableCell/>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            {investments.map((row, index) => (
                                                <TableRow key={index} hover selected={row.selected}
                                                          sx={{backgroundColor: 'white'}} onClick={() => selectInvestment(index)}>
                                                    <TableCell align='center'>{row.startDate}</TableCell>
                                                    <TableCell align='center'>{row.endDate}</TableCell>
                                                    <TableCell align='center'>{row.asset}</TableCell>
                                                    <TableCell align='center'>{row.revenue}</TableCell>
                                                    <TableCell align='center'><Checkbox
                                                        checked={row.selected}></Checkbox></TableCell>
                                                </TableRow>
                                            ))}

                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            </>
                        ) :
                        activeStep === 1 ?
                            <>
                                <Typography variant='h4' align='center'>If you want, our AI can make sure you save time</Typography>
                                <Grid container spacing={2}
                                      direction="row"
                                      justifyContent="center"
                                      alignItems="stretch"
                                      sx={{paddingTop: '35px', paddingBottom: '20px'}}>
                                    <Grid item style={{height: '100%'}} xs={3}>
                                        <Card raised={true}>
                                            <CardActionArea onClick={() => setAiPicked(true)}
                                                            style={aiPicked ? {backgroundColor: '#ccddff'} : {}}>
                                                <CardContent>
                                                    <Stack
                                                        direction="row"
                                                        justifyContent="space-between"
                                                        alignItems="center"
                                                        spacing={2}
                                                    >
                                                        <Typography variant="h3">
                                                            AI
                                                        </Typography>

                                                        {aiPicked ? <CheckCircleRounded color={"primary"}
                                                                                        fontSize={"large"}></CheckCircleRounded> : ''}

                                                    </Stack>

                                                    <Typography variant="body1" color="text.secondary">
                                                        Our AI system will generate a story that you can edit<br/><br/>
                                                        The generated story will be inspired by your selected
                                                        investments
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={3} minHeight={'100%'}>
                                        <Card raised={true} style={{height: '100%'}}>
                                            <CardActionArea onClick={() => setAiPicked(false)}
                                                            style={!aiPicked ? {
                                                                backgroundColor: '#ccddff',
                                                                height: '100%'
                                                            } : {height: '100%'}}
                                            >
                                                <CardContent style={{height: '100%'}}>
                                                    <Stack
                                                        direction="row"
                                                        justifyContent="space-between"
                                                        alignItems="center"
                                                        spacing={2}
                                                    >
                                                        <Typography variant="h3">
                                                            Blank
                                                        </Typography>

                                                        {!aiPicked ? <CheckCircleRounded color={"primary"}
                                                                                         fontSize={"large"}></CheckCircleRounded> : ''}

                                                    </Stack>
                                                    <Typography variant="body1" color="text.secondary">
                                                        You will start from empty fields <br/><br/>
                                                        You will have to write it entirely
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </>
                            : activeStep === 2 ?
                                <>  <Snackbar
                                    open={snackBarOpen}
                                    autoHideDuration={6000}
                                    onClose={handleRatingSentClose}
                                    message="Rating sent! Thank you for your contribution"
                                    action={sendRating}
                                />
                                    <Grid2 container spacing={0}>
                                        <Grid2 xs={3}></Grid2>
                                        <Grid2 display={"flex"} justifyContent={"center"} alignItems={"center"} xs={6}>
                                            <Button onClick={() => setOpenGenerateAgainDialog(true)} variant={"outlined"}
                                                    startIcon={<Refresh></Refresh>}>Generate again</Button>
                                            <Dialog
                                                open={openGenerateAgainDialog}
                                                onClose={() => setOpenGenerateAgainDialog(false)}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle id="alert-dialog-title">
                                                    {"Are you sure?"}
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                        Are you sure you want to generate the story again?
                                                        <br/><br/>
                                                        Once our AI generates a new story, there is no way back to your
                                                        previous editing session.
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={() => setOpenGenerateAgainDialog(false)}>Undo</Button>
                                                    <Button
                                                        onClick={() => setOpenGenerateAgainDialog(false)}>Generate</Button>
                                                </DialogActions>
                                            </Dialog>
                                            <div style={{paddingRight: '15px'}}></div>
                                            {((ratingValue === null) || (!ratingSent)) ? <Button onClick={() => setOpenRateDialog(true)} variant={"outlined"}
                                                                    startIcon={<Star></Star>}>Rate suggested story</Button> :
                                                <Button disabled variant={"outlined"}
                                                        startIcon={<Star></Star>}>Rating sent!</Button>}

                                            <Dialog
                                                open={openRateDialog}
                                                onClose={() => setOpenRateDialog(false)}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle id="alert-dialog-title">
                                                    {"Make you count!"}
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                        Do you like what our AI suggested to you?
                                                        <Rating value={ratingValue}
                                                                onChange={(event, newValue) => {
                                                                    setRatingValue(newValue);
                                                                }}></Rating>
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={() => setOpenRateDialog(false)}>Cancel</Button>
                                                    <Button disabled={ratingValue === 0 || ratingValue === null} onClick={() => {setOpenRateDialog(false); setRatingSent(true); setSnackBarOpen(true)}}>Send</Button>
                                                </DialogActions>
                                            </Dialog>
                                        </Grid2>
                                        <Grid2 xs={3}></Grid2>
                                    </Grid2>
                                    <Typography variant="h3">Title</Typography>
                                    <div style={{paddingTop: '20px'}}></div>
                                    <Box sx={{p: 2}}>
                                        <TextField InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Verified color={"primary"}/>
                                                </InputAdornment>
                                            ),
                                        }} style={{width: '40%'}} label="Title" variant="filled"
                                                   defaultValue={notebookTitle}
                                                   onChange={(e) => setNotebookTitle(e.target.value)}></TextField>
                                    </Box>

                                    <div style={{paddingTop: '30px'}}></div>

                                    <Typography variant="h3">Remarkable quote</Typography>
                                    <div style={{paddingTop: '20px'}}></div>
                                    <Box sx={{p: 2}}>
                                        <TextField InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Verified color={"primary"}/>
                                                </InputAdornment>
                                            ),
                                        }} style={{width: '40%'}} label="Quote" variant="filled"
                                                   defaultValue={quote}
                                                   onChange={(e) => setQuote(e.target.value)}></TextField>
                                    </Box>

                                    <div style={{paddingTop: '30px'}}></div>

                                    <Typography variant="h3">Body</Typography>
                                    <div style={{paddingTop: '20px'}}></div>
                                    {notebook.map((fragment, index) => {
                                        return (
                                            <>
                                                <Box onMouseEnter={() => {
                                                    showButtonsOfFragment(index, true)
                                                }} onMouseLeave={() => showButtonsOfFragment(index, false)}
                                                     key={'a' + index} sx={fragment.show_buttons ? {
                                                    borderRadius: 1,
                                                    backgroundColor: '#fdfafa',
                                                    border: 3,
                                                    borderColor: 'primary.main',
                                                    p: 2
                                                } : {
                                                    borderRadius: 1,
                                                    backgroundColor: '#fdfafa',
                                                    border: 1,
                                                    borderColor: 'primary.main',
                                                    p: 2
                                                }}>

                                                    {fragment.show_buttons ? <><Box display="flex" justifyContent="center"
                                                                                    alignItems="flex-start">
                                                        <Button startIcon={<PostAdd></PostAdd>} size={"small"} variant="outlined"
                                                                onClick={() => addFragment(index, true)}>Add
                                                            Fragment</Button>
                                                        <div>{"\u00A0"}</div>
                                                        <FileUploader addMedia={addMedia} up={true} index={index}></FileUploader>
                                                    </Box>
                                                        <div style={{paddingBottom: '15px'}}></div>
                                                    </> : <div style={{paddingBottom: '15px'}}></div>}

                                                    {fragment.type === 'Image' ?
                                                        <>
                                                            {fragment.type === 'Image'?
                                                                <Grid justifyContent='right' display='flex' alignItems={"flex-end"} item xs={4}>
                                                                    <Box>
                                                                        {fragment.show_buttons && notebook.length !== 1 ? <>
                                                                                <Tooltip arrow title={"Delete"}><IconButton
                                                                                    color={"primary"} size={"large"}
                                                                                    onClick={() => deleteFragment(index)}><Delete
                                                                                    fontSize="inherit"></Delete></IconButton></Tooltip>
                                                                                <Tooltip arrow title={"Move up"}><IconButton
                                                                                    disabled={index === 0} color={"primary"}
                                                                                    size={"large"}
                                                                                    onClick={() => moveIndexUp(index)}><ArrowUpward
                                                                                    fontSize="inherit"></ArrowUpward></IconButton></Tooltip>
                                                                                <Tooltip arrow title={"Move down"}><IconButton
                                                                                    disabled={index === notebook.length - 1}
                                                                                    color={"primary"} size={"large"}
                                                                                    onClick={() => moveIndexDown(index)}><ArrowDownward
                                                                                    fontSize="inherit"></ArrowDownward></IconButton></Tooltip></>
                                                                            : ''}<br/>
                                                                    </Box></Grid>
                                                                : ''}

                                                            {fragment.show_buttons ? <><Divider></Divider><Divider></Divider></> : ''}
                                                            <div style={{paddingTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start'}}>
                                                                <img style={{width: '100%'}} src={fragment.content} alt={""} />
                                                            </div>
                                                        </>
                                                        :
                                                        <><FormControl fullWidth>
                                                            <Grid container direction="row"
                                                                  justifyContent="center"
                                                                  alignItems="stretch">
                                                                <Grid item xs={4}>
                                                                    <InputLabel id="demo-simple-select-label">Fragment
                                                                        type</InputLabel>
                                                                    <Select
                                                                        style={{
                                                                            height: '60px',
                                                                            width: '200px',
                                                                            backgroundColor: 'f0f0f0'
                                                                        }}
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        label="Fragment type"
                                                                        variant="filled"
                                                                        value={fragment.type}
                                                                        onChange={(e) => updateTypeOfFragment(e.target.value, index)}
                                                                    >
                                                                        {fragmentOptions.map((option, i) => {
                                                                            return (
                                                                                <MenuItem key={'b' + index + i}
                                                                                          value={option}>{option}</MenuItem>
                                                                            )
                                                                        })}
                                                                    </Select>
                                                                </Grid>
                                                                <Grid item xs={4}>
                                                                    {fragment.type === 'Paragraph' ?
                                                                        <Box justifyContent='center' display='flex'>
                                                                            <ToggleButtonGroup
                                                                                value={fragment.alignment}
                                                                                exclusive
                                                                                onChange={(e, n) => handleAlignment(e, n, index)}
                                                                                aria-label="text alignment"
                                                                            >
                                                                                <ToggleButton value="left"
                                                                                              aria-label="left aligned">
                                                                                    <FormatAlignLeft/>
                                                                                </ToggleButton>
                                                                                <ToggleButton value="center"
                                                                                              aria-label="centered">
                                                                                    <FormatAlignCenter/>
                                                                                </ToggleButton>
                                                                                <ToggleButton value="right"
                                                                                              aria-label="right aligned">
                                                                                    <FormatAlignRight/>
                                                                                </ToggleButton>
                                                                            </ToggleButtonGroup>
                                                                            <Divider flexItem orientation="vertical"
                                                                                     sx={{mx: 1, my: 1}}/>

                                                                            <ToggleButtonGroup
                                                                                value={fragment.formats}
                                                                                onChange={(e, n) => handleFormat(e, n, index)}
                                                                                aria-label="text formatting"
                                                                            >
                                                                                <ToggleButton value="bold" aria-label="bold">
                                                                                    <FormatBold/>
                                                                                </ToggleButton>
                                                                                <ToggleButton value="italic"
                                                                                              aria-label="italic">
                                                                                    <FormatItalic/>
                                                                                </ToggleButton>
                                                                                <ToggleButton value="underlined"
                                                                                              aria-label="underlined">
                                                                                    <FormatUnderlined/>
                                                                                </ToggleButton>
                                                                            </ToggleButtonGroup>
                                                                        </Box>
                                                                        : ''}
                                                                </Grid>
                                                                <Grid justifyContent='right' display='flex' alignItems={"flex-end"} item xs={4}>
                                                                    {fragment.type === 'Paragraph' || fragment.type === 'Subtitle' ?
                                                                        <Box>
                                                                            {fragment.show_buttons && notebook.length !== 1 ? <>
                                                                                    <Tooltip arrow title={"Delete"}><IconButton
                                                                                        color={"primary"} size={"large"}
                                                                                        onClick={() => deleteFragment(index)}><Delete
                                                                                        fontSize="inherit"></Delete></IconButton></Tooltip>
                                                                                    <Tooltip arrow title={"Move up"}><IconButton
                                                                                        disabled={index === 0} color={"primary"}
                                                                                        size={"large"}
                                                                                        onClick={() => moveIndexUp(index)}><ArrowUpward
                                                                                        fontSize="inherit"></ArrowUpward></IconButton></Tooltip>
                                                                                    <Tooltip arrow title={"Move down"}><IconButton
                                                                                        disabled={index === notebook.length - 1}
                                                                                        color={"primary"} size={"large"}
                                                                                        onClick={() => moveIndexDown(index)}><ArrowDownward
                                                                                        fontSize="inherit"></ArrowDownward></IconButton></Tooltip></>
                                                                                : ''}<br/>
                                                                        </Box>
                                                                        : ''}

                                                                </Grid>
                                                            </Grid>
                                                            <div style={{paddingTop: '10px'}}></div>
                                                            <Divider></Divider>
                                                            <Divider></Divider>
                                                            <div style={{paddingTop: '10px'}}></div>
                                                        </FormControl><TextField multiline rows={fragment.type === 'Subtitle' ? 1 : 5}
                                                                                 style={{width: '100%', backgroundColor: 'f0f0f0'}}
                                                                                 label={fragment.type} variant="filled"
                                                                                 value={fragment.content}
                                                                                 onChange={(e) => (updateContent(e.target.value, index))}></TextField></>}


                                                    <div style={{paddingBottom: '15px'}}></div>
                                                    {fragment.show_buttons ? <><Box display="flex" justifyContent="center"
                                                                                    alignItems="flex-start">
                                                        <Button startIcon={<PostAdd></PostAdd>} size={"small"} variant="outlined"
                                                                onClick={() => addFragment(index, false)}>Add
                                                            Fragment</Button>
                                                        <div>{"\u00A0"}</div>
                                                        <FileUploader addMedia={addMedia} up={false} index={index}></FileUploader>
                                                    </Box></> : ''}
                                                </Box>

                                                <div style={{paddingTop: '10px'}}></div>
                                            </>
                                        )
                                    })}
                                    <div style={{paddingTop: '10px'}}></div>
                                </> :
                                activeStep === 3 ?
                                    <>
                                        <Typography align={'center'} variant={'h5'}>Upload optional material</Typography>
                                        <div style={{
                                            paddingTop: '30px',
                                            justifyContent: "center",
                                            alignContent: "center",
                                            alignItems: "center",
                                            display: "flex"
                                        }}>
                                            <List


                                            >
                                                <ListItem>


                                                    <AddCoverImage coverImageIsUploaded={coverImageIsUploaded} setCoverImageIsUploaded={setCoverImageIsUploaded} uploadCoverImage={uploadCoverImage}></AddCoverImage>
                                                </ListItem>
                                                <Divider></Divider>
                                                <ListItem>

                                                    <AddVideoPresentation videoPresentationIsUploaded={videoPresentationIsUploaded} setVideoPresentationIsUploaded={setVideoPresentationIsUploaded} uploadVideo={uploadVideo}></AddVideoPresentation>
                                                </ListItem>
                                            </List>
                                            {/*<Stack direction="column"
                                                   divider={<Divider flexItem></Divider>}
                                                   justifyContent="center"
                                                   alignItems="flex-start"
                                                   spacing={3}
                                                   sx={{maxWidth: '400px'}}>

                                                <AddCoverImage uploadCoverImage={uploadCoverImage}></AddCoverImage>
                                                <Button size={"large"} startIcon={<Upload></Upload>} variant={"text"}>Upload
                                                    video presentation</Button>

                                            </Stack>*/}
                                        </div>

                                    </> :
                                    activeStep === 4 ?
                                        <>
                                        </> :
                                        ''
                    }
                    {activeStep === 4 ? (
                            <>  <Typography variant={"h2"}>{notebookTitle}</Typography>
                                <Typography variant={"h5"}>{`"${quote}"`}</Typography>
                                <Typography variant={"body1"}>Written by: Test User</Typography>
                                <div style={{paddingTop: '20px'}}></div>
                                <Box sx={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                    >
                                        {['BTC'].map((element,index) => (
                                            <Chip label={element} variant="outlined" />
                                        ) )}
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
                                                <Grid2>
                                                    <Button style={{display: 'none'}} variant={"outlined"} startIcon={<StarRate></StarRate>}>Rate</Button>                                </Grid2>
                                            </Grid2>
                                        </Grid2>
                                    </Stack>
                                    <br></br>

                                </Box>
                                <br></br>
                                {coverImage ? <><Box
                                    component="img"
                                    sx={{
                                        width: "100%" ,
                                    }}
                                    alt="The house from the offer."
                                    src={coverImage}
                                /><br></br><br></br></> : ''}
                                {videoPresentation ? <><Box
                                    controls
                                    component="video"
                                    sx={{
                                        width: "100%" ,
                                    }}
                                    alt="The house from the offer."
                                    src={videoPresentation}
                                /><br></br><br></br></> : ''}
                                <Divider></Divider>
                                <br></br>


                                {notebook.map((fragment) => (
                                    fragment.type === 'Subtitle' ? <><Typography variant={"h4"}>{fragment.content}</Typography></>
                                        : (fragment.type === 'Paragraph' ?
                                            <>
                                                <Typography align={fragment.alignment} fontSize={18} fontFamily={"`\"Roboto\", \"Helvetica\", \"Arial\", sans-serif`,"} variant={"body1"}>{fragment.content}</Typography>
                                                <br></br>
                                            </> :
                                            <>
                                                <Box
                                                    width={"100%"}
                                                    component="img"
                                                    alt="The house from the offer."
                                                    src={fragment.content}
                                                /><br></br>
                                            </>)
                                ))}


                                <Stack spacing={12} direction={"row"}
                                       sx={{display: 'flex', pt: 4, alignItems: "center", justifyContent: "center"}}>
                                    <Button
                                        startIcon={<ArrowLeft></ArrowLeft>}
                                        variant={"outlined"}
                                        color="inherit"
                                        onClick={handleBack}

                                    >
                                        Back
                                    </Button>

                                    {isStepOptional(activeStep) && (
                                        <Button variant={"outlined"} color="inherit" onClick={handleSkip} sx={{mr: 1}}>
                                            Skip
                                        </Button>
                                    )}
                                    <Dialog
                                        open={openPublishStory}
                                        onClose={() => setOpenPublishStory(false)}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">
                                            {"Are you sure?"}
                                        </DialogTitle>
                                        <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                Are you sure you want to publish the story?
                                                <br/><br/>
                                                Our team will process your publication request and, after verifying that your story complies with the rules, will publish it.
                                            </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={() => setOpenPublishStory(false)}>Undo</Button>
                                            <Button
                                                onClick={publishStory}>Confirm</Button>
                                        </DialogActions>
                                    </Dialog>
                                    <Button endIcon={<Publish></Publish>} variant={"contained"}
                                            onClick={() => setOpenPublishStory(true)}>
                                        Publish story
                                    </Button>
                                </Stack>
                            </>
                        ) :
                        <Stack spacing={12} direction={"row"}
                               sx={{display: 'flex', pt: 4, alignItems: "center", justifyContent: "center"}}>
                            <Button
                                startIcon={<ArrowLeft></ArrowLeft>}
                                variant={"outlined"}
                                color="inherit"
                                onClick={handleBack}

                            >
                                Back
                            </Button>

                            {isStepOptional(activeStep) && (
                                <Button style={{display: 'none'}} variant={"outlined"} color="inherit" onClick={handleSkip} sx={{mr: 1}}>
                                    Skip
                                </Button>
                            )}

                            <Button endIcon={<ArrowRight></ArrowRight>} variant={"contained"}
                                    disabled={activeStep === 0 && !investments.find((i) => i.selected === true)}
                                    onClick={handleNext}>
                                Next
                            </Button>
                        </Stack>}
                </CardContent>
            </Card>
        </Box>
    )
}

export {CreateStoryStepper}
