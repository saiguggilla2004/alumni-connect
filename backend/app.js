const express=require("express");
const app=express();
const port=3000;
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.listen(port,()=>{
    console.log("listening to the port "+port);
});

app.get("/register",(req,res)=>{
    let {data1,data2}=req.query;
  console.log(req.query)
    res.send("this is a sample get response"+data1+" "+data2);
});

app.post("/register",(req,res)=>{
    console.log(req.body)
    res.send("this is a sample post response");
}); 

app.post("/register/:id",(req,res)=>{
    console.log(req.params);

})