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


module.exports = {
    isLogged,
    isOnline,
}