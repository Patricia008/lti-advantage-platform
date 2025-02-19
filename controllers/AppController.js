const config = require('../config');
const courses = require('../data/courses');
const keys = require('../data/keys');
const {constructLoginParams} = require('../lti/init-login');
const {handleOIDCRequest} = require('../lti/auth-oidc');

exports.launchDefault = (req, res)=>{
    res.render('index.ejs',{
        title: config.appName,
        courses: courses
    })
}

exports.initLogin = (req, res)=> {
	console.log('>>>> in initLogin method')
    const {toolId,resLinkId} = req.query;
    if(!toolId){
        return res.status(400).send(`Bad Request, Tool Id is Required`)
    }
    if(!resLinkId){
        return res.status(400).send(`Bad Request, Resource Link Id is Required`)
    }

	console.log('>>>> toolId and resLinkId present')
    let loginData = constructLoginParams(toolId,resLinkId);
	console.log('>>>> after constructLoginParams')
    if(!loginData){
        return res.status(400).send(`Bad Request, No tool exists with id = ${toolId}`)
    }
    
	console.log('>>>> before return')
    return res.render('init-login.ejs',{
        title: config.appName,
        formFields: loginData.loginParams,
        action: loginData.loginURL
    })
}

exports.authOidc = (req, res)=>{
    let queryParams = Object.assign({}, req.query)
    let launhData = handleOIDCRequest(queryParams);

    return res.render('tool-redirect.ejs',{
        title: config.appName,
        id_token: launhData.id_token,
        state: launhData.state,
        action: launhData.action
    })
}

exports.getPublicKey = (req,res) => {
    let responseObj = {"keys":[]};
    responseObj["keys"].push(keys[0].jwk);
    res.json(responseObj);
}