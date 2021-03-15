var mongoose= require("mongoose");

var jewellerySchema= new mongoose.Schema(
    {
        shopName:{type:String},
        customerName:{type:String}, customerPhoneno:{type:String},
        goldRate:{type:String}, goldWeight:{type:String},
        goldPrice:{type:String}
    }
)

var jewelleryModel= mongoose.model("jewellerys",jewellerySchema);

module.exports={jewelleryModel}