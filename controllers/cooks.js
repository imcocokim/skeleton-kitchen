import { Profile } from '../models/profile.js'
import { Restaurant } from '../models/restaurant.js'
import { Review } from '../models/review.js'

function index(req, res) {
  Profile.find({})
  .then(profiles => {
    res.render('cooks/index', {
      profiles,
      title: "Cooks"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function show(req, res){
  Profile.findById(req.params.id)
  .then(profile => {
    const isSelf = profile._id.equals(req.user.profile._id)
    Restaurant.find()
    res.render('cooks/show', {
      profile,
      title: `${profile.name}`,
      isSelf
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/cooks')
  })
}

function edit(req, res){
  Profile.findById(req.params.id)
  .then(profile => {
    res.render('cooks/edit', {
      title: "Edit Profile",
      profile
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/cooks')
  })
}

function update(req, res){
  Profile.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(profile => {
    res.redirect(`/cooks/${profile._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/cooks')
  })
}

export {
  index,
  show,
  edit,
  update
}