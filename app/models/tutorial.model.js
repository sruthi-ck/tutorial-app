module.exports=mongoose=>{
    var schema=mongoose.Schema( //var schema paranja variablilekku mongoose schema paranja funtion call cheythu
{

    title:String,  
    description:String,
    published:Boolean
},
{timestamps:true}

);

    schema.method("toJSON", function()
 {
    const { __v, _id, ...object } = this.toObject();
object.id = _id;
return object;
});

const Tutorial = mongoose.model("tutorial", schema);
return Tutorial;
};

