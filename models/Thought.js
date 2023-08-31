const { Schema, model } = require('mongoose');

// Schema to create Post model
const thoughtSchema = new Schema(
    {
        reactionID: {
            type: Boolean,
            default: false,
        },
        reactionBody: {
            type: Date,
            required: true,
        },
        username: {
            upvotes: Number,
            bookmarks: Number,
        },
        createdAt: {
            type: String,
            minLength: 15,
            maxLength: 500,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Initialize our Reaction model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
