import mongoose  from "mongoose";

const todotitleSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
},
{ timestamps:true }
);

const TodoTitle =mongoose.model("TodoTitle",todotitleSchema)


export default TodoTitle;