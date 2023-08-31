const { Schema, model } = require('mongoose');
const dayjs = require('dayjs')

// Schema to create reaction model
const reactionSchema = new Schema(
    {
        reactionID: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        username: {
            upvotes: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // formats date
            get: (date) => dayjs(date).format('DD/MM/YY')
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

// Initialize our Reaction model
const Reaction = model('reaction', reactionSchema);

module.exports = Reaction;
