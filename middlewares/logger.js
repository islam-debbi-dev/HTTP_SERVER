
const logger = (req,res,next)=>{
    console.log(`${req.method} ${req.path} ${req.protocol} :// ${req.get('host')}`)
    next();
  }
  module.exports = logger;