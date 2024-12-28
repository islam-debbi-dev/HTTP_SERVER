const express = require('express'); 
const {Book,validateBook,validateUpdateBook} = require('../models/Books');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const {verifyTokenAndAdmin}= require('../middlewares/verifyToken');


/**
 * @desc Get all books
 * @route /api/books
 * @access Public
 * @method GET
 */
router.get('/', asyncHandler(
       async (req, res) => {
        const book = await Book.find().populate("author",["_id","firstname","lastname"]);
        res.status(200).json(book);
        }
));
/**
 * @desc Get a book by id
 * @route /api/books/:id
 * @method GET
 * @access Public
 */
router.get('/:id', asyncHandler(
    async (req, res) => {
       const book = await Book.findById(req.params.id);
       if(book){
        res.status(200).json(book);
      }else{
        res.status(404).send('Book not found');
      }
        }
    )
    );
/**
* @desc Get book by auther
 * @route /api/books
 * @access Public
 * @method GET 
 */
router.get('/:authorID', asyncHandler(
    async (req, res) => {
       const book = await Book.find(req.params.authorID,);
       if(book){
        res.status(200).json(book);
      }else{
        res.status(404).send('author his not have a Book');
      }
        }
    )
    );
/**
 * @desc Add a book
 * @route /api/books
 * @method POST
 * @access private onty admin
 */
router.post('/',verifyTokenAndAdmin,asyncHandler(
    async (req,res)=>{
        const {error} = await validateBook(req.body);
        if(error){
            return res.status(400).json({message: error.details[0].message});
        }
        const book = new Book({
            title : req.body.title,
            author : req.body.author,
            description : req.body.description,
            price: req.body.price,
            cover: req.body.cover ,
    
        })
        await book.save();
        res.status(201).json(book);
    }
))

/**
 * @desc Update a book
 * @route /api/books/:id
 * @method PUT
 * @access private 
 */
router.put('/:id',verifyTokenAndAdmin,asyncHandler(
    async(req,res)=>{
        const {error}= await validateUpdateBook(req.body);
        if(error){
            return res.status(400).json({message: error.details[0].message});
        }
         const updatedBook  = await Book.findByIdAndUpdate(req.params.id,{
            $set :{
            title : req.body.title,
           author : req.body.author,
           description : req.body.description,
           price : req.body.price,
           cover: req.body.cover,
            }}
            ,{new : true}
        );
        if(!updatedBook){
            return res.status(404).send('Book not found');
        }
        
        res.status(200).json(updatedBook);
    }
))
         
       


/**
 *  @desc Delete a book
 *  @route /api/books/:id
 *  @method DELETE
 * @access private
 */
router.delete("/:id",verifyTokenAndAdmin, asyncHandler(
    async (req, res) => {
    const book = await Book.findById(req.params.id);
    if(book){
        const deletedBook = await Book.findByIdAndDelete(req.params.id); 
        
        res.status(200).json(deletedBook);
    }else{
        res.status(404).send('Book not found');
    }
  }));



module.exports = router;