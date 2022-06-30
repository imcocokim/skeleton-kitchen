import { Restaurant } from '../models/restaurant.js'
import { Review } from '../models/review.js'

function index(req, res){
  Restaurant.find({})
  .populate('reviews')
  .then(restaurants => {
    res.render('restaurants/index', {
      restaurants,
      title: "Restaurants",
      user: req.user ? req.user: null
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function newRes(req, res) {
  res.render('restaurants/new', {
    title: 'Add Restaurant'
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function create(req, res) {
  req.body.createdBy = req.user.profile._id
  Restaurant.create(req.body)
  .then(restaurant => {
    res.redirect("/restaurants")
  })
  .catch(err => {
    console.log(err)
    res.redirect('/restaurants')
  })
}

function show(req, res) {
  Restaurant.findById(req.params.id)
  .populate('createdBy')
  .populate('reviews')
  .then(restaurant => {
    const isSelf = restaurant.createdBy._id.equals(req.user._id)
    console.log(restaurant)
    console.log('********', req.user._id)
    console.log("**********", restaurant.createdBy._id)
    res.render('restaurants/show', {
      restaurant,
      title: 'Restaurant Detail',
      isSelf
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/restaurants')
  })
}

function edit(req, res) {
  Restaurant.findById(req.params.id)
  .then(restaurant => {
    res.render('restaurants/edit', {
      title: "Edit Restaurant",
      restaurant
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/restaurants')
  })
}

function update(req, res){
  Restaurant.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(restaurant => {
    res.redirect(`/restaurants/${restaurant._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/restaurants')
  })
}

function deleteRes(req, res){
  Restaurant.findByIdAndDelete(req.params.id)
  .then(restaurant => {
    res.redirect('/restaurants')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/restaurants')
  })
}

function createRev(req, res) {
  Restaurant.findById(req.params.id)
  .then(restaurant => {
    req.body.restaurant = restaurant._id
    Review.create(req.body)
    .then(review => {
      restaurant.reviews.push(review)
      restaurant.save()
      .then(() => {
        res.redirect(`/restaurants/${restaurant._id}`)
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/restaurants/${restaurant._id}`)
    })
  })
}

function deleteRev(req, res){
  Review.findByIdAndDelete(req.params.id)
  .populate('restaurant')
  .then(review => {
    res.redirect(`/restaurants/${review.restaurant._id}`)
  })
}

// function editRev(req, res) {
//   // Find the review by ID
//   Review.findById(req.params.id)
//   // push inside of the form
//   .then(review => {
//     review.content.push(req.body)
//   })
//   // change the button to update review
//   // update the review
// }

export {
  index,
  newRes as new,
  create,
  show,
  edit,
  update,
  deleteRes as delete,
  createRev, 
  deleteRev,
  // editRev
}