const ImageController = class extends HTMLElement {
    base64 = null;

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
}

customElements.define('image-ctrlr', ImageController);

jscss.add("section image-ctrlr", {
    display: "block",
    background_size: "cover",
    background_position: "center",
    background_color : new Color(0, 0, 0),
    width: "500px",
    height: "500px",
    margin: "auto",
    border_radius: "10px",
});

jscss.add("section image-ctrlr", {
    width: "100%",
    height: "500px",
    margin: "0"
}, "screen and (max-width: 690px)");







const SvgLoader = class SvgLoad extends SVGSVGElement {
    constructor() {
        super();
    }

    static get observedAttributes() {return ['src']}


}

customElements.define('svg-loader', SvgLoader);
