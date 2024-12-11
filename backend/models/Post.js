const {
    Schema,
    model,
    Types
} = require('mongoose');

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: [10, 'Title should be at least 10 characters long'],
        maxlength: [100, 'Title should be at most 100 characters long']
    },
    content: {
        type: String,
        required: true,
        minlength: [100, 'The Description should be at least 100 characters long'],
        maxlength: [1000, 'The Description should be no more than 1000 characters long']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    image: {
        type: String,
        required: true,
        match: [/^https?:\/\//, 'Image URL is not valid']
    },
    recommendList: {
        type: [Types.ObjectId],
        ref: 'User',
        required: true,
        default: []
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
})

postSchema.index({
    title: 1
}, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

postSchema.pre(['findOneAndUpdate', 'updateOne'], function (next) {
    this.set({ updatedAt: Date.now() });
    next();
});

const Post = model('Post', postSchema);
module.exports = Post;