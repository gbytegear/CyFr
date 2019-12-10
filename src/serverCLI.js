module.exports = async rl=>{
	console.log('Server Command Line Interface:');
	process.title = "SCLI - Server Command Line Interface";
	const cli = ()=>{
		rl.question('>',command=>{
			try{
				console.log(eval(command));
			}catch(e){
				console.error(e);
			}
			cli();
		})
	}
	cli();
}