const Express=require('express');
var app=new Express();
var bodyparser=require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(Express.static(__dirname+"/public"));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200' );

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/student");
var StudentModel=mongoose.model("student",{
    name:String,
    rollno:String,
    admissionno:String,
    college:String,
    branch:String,
    dob:String,
    mailid:String
});
app.post('/readApi',(req,res)=>{
    var stud=new StudentModel(req.body);
    stud.save((error)=>
    {
        if(error){
            throw error;
        }
        else{
            res.send(stud);
        }
    });
});
app.get('/viewApi',(req,res)=>{

    StudentModel.find((error,data)=>{
        if(error)
        {
            throw error;
        }
        else{
            res.send(data);
        }
    });
});
app.post('/searchApi',(req,res)=>{
    var amno=req.body.admissionno;
    StudentModel.find({admissionno:amno},(error,data)=>{
        if(error)
        {
            throw error
        }
        else{
            console.log(data)
            res.send(data);
        }
    })
})
app.post('/delApi',(req,res)=>
{
    MessageModel.remove({_id:req.body[0]._id},(error,response)=>
    {
        if(error)
        {
            throw error;
        }
        else{
            res.send(response);
        }
    })
})
app.post('/updateApi',(req,res)=>
{
    console.log(req.body[0])
    MessageModel.findOneAndUpdate({_id:req.body[0]._id},req.body[0],(error,response)=>
    {
         if(error)
         {
             console.log(error);
             throw error;
         }
         else{
             res.send(response);
         }
    })
})
app.listen(process.env.PORT || 3000,(req,res)=>
{
    console.log("Server is running");
})