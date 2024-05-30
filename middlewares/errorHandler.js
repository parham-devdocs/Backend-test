 const {logEvents}=require('./logEvents')

const errHandler = (err, req, res, next) => {
  console.error(err.stack);  
  res.status(500).send(logEvents)
}

module.exports=errHandler