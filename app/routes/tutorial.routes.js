module.exports=app=>{
    const tutorials=require("../controllers/tutorial.controller");
    var router=require("express").Router();
    //create a new tutorial
    router.post("/",tutorials.create);
    router.get("/",tutorials.findAll);
    router.get("/:id",tutorials.findOne);
    router.put("/:id",tutorials.update);
    router.delete("/:id",tutorials.delete);
    router.delete("/",tutorials.deleteAll);
    router.get("/published",tutorials.findAllPublished);
    router.get("/title",tutorials.findAllTitle);

    app.use('/api/tutorials', router); // ethannu url kazhij adhyam call cheya

}