//connecting to database
const mongoose = require('mongoose');
const dbName="chatapp"
const url=`mongodb+srv://admin:admin@cluster0.4ozcil1.mongodb.net/${dbName}?retryWrites=true&w=majority`
mongoose.connect(url)
.then((result) => {
  
    
    console.log('database connected');
   
    
}).catch((err) => {
    console.log(err);
});
module.exports=mongoose;