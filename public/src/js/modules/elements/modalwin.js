class ModalWin extends HTMLElement {
    header = document.createElement('h1')
    content = document.createElement('div')
    close_button = document.createElement('button');
    static content_list = new Object

    constructor() {
        super();
        this.close_button.addEventListener('click', ()=>this.close());
    }

    static registerContent(name, html) {
        ModalWin.content_list[name] = html;
    }

    open(name){
        document.documentElement.classList.add('modal-open');
        this.content.innerHTML = ModalWin.content_list[name];
        this.header.innerText = name;
    }

    close() {
        document.documentElement.classList.remove('modal-open');
        this.content.innerHTML = "";
        this.header.innerText = "";
    }

    connectedCallback() {
        this.style.display = 'block';
        this.appendChild(this.header);
        this.appendChild(this.content);
        this.appendChild(this.close_button);
        this.content.classList.add('content');
        this.close_button.classList.add('close');
    }
}

customElements.define('modal-win', ModalWin);

window.ModalWin = ModalWin;
