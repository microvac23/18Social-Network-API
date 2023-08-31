const { Schema, model, Types } = require('mongoose');
const reactionSchema = require('./Reaction.js')
const dayjs = require('dayjs')

// Schema to create thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // formats time
            get: (date) => dayjs(date).format('DD/MM/YY')
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false,
    }
);

// virtual retrieves reaction length
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})

// Initialize our Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
