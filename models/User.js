const { Schema, model, Types } = require('mongoose');

// Schema to create user model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// virtual for friend count
userSchema.virtual('friendCount').get(function () {
    return this.friends.length
})

// Initialize our user model
const User = model('user', userSchema);

module.exports = User;
