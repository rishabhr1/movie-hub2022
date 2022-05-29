const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  isrecommended : {
    type: String
  },
  genres: {
    type: Array
  },
  categories: {
    type: Array
  },
  groups: {
    type : Array
  },
  watchlist: {
    type: Array
  }
});



//this function generates an auth token for the user

//this method search for a user by email and password.
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  let isPasswordMatch
  console.log(user);
  if (user === null) {
    return user;
  }
  if(password === user.password) {
    isPasswordMatch = true;
  }
  else {
    isPasswordMatch = false;
  }
  if (isPasswordMatch === false) {
    throw new Error({ error: "Invalid login details" });
  }
  return user;
};

const User = mongoose.model("User", userSchema, "users");
module.exports = User;