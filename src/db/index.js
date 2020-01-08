global.dbclient = new (require('mongodb').MongoClient)(`mongodb://${server_settings.mongodb.url}`, { useNewUrlParser: true, useUnifiedTopology: true });

dbclient.connect(err => {
  if(err){
    console.error(err);
    dbclient.close();
    return delete global.dbclient;
  }

  global.db = new Object();

  for(let dbname in server_settings.mongodb.db) {
    let db = dbclient.db(dbname);
    global.db[dbname] = new Object();
    server_settings.mongodb.db[dbname].forEach(collection => global.db[dbname][collection] = db.collection(collection));
  }
});
