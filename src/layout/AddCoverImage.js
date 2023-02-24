import React, {useState} from 'react';
import {Button, Tooltip} from "@mui/material";
import {Clear, Delete, Upload} from "@mui/icons-material";
import ListItemText from "@mui/material/ListItemText";
import LinearWithValueLabel from "./LinearProgressWithLabel";
import IconButton from "@mui/material/IconButton";

const FileUploader = props => {
    let coverImageIsUploaded = props.coverImageIsUploaded
    let setCoverImageIsUploaded = props.setCoverImageIsUploaded
    const uploadCoverImage = props.uploadCoverImage
    const [loading, setLoading] = useState(false)

    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        uploadCoverImage(fileUploaded)
        setCoverImageIsUploaded(true)
        setLoading(true)
    };

    const handleDelete = () => {
        uploadCoverImage(undefined)
        setCoverImageIsUploaded(false)
        setLoading(false)
    };

    return (
        <>
            {!loading && !coverImageIsUploaded ? <ListItemText id="switch-list-label-wifi" primary="No cover uploaded" /> :
                (!loading && coverImageIsUploaded ? <ListItemText id="switch-list-label-wifi" primary="Cover uploaded! (321kB)" /> : <ListItemText id="switch-list-label-wifi" primary="Cover uploading..." />)
             }

            {
                !loading && !coverImageIsUploaded ?
                <Button onClick={handleClick} size={"large"} startIcon={<Upload></Upload>}
                    variant={"text"}>Upload cover</Button>
                :
                    (!loading && coverImageIsUploaded ? <Button color={"error"} onClick={handleDelete} size={"large"} startIcon={<Delete></Delete>}
                                                          variant={"text"}>Delete cover</Button> :
                        <><LinearWithValueLabel setLoading={setLoading}></LinearWithValueLabel>
                            <Tooltip title={"Stop uploading"}>
                                <IconButton onClick={() => {setLoading(false); uploadCoverImage(undefined)
                                    setCoverImageIsUploaded(false)}}><Clear /></IconButton></Tooltip></>)

            }

            <input type="file"
                   ref={hiddenFileInput}
                   accept={"image/png, image/gif, image/jpeg"}
                   onChange={handleChange}
                   style={{display:'none'}}
            />
        </>
    );
};
export default FileUploader;