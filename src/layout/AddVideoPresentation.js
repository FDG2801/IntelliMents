import React, {useState} from 'react';
import {Button, Tooltip} from "@mui/material";
import {Clear, Delete, Upload} from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";
import LinearWithValueLabel from "./LinearProgressWithLabel";
import IconButton from "@mui/material/IconButton";

const FileUploader = props => {
    let videoPresentationIsUploaded = props.videoPresentationIsUploaded
    let setVideoPresentationIsUploaded = props.setVideoPresentationIsUploaded
    const uploadVideo = props.uploadVideo
    const [loading, setLoading] = useState(false)

    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        uploadVideo(fileUploaded)
        setVideoPresentationIsUploaded(true)
        setLoading(true)
    };

    const handleDelete = () => {
        uploadVideo(undefined)
        setVideoPresentationIsUploaded(false)
        setLoading(false)
    };

    return (
        <>
            {!loading && !videoPresentationIsUploaded ? <ListItemText id="switch-list-label-wifi" primary="No video presentation uploaded" /> :
                (!loading && videoPresentationIsUploaded ? <ListItemText id="switch-list-label-wifi" primary="Video uploaded! (42MB)" /> : <ListItemText id="switch-list-label-wifi" primary="Video uploading..." />)
            }

            {
                !loading && !videoPresentationIsUploaded ?
                    <Button onClick={handleClick} size={"large"} startIcon={<Upload></Upload>}
                            variant={"text"}>Upload video</Button>
                    :
                    (!loading && videoPresentationIsUploaded ? <Button color={"error"} onClick={handleDelete} size={"large"} startIcon={<Delete></Delete>}
                                                          variant={"text"}>Delete video</Button> :
                        <><LinearWithValueLabel setLoading={setLoading}></LinearWithValueLabel>
                            <Tooltip title={"Stop uploading"}>
                                <IconButton onClick={() => {setLoading(false); uploadVideo(undefined)
                                    setVideoPresentationIsUploaded(false)}}><Clear /></IconButton></Tooltip></>)

            }

            <input type="file"
                   ref={hiddenFileInput}
                   accept={"video/mp4"}
                   onChange={handleChange}
                   style={{display:'none'}}
            />
        </>
    );
};
export default FileUploader;