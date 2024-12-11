const Post = require('../models/Post');

async function getAll() {
    return await Post.find({}).lean();
}

async function getFiltredByTitle(search) {
    return await Post.find({
        title: {
            $regex: search,
            $options: 'i'
        }
    }).lean()
}

async function getLastSix() {
    return await Post.find({})
        .sort({
            _id: -1
        })
        .limit(6)
        .lean();
}

async function deleteById(postId) {
    return await Post.findByIdAndDelete(postId);
}

async function create(post) {
    return await Post.create(post);
}

async function getById(id) {
    return await Post.findById(id).lean();
}

async function like(postId, userId) {
    const post = await Post.findById(postId);

    if (post.recommendList.includes(userId)) {
        throw new Error('Cannot like twice');
    }

    post.recommendList.push(userId);
    await post.save();
}

async function edit(postId, edited) {
    return await Post.findByIdAndUpdate(postId, edited);
}

module.exports = {
    getAll,
    getFiltredByTitle,
    getLastSix,
    deleteById,
    create,
    edit, 
    like,
    getById
}