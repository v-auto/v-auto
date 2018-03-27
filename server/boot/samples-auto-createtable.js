'use strict'
module.exports=(app)=>{
    let dbs=app.dataSources;
    let models=app.models();
    let arrModelNames=[];

    models.forEach((model)=>{
        //get name database table config model
        let dbNameModel=model.config.dataSource.name;
        let result={
            name:model.modelName,
            db:dbNameModel
        };
        arrModelNames.push(result);
    })
    arrModelNames.forEach((modelName)=>{
        let db;
        let arrNameDB=Object.keys(dbs);
        if(modelName){
            db=dbs[modelName.db];
            if(typeof db!="undefined"){
                db.autoupdate(modelName.name,()=>{
                    db.discoverModelProperties(modelName.name);
                })
            }

        }
    })

}
