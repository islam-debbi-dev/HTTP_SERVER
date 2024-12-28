const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {Author,validateAuthor,validateUpdateAuthor} = require('../models/Author'); // 
const {verifyTokenAndAdmin}= require('../middlewares/verifyToken');


// Get all authors
router.get('/', asyncHandler(
  async (req, res) => {
    const { pageNumber } = req.query;
    const authorPerPage = req.query.authorPerPage || 2;
    console.log(authorPerPage)
    if(pageNumber){
    const authorlist = await Author.find()
                                   .skip((pageNumber-1)*authorPerPage)
                                   .limit(authorPerPage); 
    //.sort({firstname: 1}).select("firstname lastname -_id");
    res.status(200).json(authorlist);
    }else{
      const authorlist = await Author.find();
      res.status(200).json(authorlist);
    }
    
  }
));

/**
 * 
 */
// Get author by ID
router.get('/:id',asyncHandler(
  async (req, res) => {  
      const author = await Author.findById(req.params.id);
    if (author) {
      res.status(200).json(author);
    } else {
    if (!author) return res.status(404).send('Author not found');
    }
  }
));

/**
 * @desc create new author
 * @route /api/authores
 * @method POST 
 * @access private admin 
 */

router.post('/',verifyTokenAndAdmin, asyncHandler(
  async (req, res) => {
    const { error } = validateAuthor(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    const author = new Author ({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      nationality: req.body.nationality,
      image: req.body.image
    });
    const result = await author.save();
    res.status(201).json(result);
  
  
  }
));

/**
 * @desc updateauthor
 * @route /api/authores/:id
 * @method put 
 * @access private admin 
 */
router.put('/:id',verifyTokenAndAdmin,asyncHandler(
  async (req, res) => {
    const { error } = validateUpdateAuthor(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
 
    /*
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).send('Author not found');
    else{ 
      author.firstname = req.body.firstname;
      author.lastname = req.body.lastname;
      author.nationality = req.body.nationality;
      author.image = req.body.image;
      res.status(200).json(author);
    }
      */
    const author = await Author.findByIdAndUpdate(req.params.id,{
      $set: {
          firstname : req.body.firstname,
          lastname : req.body.lastname,
          nationality : req.body.nationality,
          image : req.body.image,
      } 
     },{new : true})
     res.status(200).json(author);
  }
));

/**
 * @desc delete author
 * @route /api/authores/:id
 * @method delete
 * @access private admin 
 */router.delete('/:id',verifyTokenAndAdmin,asyncHandler (
  async (req, res) => {
      const finduser = await Author.findById(req.params.id);
    if (!finduser) return res.status(404).send('Author not found');
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedAuthor);
    }
));



module.exports = router;
