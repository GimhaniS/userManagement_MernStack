const mongoose = require("mongoose");
const bcrpyt = require("bcryptjs");

const verificationTokenSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now(),
  },
});

// let hashed;
// verificationTokenSchema.pre("save",async=(next)=>{
// if("token"){
//    hashed = await bcrypt.hashed(token,8)
// }
// next()
// } )

// verificationTokenSchema.methods.compareToken = async =(token)=>{
// const result = await bcrpyt.compare(token,hashed);
// return result;
// }
module.exports = mongoose.model("verificationToken", verificationTokenSchema);
