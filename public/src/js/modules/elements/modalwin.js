class ModalWin extends HTMLElement {
    header = document.createElement('h1')
    content = document.createElement('div')
    content_list = new Object
    
    constructor() {
        super();
    }
    
    registerContent(name, html) {
        content_list[name] = html;
    }
    
    open(name){
        document.documentElement.classList.add('modal-open');
        this.content.innerHtml = content_list[name];
    }
    
    close() {
        document.documentElement.classList.remove('modal-open');
    }

    connectedCallback() {
        this.style.display = 'block';
        this.appendChild(header);
        this.appendChild(content);
        content.classList.add('content');
    }
}

customElements.define('modal-win', ModalWin);