import { Profile } from '../models/profile.js'

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
    res.render('cooks/show', {
      profile,
      title: `${profile.name}`
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/cooks')
  })
}

export {
  index,
  show,
}