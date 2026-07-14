const mongoose = require('mongoose');
// const mongoURI = 'mongodb+srv://gofood:Sangam123@cluster0.bndd0tt.mongodb.net/gofoodmern?appName=Cluster0'
const mongoURI = 'mongodb://gofood:Sangam123@ac-uamokbm-shard-00-00.bndd0tt.mongodb.net:27017,ac-uamokbm-shard-00-01.bndd0tt.mongodb.net:27017,ac-uamokbm-shard-00-02.bndd0tt.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-h4jvb9-shard-0&authSource=admin&appName=Cluster0'
const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
        const fetched_data = await mongoose.connection.db.collection("fooditems");

        const data = await fetched_data.find({}).toArray();
        // global.food_items = data;
        // console.log(global.food_items);

        const foodCategory = await mongoose.connection.db.collection("foodCategory");
        const categoryData = await foodCategory.find({}).toArray();

        global.food_items = data;
        global.foodCategory = categoryData;

    } catch (err) {
        console.log(err);
    }
};

module.exports = mongoDB;