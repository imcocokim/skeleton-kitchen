
import mongoose from "mongoose"
import { Restaurant } from "./restaurant.js";

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  content: String,
  ratings: Number,
  createdBy: {type: Schema.Types.ObjectId, ref: "Profile"},
  restaurant: {type: Schema.Types.ObjectId, ref: "Restaurant"},
}, {
  timestamps: true
}
)


const Review = mongoose.model('Review', reviewSchema)

export {
  Review
}