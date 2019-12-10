const ImageController = class extends HTMLElement {
    base64 = null;
    properties = new Object;

    constructor () {
        super();

        this.style = `background-image: var(--base64);`;

        let base64 = null;

        Object.defineProperties(this, {
            base64: {
                get: ()=> base64,
                set: _base64 => {
                    this.style.setProperty('--base64', `url(${_base64})`);
                    base64 = _base64;
                }
            }
        })
    }

    static get observedAttributes() {return ['src']}

    attributeChangedCallback(name, old_value, new_value) {
        switch (name) {
            case 'src':
                if(!new_value)return;
                let img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('CANVAS');
                    canvas.height = img.naturalHeight;
                    canvas.width = img.naturalWidth;
                    canvas.getContext('2d').drawImage(img, 0, 0);
                    this.base64 = canvas.toDataURL("image/webp");

                    this.setAttribute("width", img.naturalWidth);
                    this.setAttribute("height", img.naturalHeight);
                }
                img.setAttribute('crossorigin', 'anonymous');
                img.src = new_value;
                this.removeAttribute('src')
            break;
        }
    }

    getBlob(){
        const byte_string = atob(this.base64.replace("data:image/webp;base64,", "")),
            byte_array = new Uint8Array(byte_string.length);
        for (let i = 0; i < byte_string.length; i++)byte_array[i] = byte_string.charCodeAt(i);
        return new Blob([byte_array], {type :"image/webp"});
    }

    download() {
        let element = document.createElement('a'), blob = this.getBlob();
        element.download = "image.webp";
        element.href = URL.createObjectURL(blob);
        element.click();
    }

    connectedCallback() {
        this.innerHTML = "<button class='image-download' title='Download image'><svg-loader src='./src/img/decoration/download.svg'></svg-loader></button>";
        this.querySelector('.image-download').addEventListener('click', () => this.download());
    }
}

customElements.define('image-ctrlr', ImageController);




const SvgLoader = class SvgLoad extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {return ['src']}

    attributeChangedCallback(name, old_value, new_value) {
        switch(name) {
            case "src":
                if(!new_value)return;
                this.load(new_value);
                return this.removeAttribute('src');
        }
    }

    load(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();

        xhr.onreadystatechange = () => { 
            if (xhr.readyState != 4) return;

            if (xhr.status != 200)
                console.warn(xhr.status + ': ' + xhr.statusText);
                else 
                this.innerHTML = xhr.responseText;
            this.parentNode.replaceChild(this.childNodes[0], this);
        }
    }

}

customElements.define('svg-loader', SvgLoader);
