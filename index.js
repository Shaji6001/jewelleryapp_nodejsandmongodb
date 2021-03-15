var express= require("express");
var mongoose = require("mongoose");
var bodyParser= require("body-parser");
var {jewelleryModel}= require('./model/jewellery')


var app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect("mongodb+srv://shaji:ponnu123@cluster1.u2cuq.mongodb.net/jwlrydb?retryWrites=true&w=majority",{ useNewUrlParser: true },{ useUnifiedTopology: true })

app.post('/buygold', async(req,res)=>{
    try
    {
        var data= req.body;
        console.log(data);
        var data=new jewelleryModel(req.body);
        var result= await data.save();
        res.json(result);
    }
    catch(error){res.status(500).send(error)}

})

app.get('/viewall',async (req,res)=>{
    try
    {
        var result= await jewelleryModel.find().exec();
        res.json(result)
    }
    catch(error){res.status(500).send(error)}
})

app.post('/search',async (req,res)=>{
    try
    {
        jewelleryModel.find(req.body, (error,data)=>{
            if(error){throw error}
            else{res.json(data)};
        })
    }
    catch(error){res.status(500).send(error)}
})


app.post('/sellgold',async (req,res)=>{
    try
    {
        jewelleryModel.findByIdAndDelete(req.body.id,(error,data)=>{
            if(error){throw error}
            else{res.json({'Status':"Success"})};
        })
    }
    catch(error){res.status(500).send(error)}
})


app.post('/update',async (req,res)=>{
    try
    {
        jewelleryModel.findByIdAndUpdate(req.body.id,
            {
               shopName:req.body.shopName,
               customerName:req.body.customerName,goldRate:req.body.goldRate,
                customerPhoneno:req.body.customerPhoneno,
                goldWeight:req.body.goldWeight,goldPrice:req.body.goldPrice
            },(error,data)=>{
                if(error){res.send(error)}
                else{res.json({'Status':"Success"})};

            }
            )
    }
    catch(error){res.status(500).send(error)}
})




app.listen(process.env.PORT || 3002, function(){
    console.log("Node Server Running Fine!!")
})