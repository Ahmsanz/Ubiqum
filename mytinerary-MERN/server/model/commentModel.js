const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({

  user: {
      type: Object,
      required: true
    },
  itinerary: {
        type: String,
        required: false
    },
  date: {
      type: Date

  },
  description: {
    type: String

  },
  likes: {
    type: Number
  }

})

module.exports = mongoose.model('comment', commentSchema)
