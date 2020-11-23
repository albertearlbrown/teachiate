import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Moment from "react-moment";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import InfiniteLoader from "react-infinite-loader";
import { Link } from "react-router-dom";
import { AuthStoreContext } from "../../Store/AuthStore";
import Swal from "sweetalert2";

const ThoughtComponents = () => {
  const { isAuthenicate, userData } = useContext(AuthStoreContext);
  const [commentTextarea, setCommentTextara] = useState("");

  const [postData, setPostData] = useState([]);
  const [newPost, setNewPost] = useState([]);
  const [content, setContent] = useState("");
  const [load, setLoad] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectFileUploadStart, setSelectFileUploadStart] = useState(false);
  const [selectFileUploadProgress, setSelectedFileUploadProgress] = useState(0);
  const [startPost, setStartPost] = useState(0);
  const [comments, setComments] = useState([]);
  const [LoadMoreFeedBtn, setLoadMoreFeedBtn] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function fetchPosts() {
      const resp = await axios.get(
        `/thoughts/users/${userData._id}?from=${startPost}&to=2`
      );
      if (resp.data.success === true) {
        setStartPost(2);
        setPostData([...resp.data.data]);
        setLoad(true);
        setLoadMoreFeedBtn(true);
      } else {
        setLoadMoreFeedBtn(false);
      }
    }

    fetchPosts();
  }, []);

  const fileHandler = async (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const formHandler = async (e) => {
    e.preventDefault();

    var image = null;

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
      if (resp.data.success === true) {
        var image = resp.data.filePath;
      }
    }

    const data = {
      content,
      image,
    };

    const resp = await axios.post("/thoughts", data);

    if (resp.data.success === true) {
      setSelectedFile(null);
      setContent("");
      setNewPost((newPost) => [...newPost, resp.data.data]);

      Swal.fire({
        title: "Good job!",
        text: "Your post has been posted",
        icon: "success",
      });
    }
  };

  const loadMoreArticles = async () => {
    setStartPost(startPost + 2);
    const from = startPost + 2;

    const resp = await axios.get(`/thoughts/users/${userData._id}`, {
      params: {
        from: from,
        to: 2,
      },
    });
    if (resp.data.success === true) {
      const data = postData.concat([...resp.data.data]);
      setPostData([...data]);
    } else {
      setLoadMoreFeedBtn(false);
    }
  };

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

  const fileExtension = (fileName) => {
    var extension = fileName.split(".").pop();
    return extension;
  };

  const postMedia = (filepath) => {
    if (filepath) {
      const extension = fileExtension(filepath);

      if (extension === "mp4") {
        return (
          <video width="100%" height="100%" controls>
            <source src={filepath} type="video/mp4" />
          </video>
        );
      } else if (
        extension === "jpg" ||
        extension === "png" ||
        extension === "jpeg"
      ) {
        return (
          <div className="blog_img_holder1">
            <img src={filepath} alt="" />
          </div>
        );
      }
    }
  };

  const postComment = async (e) => {
    e.preventDefault();
    setCommentTextara("");

    const id = e.target[0].value;
    const content = e.target[1].value;
    const data = {
      content: content,
    };

    const resp = await axios.post(`/thoughts/${id}/comments`, data);

    if (resp.data.success) {
      Swal.fire({
        title: "Good job!",
        text: "Your comment successfully posted",
        icon: "success",
      });
      const result = comments.concat(resp.data.data);
      setComments([...result]);
    }
  };
  return (
    <>
      <div className="post_share">
        <h2>Share your thoughts</h2>
        <div className="post_share_area">
          <div className="posted_avtar">
            <img
              src={
                userData.avatar == null
                  ? "assets/img/user-account.png"
                  : userData.avatar
              }
              alt={userData.fullname}
            />
          </div>
          <form
            method="POST"
            encType="multipart/form-data"
            onSubmit={formHandler}
          >
            <div className="post_share_field">
              <textarea
                placeholder="What’s are your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <div className="adv_post_opt clearfix">
                <div className="share_type">
                  <ul>
                    <li>
                      <div className="share_type_col">
                        <input
                          type="file"
                          name="file"
                          id="imageUpload3"
                          accept=".png, .jpg, .jpeg"
                          onChange={fileHandler}
                        />
                        <label htmlFor="imageUpload3">
                          <span>
                            <img
                              src="assets/img/upload_photo_icon.png"
                              alt=""
                            />
                          </span>
                          Photos
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="share_option_right">
                {/* <h4>Post In:</h4> */}
                <input type="submit" value="Post" name="" />
              </div>
            </div>
          </form>
        </div>

        {selectFileUploadStart && selectFileUploadProgress !== 100 ? (
          <LinearProgressWithLabel value={selectFileUploadProgress} />
        ) : null}

        {selectedFile !== null && selectFileUploadStart === false ? (
          <div>
            <p>
              You have selected file.{" "}
              <Link
                to="/"
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedFile(null)}
              >
                Remove
              </Link>
            </p>
          </div>
        ) : null}
      </div>

      {newPost.reverse().map((post) => (
        <div className="blog_sec1" key={post.id}>
          <div className="blog_title">
            <div className="title_img">
              <img
                src={
                  post.user.avatar == null
                    ? "assets/img/user-account.png"
                    : post.user.avatar
                }
                alt="Sarah Jones"
              />
            </div>
            <div className="user_des">
              <h4>
                {post.fullName} <span>{post.user.role}</span>
              </h4>
              <p>
                posted in the (<strong>profile</strong>)
              </p>
            </div>
            <div className="time">
              <Moment fromNow>{post.created_at}</Moment>
            </div>
          </div>

          {postMedia(post.image)}

          <div className="blog_des">
            <p>{post.content}</p>
          </div>

          <div className="direct_cmnt_area">
            <textarea placeholder="write a comment"></textarea>
            <input type="submit" value="Post" name="" />
          </div>
        </div>
      ))}

      {load
        ? postData.map((post) => (
            <div className="blog_sec1" key={post.id}>
              <div className="blog_title">
                <div className="title_img">
                  <img
                    src={
                      post.user.avatar === null
                        ? "assets/img/user-account.png"
                        : post.user.avatar
                    }
                    alt={post.user.fullName}
                  />
                </div>
                <div className="user_des">
                  <h4>
                    {post.user.fullName} <span>{post.user.role}</span>
                  </h4>
                  <p>
                    posted in the (<strong>profile</strong>)
                  </p>
                </div>
                <div className="time">
                  <Moment fromNow>{post.date}</Moment>
                </div>
              </div>

              {postMedia(post.image)}

              <div className="blog_des">
                <p>{post.content}</p>
              </div>

              <div className="blog_feedback clearfox">
                <div className="flower">
                  <img src="assets/img/flower.svg" alt="" />
                  <span>
                    {comments.filter((comment) => comment.post === post._id)
                      .length + post.comments.length}
                  </span>
                </div>

                {/* <a href="/">
                    <div className="love"><img src="assets/img/love.svg" alt=""/><span>{post.likes.length}</span></div>
                </a> */}
              </div>

              {comments
                .filter((comment) => comment.post === post._id)
                .map((comment) => (
                  <div className="blog_title margin_btm">
                    <div className="title_img">
                      <img
                        style={{ borderRadius: "50%" }}
                        src={
                          comment.user.avatar === null
                            ? "/assets/img/user-account.png"
                            : comment.user.avatar
                        }
                        alt=""
                      />
                    </div>
                    <div className="user_des">
                      <h4>
                        {comment.user.fullName}{" "}
                        <span>({comment.user.role})</span>
                      </h4>
                      <p>{comment.content} </p>
                      <div className="replaied">
                        <div className="hour">
                          <Moment fromNow>{comment.date}</Moment>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              {isAuthenicate ? (
                <div className="direct_cmnt_area">
                  <form onSubmit={postComment}>
                    <input type="hidden" name="though_id" value={post._id} />
                    <textarea
                      placeholder="write a comment"
                      value={commentTextarea}
                      onChange={(e) => setCommentTextara(e.target.value)}
                      name="textarea"
                    ></textarea>
                    <input type="submit" value="Post" />
                  </form>
                </div>
              ) : null}
            </div>
          ))
        : null}

      {LoadMoreFeedBtn ? (
        <InfiniteLoader onVisited={() => loadMoreArticles()} />
      ) : null}
    </>
  );
};

export default ThoughtComponents;
