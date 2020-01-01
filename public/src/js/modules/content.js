const content_controller = new class extends Array {
    constructor(){
        super();
        this.tabs = document.querySelector('article>.tabs');
        this.contents = document.querySelector('article>.content-wrapper');
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
        this.splice(index, 1);
    }
    
    getContent () {
        const xhr = new XmlHttpRequest();
    }
}

//FIX THIS FUCKING SHIT: CRUTCH FOR TESTING!!!
content_controller[0] = {
    tab: document.querySelector('.tabs>button:nth-child(1)'),
    content: document.querySelector('.content-wrapper > .content:first-child')
}
//END OF CRUTCH

window.content_controller = content_controller;