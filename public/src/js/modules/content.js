// try { //mobile debug
const content_controller = new class extends Array {
    constructor(){
        super();
        this.tabs = document.querySelector('article>.tabs');
        this.contents = document.querySelector('article');
    }
    
    open(type, name, data = null){
        const tab = document.createElement('button');
        const content = document.createElement('div');
        
        tab.className = "accent";
        tab.innerText = name;
        content.className = `content ${type}`;
        
        this.tabs.appendChild(tab);
        this.contents.appendChild(content);
        
        this.push({tab, content});
    }
    
    change(index, name, type = null) {
        
    }
    
    close(index){
        this[index].tab.remove();
        this[index].content.remove();
    }
}

content_controller[0] = {
    tab: document.querySelector('.tabs>button:nth-child(1)'),
    content: document.querySelector('article > .tabs + .content')
}

window.content_controller = content_controller;

// }catch(e){alert(e);} //mobile debug