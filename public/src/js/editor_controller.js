//try{
const editor = new (class {
	constructor (){
		
	}
});

const blocks = document.querySelector('.editor-blocks');

const addLineBlock = (props, name)=>{
	let element = document.createElement('input');
	element.type = 'text';
	element.className = name;
	//elememt.dataset.props = JSON.stringify(props);
	blocks.appendChild(element);
};

editor_title_first.addEventListener('click', ()=>addLineBlock({},'h1'));
// }catch(e){alert(e);}
