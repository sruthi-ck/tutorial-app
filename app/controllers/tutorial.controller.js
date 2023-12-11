const db=require("../models");

const Tutorial= db.tutorials;

exports.create=(req,res)=> // create and save new tutorial
{
 //validate request
 if(!req.body.title){
    res.status(400).send({message:"content can't be empty"});
    return;
 }
 // create a tutorial
   const tutorial=new  Tutorial(
      {
         title:req.body.title,
         description:req.body.description,
         published:req.body.published
      }
   )
//save tutorial into database
tutorial
.save(tutorial)
.then(data=>{
   res.send(data);
})
.catch(err=>{ //data save ayittillel error message kodukkan
   res.status(500).send(
      {message:err.message||"some error occured while creating tutorial"
   } )
})

};


// retrive all tutorial from db
exports.findAll = (req,res)=>
{
  const title = req.query.title; // title undo oru qurery pass cheyan
  var condition = title?{title:{$regex:new RegExp(title),$option:"i"}}:{};
  Tutorial.find(condition)
  .then(data=>{
   res.send(data);
})
.catch(err=>{ //data save ayittillel error message kodukkan
   res.status(500).send(
      {message:err.message||"some error occured while retrieving tutorial"
   } )
})



};

// to find single
exports.findOne = (req,res)=>
{
  const id=req.params.id; //mongose id 
  Tutorial.findById(id)
  .then(data=>{
   if(!data)
   res.status(404).send({message:"not found tutorial with id"+id});
   else
   res.send(data);
  })
  .catch(err=>{res.status(500).send("Error in retrieving tutorial with id="+id)});

};
exports.update = (req,res)=>
{
 if(!req.body){
   return res.status(400).send(
      {
         message:"Data to update can't be empty"
      });
 }
 const  id =req.params.id;
 Tutorial.findByIdAndUpdate(id,req.body,{useFindAndModify:false})

 .then(data=>{
   if(!data)
   res.status(404).send({message:"cannot update the tutorial  id"+id});
   else
   res.send({message:"tutorial was updated sucessfully "});
  })
  .catch(err=>{
   res.status(500).send ({message:"error while updating id"+id})
  })

};
exports.delete = (req,res)=>
{
const id=req.params.id;
Tutorial.findByIdAndRemove(id)
.then(data=>{
   if(!data){
      res.status(400).send({message:"can't delete id"+id})
   }else{res.send({message:"tutorial deleted succesfully "})}
   
})
.catch(err=>{
   res.status(500).send ({message:"error while deleting id"+id})
  })
};
exports.deleteAll = (req,res)=>
{
 Tutorial.deleteMany({}) //empty object pass cheyunne
 .then(data=>{
   res.send({message:`${data.deletedCount} Tutorial were deleted sucessfully !`});
  
})
.catch(err=>{
   res.status(500).send ({message:err.message||"error while deleting id"+id});
  });


};
exports.findAllPublished = (req,res)=>
{
 Tutorial.find({published:true})
 .then(data=>{
   res.send(data);
 })
 .catch(err=>
   {
      res.status(500).send({
         message:err.message||"some error occured"
      });
   });

}; 

exports.findAllTitle=(req,res)=>
{
 Tutorial.find(title)
 .then(data=>{
   res.send(data);
 })
 .catch(err=>
   {
      res.status(500).send({
         message:err.message||"some error occured"
      });
   });

}