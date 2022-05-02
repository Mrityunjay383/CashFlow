const checkAuth = (req, res, next) => {
  if(typeof(req.session.isLogedin) == 'undefined'){
      res.redirect("/login");
  }else{
    next();
  }
}

module.exports = {checkAuth};
