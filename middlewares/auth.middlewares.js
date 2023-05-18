// Middleware para comprobar si el usuario estrá logueado
function isLogged (req, res, next) {

    if(req.session.activeUser === undefined){
        res.redirect("/")
    } else {
        next()
    }

}

function isOnline (req, res, next) {
    if(req.session.activeUser === undefined){
        res.locals.isUserOnline = false;
    } else {
        res.locals.isUserOnline = true;
    } next();
}

const isAdmin = (req,res,next) => {
    if(req.session.activeUser.role === "admin"){
        next()
    }else{
        res.redirect("/") 
    }
}

const isAdminOnline = (req,res,next) => {
    if(req.session.activeUser && req.session.activeUser.role === "admin"){
        res.locals.isAdminActive = true;
    }else{
        res.locals.isAdminActive = false;
    }

    next()
}

module.exports = {
    isLogged,
    isOnline,
    isAdmin,
    isAdminOnline
}