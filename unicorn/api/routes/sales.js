const router = require('express').Router()
const Sale = require('../models/sale')
const Unicorn = require('../models/unicorn')
const { request } = require('express')


router.get("/", (req, res, next) => {
    Sale.find({})
      .then(sale => res.json(sale))
      .catch(err => next(err))
  })
  router.get("/:id", (req, res, next) => {
    Sale.findById(req.params.id).then(sale => {
      if (!sale) {
        throw new NotFoundError()
      } 
      res.json(sale)
    }).catch(err => next(err))
  })
  
  // Delete one
  router.delete("/:id", (req, res, next) => {
    Sale.findByIdAndRemove(req.params.id).then(result => {
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
    if (!body.buyer) errorMessages.push("buyer must be present")
    if (!body.date) errorMessages.push("date must be present")
    if (!body.quantity) errorMessages.push("quantity must be present")
    if (!body.unicorn) errorMessages.push("unicorn must be present")
    if (body.quantity<1) errorMessages.push("quantity must be >=1 ")
    if (errorMessages.length > 0) {
      res.status(422).json({ errorMessages })
      return
    }
    Unicorn.findById(body.unicorn).then(unicorn => {
      if (!unicorn) {
        errorMessages.push("licorne non présente dans le stock ")
        res.status(404).json({ errorMessages })
      } 
      if(unicorn.stock < body.quantity){
        errorMessages.push("plus assez de stock ")
        res.status(410).json({ errorMessages })
      }
      
      const newLicorne = {
        name: unicorn.name,
        price: unicorn.price,
        stock : unicorn.stock -body.quantity ,
        color: unicorn.color
      }
      Unicorn.findByIdAndUpdate(body.unicorn, newLicorne, {new : true}).then(newLicorne =>{newLicorne.save()})
      const newSale = {
        buyer: body.buyer,
        date : body.date,
        quantity: body.quantity,
        total: unicorn.price*body.quantity,
        unicorn : unicorn.id
      }
     new Sale(newSale).save().then(result => {
      console.log("ok")
        res.json(result)
      })
        .catch(err => next(err))})
    })
  
  router.put("/:id", (req, res, next) => {
    const body = req.body
    const errorMessages = []
    if (!body.buyer) errorMessages.push("buyer must be present")
    if (!body.date) errorMessages.push("date must be present")
    if (!body.quantity) errorMessages.push("quantity must be present")
    if (!body.total) errorMessages.push("total must be present")
    if (!body.unicorn) errorMessages.push("unicorn must be present")
    if (errorMessages.length > 0) {
      res.status(422).json({ errorMessages })
      return
    }
    const sale = {
      buyer: body.buyer,
      date : body.date,
      quantity: body.quantity,
      total: body.total,
      unicorn : body.unicorn
    }
    Sale.findByIdAndUpdate(req.params.id, sale, { new: true })
      .then(updatedSale => {
        if (!updatedSale) {
          throw new NotFoundError()
        } 
          res.json(updatedSale)
      })
      .catch(error => next(error))
  })
module.exports = router