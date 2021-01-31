import React, { useState } from "react";

export const ReplyComment = ({comment, posts, replyCommentHandler}) => {
    const [replyCommentArea, setReplyCommentArea] = useState('');
    const handleReplyComment = (e) => {
        setReplyCommentArea("")
        replyCommentHandler(e, posts._id, comment._id)
    }
    return(
        <div className="direct_cmnt_area reply_cmnt_area ml-auto" style={{marginBottom: '50px'}}>
            <form  onSubmit={(e)=>handleReplyComment(e)}>
                <input type='hidden' name='though_id'  value={posts._id}/>
                <textarea placeholder="Reply to comment" style={{width:'75%'}} value={replyCommentArea} onChange={ (e) => setReplyCommentArea(e.target.value)} name='textarea'></textarea>
                <input type="submit" value="Post"/>
            </form>
        </div>
    )
}