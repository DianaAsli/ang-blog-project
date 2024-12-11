const { hasUser } = require('../middlewares/guards');
const {
    create,
    getById,
    like,
    edit,
    deleteById,
    getAll,
    getFiltredByTitle,
    getLastSix
} = require('../services/postService');
const {
    parseError
} = require('../util/parser');

const postController = require('express').Router();

postController.get('/?limit=6', async (req, res,next) => {
    try {
        const posts = await getLastSix();
        if (posts.length === 0) {
            return res.status(404).json({ message: 'No posts found' });
        }
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
});

postController.get('/all', async (req, res,next) => {
    try {
        const posts = await getAll();
        if (posts.length === 0) {
            return res.status(404).json({ message: 'No posts found' });
        }
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
});

postController.post('/create', hasUser(), async (req, res, next) => {
    const post = {
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        owner: req.user._id
    }

    try {
        if (Object.values(post).some(x => !x)) {
            throw new Error('All fields are required')
        }
        await create(post);
        res.status(200).json({message:'Post successfully created'})
    } catch (err) {
       next(err)
    }


})

postController.get('/:id/like',hasUser(), async (req, res, next) => {
    const post = await getById(req.params.id);

    try {
        if (post.owner == req.user._id) {
            post.isOwner = true;
            throw new Error('Cannot like ypur own post');
        }
        if (post.recommendList.includes(req.user._id)) {
            post.isLiked = true;
            throw new Error('Cannot like twice');
        }

        await like(req.params.id, req.user._id);
        res.status(200).json({message: 'Successfully liked'})
    } catch (err) {
        next(err);
    }
})

postController.post('/:id/edit', async(req,res,next)=>{
    const post = await getById(req.params.id);

    if(post.owner != req.user._id){
        return res.status(400).json({message:'Not authorised to edit'})
    }

    const edited = {
        title: req.body.title,
        content: req.body.content,
        image: req.body.image
    }

    try{
        if(Object.values(edited).some(v => !v)){
            throw new Error('All fields are required')
        }

        await edit(req.params.id, edited);
        res.status(200).json({message: 'Successfully edited'})
    }catch(err){
        next(err);
    }
})

postController.post('/:id/delete',hasUser(), async(req,res, next)=>{
    const post = await getById(req.params.id);

    if(post.owner.toString() != req.user._id){
        return res.status(400).json({message: "Unauthorised to delete"})
    }

    await deleteById(req.params.id);
    res.status(200).json({message: 'Successfully deleted'})
})

postController.post('/search', async(req,res, next)=>{

    const searchQuery = req.body.search.trim();

    let posts = [];
    if(searchQuery){
        posts = await getFiltredByTitle(searchQuery);
    } else {
        posts = await getAll();
    }

    res.status(200).json({message: 'Successfully searched'})

})

postController.get('/details/:id', async (req, res,next) => {
    const post = await getById(req.params.id);

    if (req.user && post.owner == req.user._id) {
        post.isOwner = true;
    } else if (req.user && post.recommendList.map(u => u.toString()).includes(req.user._id.toString())) {
        post.isLiked = true;
    }

    let likes = post.recommendList.length;

})


module.exports = postController;