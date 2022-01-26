const { Schema, model, Types } = require('mongoose');
const thoughtSchema = require('./Thought');

const UserSchema = new Schema (
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        thoughts: [thoughtSchema],
        friends: []
    }
);

const User = model('User', UserSchema);

module.exports = User;