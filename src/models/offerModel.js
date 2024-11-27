import mongoose,{Schema} from "mongoose";

const applicationSchema = new mongoose.Schema({
    createdBy: { type: String, required: true }, 
    title: { type: String, default: null },
    description: { type: String, default: null }, 
    requirements: { type: String, default: null }, 
    closingTime: { type: Date, default: null }, 
    applyLink: { type: String, default: null }, 
    status: { 
        type: String, 
        enum: ["draft", "done"],
        default: "draft",
        index:true
    }, 
    createdAt: { type: Date, default: Date.now }, 
    updatedAt: { type: Date, default: Date.now }
});

applicationSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Position = mongoose.model("Position",applicationSchema)
export default Position;