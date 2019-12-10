const released = true;

global.app				= new (require('koa'))();
global.router			= new (require('koa-router'))();
global.server 			= require('http').Server(app.callback()); //HTTP wraper for koa
global.io				= require('socket.io')(server); //Socket.io wraper for HTTP for koa
global.rl 				= require('readline').createInterface({input: process.stdin,output: process.stdout});



app.use(require('koa-static')('./public/'));

// socket.io unauthorized request processing
io.on('connection', async socket=>{
    return require('./src/socket')(socket);
})

global.serverSettings = new Object();
serverSettings.port = 8080;
serverSettings.dataBaseURL;

console.clear();
process.title = "Server settings input...";

const serverStart = () => {
	return rl.question('Enter port(default = 8080):',answer=>{
		if(Number(answer) != 0 && Number(answer) != NaN){
			serverSettings.port = Number(answer)
		}else console.log('Used default Port');

		server.listen(serverSettings.port);
		console.clear();
		console.info("Server run on address:\nhttp://localhost:"+serverSettings.port
			+"\nData Base URL:\n"+serverSettings.dataBaseURL+"\n\n");
		return require('./src/serverCLI')(rl);
	});
}

serverStart();