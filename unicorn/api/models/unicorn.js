const mongoose = require('mongoose')



// Define Schema
const unicornSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock : Number,
  color : String
})

unicornSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})



// Export model
module.exports = mongoose.model('Unicorn', unicornSchema)