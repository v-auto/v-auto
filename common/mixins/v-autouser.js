const pathroot=require('app-root-dir').get();
const app=require(pathroot+'/server/server');
'use strict'
module.exports={
  Login:function Login(username,password,cb){
      let v_autouser=app.models.v_autoUser;
      let passworda=this.hashPassword(password);
  },
  createAccessToken:function createAccessToken(user) {
      const accessToken=app.models.v_auto_AccessToken;
      const tokenData={};
      tokenData.tll=60*60*24*7;
      tokenData.userId=user.id
      accessToken.create(tokenData,(err,accesstoken)=>{
        console.log(accesstoken)
      })
  }
}

