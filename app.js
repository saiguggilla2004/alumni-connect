const express=require("express");
const app=express();
const path=require("path")
const ejsMate=require("ejs-mate")
const mongoose=require("mongoose");
const methodOverride=require("method-override");
app.use(methodOverride('_method'))
app.use(express.static("public"))
app.use(express.static(path.join(__dirname,"/public/js")));
app.use(express.static(path.join(__dirname,"/public/css")));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.engine("ejs",ejsMate)
const Story=require("./models/successStories");
main()
.then((res)=>{
    console.log("connected");
})
.catch((err)=>{
    console.log(err);
})
async function main()
{
  await mongoose.connect("mongodb://127.0.0.1:27017/sih");
}
const port=3000;
app.listen(port,()=>{
    console.log("listening to the port "+port);
})

app.get("/",(req,res)=>{
    res.render("home.ejs")
})

//posts

//to get all the posts
app.get("/posts",async (req,res)=>{

    
  res.send("this is the page that show all the posts");
})

//to view only particular post
app.get("/posts/:id",(req,res)=>{
    res.send("this is the page that only the specific post");
})

//create new post
app.get("/posts/new",(req,res)=>{
    res.send("the form to enter the details of the new post");
})

//to uplad the new post

app.post("/posts/new",(req,res)=>{
    res.send("to insert the post into the DB");
})

//to edit the post

//the form to edit the post
app.post("/posts/:id/edit",(req,res)=>{
    res.send("edit post form is working")
})

//now post the edited post into the database

app.patch("/posts/:id/edit",(req,res)=>{
    res.send("now we will insert the edited post into the db")
});

//dlete the post

app.delete("/posts/:id/delete",(req,res)=>{
    res.send("this route is to delete the particular post")
});


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//stories



//to get all the stories
app.get("/stories",async (req,res)=>{
  let stories=await Story.find();
  
  res.render("allstories.ejs",{stories});
})
  //create new stories
  app.get("/stories/new",(req,res)=>{
    res.render("newstory.ejs");
 })
  //to view only particular stories
  app.get("/stories/:id",async (req,res)=>{
    let {id}=req.params;
    let story=await Story.findById(id);
    console.log(story);
    res.render("onestory.ejs",{story});
  })
  
  
  
  //to uplad the new stories
  
  app.post("/stories/new",(req,res)=>{
    let {title:title,content:content}=req.body;
    let newStory=new Story({
         alumniId: '64b99e8c4f1b255eecf6f9a1',
        title:title,
        content:content,
        publishedAt:new Date(),
        isFeatured:true
    });

    newStory.save()
    .then((res)=>{
        console.log("inserted into the db succesfully");
        console.log(res);
    })
    .catch((err)=>{
        console.log("an error occured");
    })
      res.redirect("/stories");
  })
  
  //to edit the post
  
  //the form to edit the post
  app.get("/stories/:id/edit",async(req,res)=>{
      let {id}=req.params;
      let story=await Story.findById(id);
      console.log(story);
      res.render("editstory.ejs",{story});

  })
  
  //now post the edited stories into the database
  
  app.patch("/stories/:id/edit",async (req,res)=>{
    let {id}=req.params;
    console.log(id)
    let {title:title,content:content}=req.body;
    let edited=await Story.findByIdAndUpdate(id,{title:title,content:content}, { new: true } );
    console.log(edited);
    res.redirect("/stories");
});
  
  //dlete the post
  
  app.delete("/stories/:id/delete",async(req,res)=>{
    let {id}=req.params;
    console.log(id);
    let deleted=await Story.findByIdAndDelete(id);
    console.log(deleted);
    res.redirect("/stories");
  });
  




