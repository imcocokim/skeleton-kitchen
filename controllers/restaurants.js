import { Restaurant } from '../models/restaurant.js'

function index(req, res){
  Restaurant.find({})
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

export {
  index,
  newRes as new,
  create,
  show,
}