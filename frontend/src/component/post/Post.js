import React, { useState, useEffect } from 'react';
import "./Post.css"
import { Avatar, Button, Typography, Dialog } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { deletePost, likePost, updatePost } from "../../actions/Post"
import {
    MoreVert,
    Favorite,
    FavoriteBorder,
    ChatBubbleOutline,
    DeleteOutline,
} from "@mui/icons-material";
import { getFollowingPosts, getMyPosts, loadUser } from '../../actions/User';
import User from '../user/User';
import { addCommentOnPost } from '../../actions/Post';
import Commentcard from '../Comment/Commentcard';

const Post = ({
    postId,
    caption,
    postImage,
    likes = [],
    comments = [],
    ownerImage,
    ownerName,
    ownerId,
    isDelete = false,
    isAccount = false,
}) => {

    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false);
    const [likesUser, setLikesUser] = useState(false);
    const [commentValue, setCommentValue] = useState("");
    const [commentToggle, setCommentToggle] = useState(false);
    const [captionValue, setCaptionValue] = useState(caption);
    const [captionToggle, setCaptionToggle] = useState(false);
    const { user } = useSelector((state) => state.user);


    const handlelike = async () => {
        setLiked(!liked)
        await dispatch(likePost(postId));
        if (isAccount) {
            dispatch(getMyPosts());
        }
        else {
            dispatch(getFollowingPosts());
        }

    }

    const updateCaptionHandler = (e) => {
        e.preventDefault();
        dispatch(updatePost(captionValue, postId));
        dispatch(getMyPosts());
    };


    const deletePostHandler = async () => {
        await dispatch(deletePost(postId));
        dispatch(getMyPosts());
        dispatch(loadUser());
      };


    useEffect(() => {
        likes.forEach(item => {
            if (item._id === user._id) {
                setLiked(true)
            }
        })
    }, [likes, user._id])


    const addCommentHandler = async (e) => {
        e.preventDefault();
        await dispatch(addCommentOnPost(postId, commentValue));
        if (isAccount) {
            dispatch(getMyPosts());
        } else {
            dispatch(getFollowingPosts());
        }
    };



    return (
        <div className='post'>
            <div className="postHeader"></div>
            {isAccount ? (
                <Button onClick={() => setCaptionToggle(!captionToggle)} >
                    <MoreVert />
                </Button>
            ) : null}
            <img src={postImage} alt="Post" />

            <div className="postDetails">
                <Avatar src={ownerImage} alt='User' sx={{
                    height: "3vmax",
                    width: "3vmax"
                }} />
                <Link to={`/user/${ownerId}`}>
                    <Typography fontWeight={700} >{ownerName}</Typography>
                </Link>
                <Typography
                    fontWeight={100}
                    color="rgba(0, 0, 0, 0.582)"
                    style={{ alignSelf: "center" }}
                >
                    {caption}
                </Typography>
            </div>
            <button onClick={() => { setLikesUser(!likesUser) }}
                style={{
                    border: "none",
                    backgroundColor: "white",
                    cursor: "pointer",
                    margin: "1vmax 2vmax",
                }}><Typography>{likes.length} Likes</Typography></button>

            <div className="postFooter">
                <Button onClick={handlelike}  > {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />} </Button>

                <Button onClick={() => { setCommentToggle(!commentToggle) }}>
                    <ChatBubbleOutline />
                </Button>

                {isDelete ? (
                    <Button onClick={deletePostHandler} >
                        <DeleteOutline />
                    </Button>
                ) : null}

            </div>
            <Dialog open={likesUser} onClose={() => { setLikesUser(!likesUser) }}>
                <div className="DialogBox">
                    <Typography variant="h4">Liked By</Typography>

                    {likes.map((like) => (
                        <User
                            key={like._id}
                            userId={like._id}
                            name={like.name}
                            avatar={like.avatar.url}
                        />
                    ))}
                </div>
            </Dialog>

            <Dialog open={commentToggle} onClose={() => { setCommentToggle(!commentToggle) }}>
                <div className="DialogBox">
                    <Typography variant="h4">Comments</Typography>
                    <form className="commentForm" onSubmit={addCommentHandler}>
                        <input
                            type="text"
                            value={commentValue}
                            onChange={(e) => setCommentValue(e.target.value)}
                            placeholder="Comment Here..."
                            required
                        />
                        <Button type="submit" variant="contained">
                            Add
                        </Button>
                    </form>
                    {comments.length > 0 ? (
                        comments.map((item) => (
                            <Commentcard
                                userId={item.user._id}
                                name={item.user.name}
                                avatar={item.user.avatar.url}
                                comment={item.comment}
                                commentId={item._id}
                                key={item._id}
                                postId={postId}
                                isAccount={isAccount}
                            />
                        ))
                    ) : (
                        <Typography>No comments Yet</Typography>
                    )}
                </div>
            </Dialog>

            <Dialog
                open={captionToggle}
                onClose={() => setCaptionToggle(!captionToggle)}
            >
                <div className="DialogBox">
                    <Typography variant="h4">Update Caption</Typography>

                    <form className="commentForm" onSubmit={updateCaptionHandler}>
                        <input
                            type="text"
                            value={captionValue}
                            onChange={(e) => setCaptionValue(e.target.value)}
                            placeholder="Caption Here..."
                            required
                        />

                        <Button type="submit" variant="contained">
                            Update
                        </Button>
                    </form>
                </div>
            </Dialog>

        </div>
    )
}

export default Post