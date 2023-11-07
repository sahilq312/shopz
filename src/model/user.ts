import mongoose,{ Schema, model } from "mongoose";

const userSchema = new Schema<User>({
    email : {
        type : String
    },
    password : {
        type : String
    }
})
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;