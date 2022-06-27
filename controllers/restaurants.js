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

export {
  index,
}