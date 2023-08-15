const router = require('express').Router()
const Unicorn = require('../models/unicorn')


router.get("/", (req, res, next) => {
    Unicorn.find({})
      .then(unicorns => res.json(unicorns))
      .catch(err => next(err))
  })
  // Find by ID
router.get("/:id", (req, res, next) => {
  Unicorn.findById(req.params.id).then(unicorn => {
    if (!unicorn) {
      throw new NotFoundError()
    } 
    res.json(unicorn)
  }).catch(err => next(err))
})

// Delete one
router.delete("/:id", (req, res, next) => {
  Unicorn.findByIdAndRemove(req.params.id).then(result => {
    if (!result) {
      throw new NotFoundError()
    } 
    res.json(result)
    
  })
    .catch(err => next(err))
});

// Insert one
router.post("/", (req, res, next) => {
  const body = req.body
  // Check body
  const errorMessages = []
  if (!body.name) errorMessages.push("name must be present")
  if (!body.price) errorMessages.push("price must be present")
  if (!body.stock) errorMessages.push("stock must be present")
  if (!body.color) errorMessages.push("color must be present")
  if (errorMessages.length > 0) {
    res.status(422).json({ errorMessages })
    return
  }
  // Check existing
  Unicorn.find({ name: body.name }).then(unicorn => {
    if (unicorn && unicorn.length > 0) {
      errorMessages.push("name must be unique")
      res.status(422).json({ errorMessages })
    } else {
      // Insert
      const unicorn = new Unicorn(body)
      unicorn.save().then(result => {
        res.json(result)
      })
        .catch(err => next(err))
    }
  })
    .catch(err => next(err))
})
router.put("/:id", (req, res, next) => {
  const body = req.body
  const errorMessages = []
  if (!body.name) errorMessages.push("name must be present")
  if (!body.price) errorMessages.push("price must be present")
  if (!body.stock) errorMessages.push("stock must be present")
  if (!body.color) errorMessages.push("stock must be present")
  if (errorMessages.length > 0) {
    res.status(422).json({ errorMessages })
    return
  }
  const unicorn = {
    name: body.name,
    price: body.price,
    stock : body.stock,
    color : body.color
  }
  Unicorn.findByIdAndUpdate(req.params.id, unicorn, { new: true })
    .then(updatedGame => {
      if (!updatedGame) {
        throw new NotFoundError()
      } 
        res.json(updatedGame)
      
    })
    .catch(error => next(error))
})

module.exports = router
