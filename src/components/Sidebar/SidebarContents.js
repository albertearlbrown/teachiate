import React, { useContext } from 'react'
import Axios from 'axios'
import { configureSocket } from '../../utils/axiosInterceptor';
import { AuthStoreContext } from '../../Store/AuthStore';
import { Avatar, Icon } from '@material-ui/core';
import {posts} from '../../pages/Forum/Post';


function limitWords(textToLimit, wordLimit) {
    let finalText = "";
    let text2 = textToLimit.replace(/\s+/g, " ");
    let text3 = text2.split(" ");
    let numberOfWords = text3.length;
    let i=0;
    if(numberOfWords > wordLimit)
    {
    for(i=0; i< wordLimit; i++)
    finalText = finalText+" "+ text3[i]+"";

    return finalText+"...";
    }
    else return textToLimit;
}

const SidebarContent = ({ load }) => {
    const { isAuthenicate, userData } = useContext(AuthStoreContext);
    const [ posts, setPosts ] = React.useState([])
    const [ sortedList, setSortedList ] = React.useState([])
    const [ groups, setGroups ] = React.useState([])
    const [ forums, setForums ] = React.useState([])
    // const newFunc = async () => {
    //     let socket = await configureSocket("https://api.teachiate.com/thoughts")
    //     return (
    //     // socket !== null && socket.then((data)=>console.log(data)).catch(err=>console.log("err", err))
    //     socket&&socket.on("news", (data)=>(
    //         data.status &&
    //         setPosts(data.data)            
    //     )))
    // }
    // newFunc()
 console.log("forum ",posts)

    React.useEffect(()=>{
        // socket&&socket.on("news", (data)=>(
        //     data.status &&
        //     setPosts(data.data)            
        // ))
        let posts
        Axios.get("https://api.teachiate.com/thoughts")
            .then((posts)=>(
                posts.status &&
                setPosts(posts.data)
            ))
            .catch((err)=>console.log("Posts Error", err))
    },[load])
    React.useEffect(()=>{
        let posts
        Axios.get("https://api.teachiate.com/group/list")
            .then((groups)=>(
                groups.status &&
                setGroups(groups.data)
            ))
            .catch((err)=>console.log("groups Error", err))
    },[load])
    React.useEffect(()=>{
        let posts
        Axios.get("https://api.teachiate.com/forum")
            .then((forums)=>(
                forums.status &&
                setForums(forums.data)
                ))
                .catch((err)=>console.log("groups Error", err))
            },[load])
            
            console.log(isAuthenicate, userData)
    // const sortingList = () => {
    //     // Most Comments
    //     posts.data?.sort((a, b)=>b.comments.length-a.comments.length)

    // }
    // groups.data?.groups?.map(i=>{return console.log("groups",i.members)})
    console.log(posts.data?.sort((a, b)=>b.comments.length-a.comments.length))
    return(
        <React.Fragment>
            {/* POPULAR POSTS */}
            <div className="articles_title">
                <h2>Popular Posts</h2>
            </div>
            <div className="articles clearfix">
                <ul className="d-flex">
                    {
                        posts.data?.sort((a, b)=>(b.comments.length-a.comments.length) && (a.comments.length-a.likes.length))
                            .filter(k=>k.user._id !== userData._id)
                            .slice(0, 5)
                            .map(i=>(
                            <div key={i._id} className='cursor-pointer sidebar-post-border'>
                                <li className='margin_top_20 cursor-pointer'>
                                    <div className="art_left_img"><img src={i.user?.avatar || "assets/img/article2.jpg"} width="92px;" alt=""/></div>
                                    <div className="">
                                        <span className='font-weight-bold'>{i.user.fullName}</span><br />
                                        <span className=''>{limitWords(i.content, 6)}</span>
                                    </div>
                                    <div style={{marginLeft: "auto"}}>
                                    <nobr><Icon className="fa fa-comment" aria-hidden="true" />{i.comments.length}</nobr>
                                    </div>
                                    {/* <div className="">
                                    </div> */}
                                </li>
                                {/* <hr /> */}
                            </div>
                        ))
                    }
                </ul>
                {/* <a href="/" className="view_more">View More Posts</a> */}
            </div>

            {/* POPULAR GROUPS */}
            <div className="articles_title">
                <h2>Popular Groups</h2>
            </div>
            <div className="articles clearfix">
                <ul className="d-flex">
                    {
                        groups.data?.groups?.filter(j=>j.privacy==="PUBLIC")
                            .sort((a, b)=>b.members.length-a.members.length)
                            .slice(0, 5)
                            .map(i=>(
                            <div key={i._id} className='cursor-pointer sidebar-post-border'>
                                <li className='margin_top_20 cursor-pointer'>
                                    <div className="art_left_img"><img src={i.avatar || "assets/img/article2.jpg"} width="92px;" alt=""/></div>
                                    <div className="">
                                        <span className='font-weight-bold'>{i.groupName}</span><br />
                                        <span className=''>{limitWords(i.description, 6)}</span>
                                    </div>
                                    <div style={{marginLeft: "auto"}}>
                                        <Icon className='fa fa-users' /> {i.members.length}
                                    </div>
                                    {/* <div className="">
                                    </div> */}
                                </li>
                                {/* <hr /> */}
                            </div>
                        ))
                    }
                </ul>
                {/* <a href="/" className="view_more">View More Posts</a> */}
            </div>

            {/* POPULAR FORUMS */}
            <div className="articles_title">
                <h2>Trending Forums Posts</h2>
            </div>
            <div className="articles clearfix">
                <ul className="d-flex">
                    {
                        // .filter(j=>j.privacy==="PUBLIC")
                        forums.data?.posts?.sort((a, b)=>((b.comments.length +b.likes.length)-(a.comments.length+a.likes.length)))
                            .slice(0, 5)
                            .map(i=>(
                            <div key={i._id} className='cursor-pointer sidebar-post-border'>
                                <li className='margin_top_20 cursor-pointer'>
                                    <div className="art_left_img"><img src={i.image || "assets/img/article2.jpg"} width="92px;" alt=""/></div>
                                    <div className="">
                                        <span className='font-weight-bold'>{i.title}</span><br />
                                        <span className=''>{limitWords(i.description, 6)}</span>
                                    </div>
                                    {/* <div className="">
                                    </div> */}
                                </li>
                                {/* <hr /> */}
                            </div>
                        ))
                    }
                </ul>
                {/* <a href="/" className="view_more">View More Posts</a> */}
            </div>
            
            {/* POPULAR BLOGS */}
            <div className="articles_title">
                <h2>Trending Blogs</h2>
            </div>
            <div className="articles clearfix">
                <ul className="d-flex">
                    {
                        // .filter(j=>j.privacy==="PUBLIC")
                        forums.data?.posts?.sort((a, b)=>((b.comments.length +b.likes.length)-(a.comments.length+a.likes.length)))
                            .slice(0, 5)
                            .map(i=>(
                            <div key={i._id} className='cursor-pointer sidebar-post-border'>
                                <li className='margin_top_20 cursor-pointer'>
                                    <div className="art_left_img"><Avatar src={i.image || "assets/img/article2.jpg"}  alt=""/></div>
                                    <div className="">
                                        <span className='font-weight-bold'>{i.title}</span><br />
                                        <span className=''>{limitWords(i.description, 6)}</span>
                                    </div>
                                    {/* <div className="">
                                    </div> */}
                                </li>
                                {/* <hr /> */}
                            </div>
                        ))
                    }
                </ul>
                {/* <a href="/" className="view_more">View More Posts</a> */}
            </div>
        </React.Fragment>
    )
}

export default SidebarContent;