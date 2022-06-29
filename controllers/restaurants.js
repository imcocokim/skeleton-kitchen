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
    res.render('restaurants/show', {
      restaurant,
      title: 'Restaurant Detail',
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
    console.log(restaurant)
    req.body.restaurant = restaurant._id
    Review.create(req.body)
    .then(review => {
      restaurant.reviews.push(review)
      restaurant.save()
      .then(() => {
        res.redirect(`/restaurants/${restaurant._id}`)
      })

    })


  })
}

export {
  index,
  newRes as new,
  create,
  show,
  edit,
  update,
  deleteRes as delete,
  createRev
}