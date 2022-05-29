const User = require("../modals/User");

exports.registerNewUser = async (req, res) => {

    var userName = req.body.name;
    var password = req.body.password;
    var email = req.body.email;
    
    User
        .create({
            userName: userName,
            password: password,
            email: email,
            isrecommended: "false",
            genres: [],
            categories: [],
            watchlist:[],
        }, async function (err, user) {
            if (err) {
                console.log("Error creating User: ", err);
                res
                    .status(400)
                    .json(err)
            } else {
                console.log("User Created: ", user);
                res
                    .status(201)
                    .json(user)
            }
        })
  };
  exports.loginUser = async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const user = await User.findByCredentials(email, password)
      if (user === null) {
        return res
          .status(401)
          .json({ error: "Login failed! Check authentication credentials" });
      }
      res.status(201).json({ user });
    } catch (err) {
      res.status(400).json({ err: "succcesfully fucked up" });
    }
  };
  exports.isRecommended = async(req, res) => {
    try {
      const id = req.body.userId;
      console.log(id)
      const user = await User.findOne({ _id:id })
      let isrecommended = user.isrecommended
      res.status(200).json(isrecommended);
    }
    catch(e) {
      console.log(e)
    }
  }

  exports.genres = async(req , res) => {
    const genres = req.body.genres
    const id = req.body.userId
    await User.findOneAndUpdate({
      _id: id
    },{
      genres : genres
    });
    res.status(200).json("fuck")
  }

  exports.categories = async(req , res) => {
    const categories = req.body.categories
    const id = req.body.userId
    await User.findOneAndUpdate({
      _id: id
    },{
      categories : categories
    });
    res.status(200).json("fuck")
  }

  exports.groups = async(req , res) => {
    const groups = req.body.groups
    const id = req.body.userId
    await User.findOneAndUpdate({
      _id: id
    },{
      groups : groups
    });
 
    res.status(200).json("fuck")
  }

  exports.setRecommended = async(req,res) => {
    const id = req.body.userId
    const user = await User.findOne({_id: id})
    console.log(user)
     await User.findOneAndUpdate({
      _id: id
    },{
      isrecommended : "true"
    });
    res.status(200).json("helo")
  }

  exports.retrieveAll = async(req,res) => {
    const id = req.body.userId
    const user = await User.findOne({ _id: id })
    const userObject = {
      genres: user.genres,
      categories: user.categories,
      groups: user.groups
    }
    console.log(userObject)
    res.status(200).json(userObject)
  }

  exports.addWatchList = async(req,res) => {
    let userId = req.body.userId
    let id = req.body.id
    let added = false
    const user = await User.findOne({ _id: userId })
    for(let i = 0; i < user.watchlist.length; i++) {
      if(user.watchlist[i].id === id) {
        added = true
      }
    }
    if(added === true) {
      res.status(200).json(added)
    }
    else {
      let title = req.body.title
      let image = req.body.image
      let stars = req.body.stars
      let genres = req.body.genres
      let imdb = req.body.imdb
      let updated = await User.findOneAndUpdate({
        _id: userId,
      } , {
        $push: {
          watchlist: {
            id:id,
            title: title,
            image: image,
            stars: stars,
            genres: genres,
            imdb: imdb
          }
        },
      });
      res.status(201).json(added)
    }
  }

  exports.getWatchList = async(req,res) => {
    let userId = req.body.userId
    let user = await User.findOne({ _id: userId })
    if(user !== null) {
      let watchlist = user.watchlist
      res.status(200).json(watchlist)
    }
    res.status(201)
  }

  exports.removeWatchList = async(req,res) => {
    let id = req.body.userId
    let movieId = req.body.id
    let user = await User.findOne({_id: id})
    let arr = user.watchlist
    function arrayRemove(arr, value) { 
    
      return arr.filter(function(ele){ 
          return ele.id != value;
      });
  }
  var result = arrayRemove(arr, movieId);
  console.log(result)
  let updated = await User.findOneAndUpdate({
    _id: id,
  } , {
      watchlist: result
    },
  );
  res.status(200).json("successfull")
  }