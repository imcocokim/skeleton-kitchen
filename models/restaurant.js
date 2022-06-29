import mongoose from "mongoose"

const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  name: {type: String, unique: true},
  location: String,
  cuisine: String,
  reviews: [{type: Schema.Types.ObjectId, ref: "Review"}],
  createdBy: {type: Schema.Types.ObjectId, ref: "Profile"}
}, {
  timestamps: true
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

export {
  Restaurant
}

