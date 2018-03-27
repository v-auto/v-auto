const exVautouser=require('../mixins/v-autouser');
'use strict';

module.exports = function(Vautouser) {
    Vautouser.registerUser=(username,email,password,phone,cb)=>{
      const data={
        username:username,
        email:email,
        password:password,
        phone:phone
      }
        Vautouser.create(data).then(function(user){
            const tokenData={};
            let userSettings=Vautouser.constructor.settings;
            tokenData.ttl = Math.min(tokenData.ttl || userSettings.ttl, userSettings.maxTTL,60*60*24*7);
            tokenData.userid=user.id;
            Vautouser.createAccessToken(tokenData,(err,result)=>{
                console.log(result);
            })
        })
        cb(null,200,{sms:data});

    }
    Vautouser.remoteMethod(
        'registerUser',
        {
            http:{
                verb:"post"
            },
            accepts:[
                {arg:"username",type:"string",required:true},
                {arg:"email",type:"string",required:true},
                {arg:"password",type:"string",required :true},
                {arg:"phone",type:"string",required:true,description:"abc"}
            ],
            returns:[
                {arg:"sms",type:"string" },
              {arg:"data",type:"object"}
            ]
    })
    Vautouser.loginUsesr=()=>{

    }
};
