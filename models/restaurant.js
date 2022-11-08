import mongoose from "mongoose"
import { Review } from "./review.js";

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

restaurantSchema.pre('remove', function(next) {
  // 'this' is the restaurant being removed. Provide callbacks here if you want
  // to be notified of the calls' result.
  Review.remove({restaurant_id: this._id}).exec();
  next();
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

export {
  Restaurant
}

// CASCADE DELETION: https://stackoverflow.com/questions/14348516/cascade-style-delete-in-mongoose