const { Post } = require("../models/Post");
const { Comment } = require("../models/Comment")
const {User}=require("../models/User")

const like = async (req, res) => {
    const { postId } = req.body;
    const userId = req.userid
    
    let updatedPost = await Post.findOneAndUpdate(
        { _id: postId, "likes": { $ne: userId } },
        { $push: { likes: userId } },
        { new: true }

    );

    if (updatedPost) {
        return res.send({ sucess: true, updatedPost });

    } else {
        return res.send({ sucess: false, message: "post not found or somone already liked song" });

    }
}
const comment = async (req, res) => {
    const { postId, comment } = req.body;
    const userId = req.userid
    let commentobj = new Comment({ user: userId, post: postId, desc: comment });
    commentobj.save();
    let updatedPost = await Post.findOneAndUpdate(
        { _id: postId },
        { $push: { comments: commentobj.id } },
        { new: true }
    );
    res.send(commentobj)


}
const unlike = async (req, res) => {
    const { postId } = req.body;
    const userId = req.userid;

    // Find the post and check if the user has already liked it
    let post = await Post.findOne({ _id: postId, likes: userId });

    if (!post) {
        return res.send({ success: false, message: "Post not found or user hasn't liked the post." });
    }

    // Update the post to remove the user's like
    let updatedPost = await Post.findOneAndUpdate(
        { _id: postId, likes: userId },
        { $pull: { likes: userId } },
        { new: true }
    );

    if (updatedPost) {
        return res.send({ success: true, updatedPost });
    } else {
        return res.send({ success: false, message: "Failed to unlike the post." });
    }
}
const deletepost = async (req, res) => {
    const user = req.userid
    const { postId } = req.body;
    let post=await Post.findById(postId)
   console.log(post)
   let comments=post.comments;
    console.log(comments)
    for(let i=0;i<comments.length;i++){
        let commentId=comments[i];
        let comment = await Comment.findByIdAndDelete(commentId)
        console.log(commentId)
    }
     post = await Post.findByIdAndDelete(postId)

   
    res.send({ sucess: true });
}
const createpost = (req, res) => {
    const { image_url, desc } = req.body
    const user = req.userid
    let data = {
        image_url,
        desc,
        user
    }
    const post = new Post(data)
    post.save();
    res.send(post);
}


const deletecomment = async (req, res) => { 
    const user = req.userid
    const { commentId } = req.body;
    let comment = await Comment.findByIdAndDelete(commentId)
    let post=await Post.findOneAndUpdate(
        { _id: comment.post  },
        { $pull: { comments : comment.id } },
        { new: true }
    );
    res.send({ sucess: true, deletedcomment: comment });
}   
const showuserdata = async (req, res) => { 
    const userId = req.userid
    const user=await User.findById(userId)
    res.send(user); 
}

const follow=async (req, res)=>{
    const follower = req.userid
    const {user}=req.body

    
    let updatedUser1 = await User.findOneAndUpdate(
        { _id: user ,followers: { $ne: follower }},
        { $push: { followers : follower } },
        { new: true }

    );
    let updatedUser2 = await User.findOneAndUpdate(
        { _id: follower , following:{$ne : user}},
        { $push: { following : user} },
        { new: true }

    );

    if (updatedUser1 && updatedUser2) {
        return res.send({ sucess: true});

    } else {
        return res.send({ sucess: false, message: "user not found or already followed" });

    }
}
const unfollow=async (req, res)=>{
    const follower = req.userid
    const {user}=req.body

    
    let updatedUser1 = await User.findOneAndUpdate(
        { _id: user ,followers:  follower },
        { $pull: { followers : follower } },
        { new: true }
    );
    let updatedUser2 = await User.findOneAndUpdate(
        { _id: follower , following: user},
        { $pull: { following : user} },
        { new: true }

    );

    if (updatedUser1 && updatedUser2) {
        return res.send({ sucess: true});

    } else {
        return res.send({ sucess: false, message: "user not found or already followed" });
    }
}

module.exports = {
    like, comment, unlike, deletepost,
    createpost,  deletecomment, showuserdata,
    follow, unfollow
}