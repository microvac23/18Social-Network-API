const { Schema, model } = require('mongoose');

// Schema to create Post model
const userSchema = new Schema(
    {
        username: {
            upvotes: Number,
            bookmarks: Number,
        },
        email: {
            type: String,
            minLength: 15,
            maxLength: 500,
        },
        thoughts: {
            type: Boolean,
            default: false,
        },
        friends: {
            type: Date,
            required: true,
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
const User = model('user', userSchema);

module.exports = User;
