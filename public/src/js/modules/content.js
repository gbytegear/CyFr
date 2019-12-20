try {

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
        this.contents.appendChilxd(content);
        
        this.push({tab, content});
    }
    
    change(index, name, type = null) {
        
    }
    
    close(){}
}

window.content_controller = content_controller;

}catch(e){alert(e);}