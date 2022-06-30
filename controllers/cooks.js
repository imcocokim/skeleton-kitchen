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
  console.log("***********")
}

export {
  index,
  show,
}