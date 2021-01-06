import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import groupActions from '../../../redux/groups/actions'
import axios from "axios";

const LinearProgressWithLabel = (props) => {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

const WhatsNew = ({currentUser}) => {
  const [content, setPost] = useState('')
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectFileUploadStart, setSelectFileUploadStart] = useState(false);
  const [selectFileUploadProgress, setSelectedFileUploadProgress] = useState(0);
  const groups = useSelector((state)=> state.groups)
  const dispatch = useDispatch()

  useEffect(() => {
    if (groups.action === groupActions.CREATE_NEW_POST) {
      setPost('')
    }
  }, [groups.action])

  const createNewPost = async () => {
    let image = null;
    if (selectedFile !== null) {
      const data = new FormData();
      data.append("file", selectedFile);

      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentage = Math.floor((loaded * 100) / total);
          setSelectFileUploadStart(true);
          setSelectedFileUploadProgress(percentage);
        },
      };

      const resp = await axios.post(
        "https://api.teachiate.com/upload",
        data,
        options
      );
      setSelectedFile(null)
      if (resp.data.success === true) {
        image = resp.data.filePath;
      }
    }
    dispatch({
      type: groupActions.CREATE_NEW_POST,
      payload: {content, id: groups.group._id, image}
    })
  }
  return (
    <div className="post_share">
      <h2>What’s New?</h2>
      <div className="post_share_area">
        <div className="posted_avtar">
          <img src="/assets/img/g4.png" alt="g4" />
        </div>
        <div className="post_share_field">
          <textarea
            value={content}
            placeholder={currentUser.fullName+" What’s are your mind?"}
            onChange={e => setPost(e.target.value)}
          />
          <div className="adv_post_opt clearfix">
            <div className="share_type">
              <ul style={{display: 'flex', flexDirection: 'column'}}>
                <li>
                  <div className="share_type_col">
                    <input
                      type="file"
                      name="file"
                      id="imageUpload3"
                      accept=".png, .jpg, .jpeg"
                      onChange={e => setSelectedFile(e.target.files[0])}
                    />
                    <label htmlFor="imageUpload3">
                      <span>
                        <img
                          src="/assets/img/upload_photo_icon.png"
                          alt=""
                        />
                      </span>
                      Photos
                    </label>
                  </div>
                </li>
                <li>
                  {selectedFile !== null && selectFileUploadStart === false ? (
                    <div>
                      <p>
                        You have selected file.{" "}
                        <p
                          style={{ cursor: "pointer" }}
                          onClick={() => setSelectedFile(null)}
                        >
                          Remove
                        </p>
                      </p>
                    </div>
                  ) : null}
                </li>
              </ul>
            </div>
          </div>
          {selectFileUploadStart && selectFileUploadProgress !== 100 ? (
            <LinearProgressWithLabel value={selectFileUploadProgress} />
          ) : null}

          <div className="share_option_right">
            <input type="submit" defaultValue="Submit" name onClick={createNewPost} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsNew;
