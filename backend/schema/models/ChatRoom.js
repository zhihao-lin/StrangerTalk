const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatRoomData = new Schema({
    names : [String],
    from: [String],
    messages : [String]
});

module.exports = mongoose.model('ChatRoom', ChatRoomData);