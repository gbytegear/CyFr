class ModalWin extends HTMLElement {
    header = document.createElement('h1');
    content = document.createElement('div');
    close_button = document.createElement('button');
    static content_list = new Object;
    close_callback = null;

    constructor() {
        super();
        this.close_button.addEventListener('click', ()=>this.close());
    }

    static registerContent(name, html, open_callback, close_callback) {
        ModalWin.content_list[name] = {
          html,
          open_callback : open_callback ? open_callback : undefined,
          close_callback: close_callback ? close_callback : undefined
        };
    }

    open(name){
        document.documentElement.classList.add('modal-open');
        this.content.innerHTML = ModalWin.content_list[name].html;
        this.header.innerText = name;

        this.close_callback = ModalWin.content_list[name].open_callback;
        if(ModalWin.content_list[name].open_callback)ModalWin.content_list[name].open_callback(this.content);
    }

    close() {
        document.documentElement.classList.remove('modal-open');
        this.content.innerHTML = "";
        this.header.innerText = "";
        if(this.close_callback)this.close_callback(this.content);
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
