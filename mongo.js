const mongoose =  require ("mongoose");
mongoose.connect('mongodb://localhost:27017/LoginData');


connect.then(() => {
    console.log("database connected")
})
.catch(() => {
    console.log("database not");
})

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type : String,
        required: true
    }
});

const collection = new mongoose("user", LoginSchema);

module.exports = collection;