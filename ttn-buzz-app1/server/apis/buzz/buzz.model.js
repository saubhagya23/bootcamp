/**
 * Created by saubhagya on 5/5/17.
 */

var mongoose = require('mongoose');

var connection2 = require('./../../config/dataSources/users.dataSource');

var buzzSchema = new mongoose.Schema({
    content: {
        type: Mixed,
        required: true
    },
    imageUrl : {
        type: Mixed
    },
    category:{
        type: String,
        enum: [activity,lostNfound]
    },
    comments: {
        type: String,
        ref: 'User',
        date: Date
    },
    likesNdislikes: {
        type: Array,
        userInfo : refs(User)
    },
    likeDislikeCount: {
        type: Number
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dateCreated: Date,
});

module.exports = mongoose.model('Buzz',buzzSchema);
