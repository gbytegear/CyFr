const FileDownload = class FileDownload extends HTMLElement {
    link = document.createElement('a')

    constructor() {
        super();
        this.addEventListener('click', ()=>this.link.click());
    }

    static get observedAttributes() {return ['src']}

    attributeChangedCallback(name, old_value, new_value) {
        switch (name) {
            case 'src':
                    if(!new_value)return;
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', new_value, true);
                    xhr.responseType = "blob";
                    xhr.send();

                    xhr.onreadystatechange = () => { 
                        if (xhr.readyState != 4) return;

                        if (xhr.status != 200)
                            console.warn(xhr.status + ': ' + xhr.statusText);
                            else {
                                let blob = xhr.response;
                                this.setAttribute("mime-type", blob.type);
                                this.setAttribute("size", `${Math.ceil((blob.size / 1048576)*100)/100}MB`);
                                this.link.href = URL.createObjectURL(blob);
                            }
                    }
                    this.removeAttribute('src');
            return;
        }
    }

    init(){
        let innerSVG = document.createElement('svg-loader');
        this.appendChild(innerSVG);
        innerSVG.setAttribute('src', './src/img/decoration/download.svg');
    }

    connectedCallback() {
        if(this.init){
            this.init();
            this.init = undefined;
        }
    }
}

customElements.define('file-downloader', FileDownload);