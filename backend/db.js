const mongoose = require('mongoose');

// const mongoURI = "mongodb+srv://foodapp:Jitender@foodapp@cluster0.ybejzty.mongodb.net/?retryWrites=true&w=majority";

const mongoURI = "mongodb+srv://foodapp:Jitender123@cluster0.ybejzty.mongodb.net/foodapp?retryWrites=true&w=majority";

const mongoDB = async () =>{
    await mongoose.connect(mongoURI, {useNewUrlParser: true}, (err, reslut)=>{
        if(err)
        {
            console.log("---", err);
        }
        else
        {
            console.log("connected");
            const fetched_data = mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(function(err, data){
                if(err)console.log(err);
                else console.log();
            })
        }
    });
}

// const mongoDB = () =>{
//     mongoose.connect(mongoURI, ()=>{
//         console.log("Connected");
//     });
// }

module.exports = mongoDB;
