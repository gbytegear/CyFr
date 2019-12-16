const block_types = [
    {name: "Haeder 1", tag: "h1", editor:'input', editor_attrs:{type: 'text'}},
    {name: "Haeder 2", tag: "h2", editor:'input', editor_attrs:{type: 'text'}},
    {name: "Haeder 3", tag: "h3", editor:'input', editor_attrs:{type: 'text'}},
    {name: "Paragraph left", tag: "p", editor:'textarea', subtype:"left"},
    {name: "Paragraph center", tag: "p", editor:'textarea', subtype:"center"},
    {name: "Paragraph right", tag: "p", editor:'textarea', subtype:"right"},
    {name: "Paragraph justify", tag: "p", editor:'textarea', subtype:"justify"}
];

const PostEditor = class PostEditor extends HTMLElement {
    constructor () {
        super();

    }

    init() {
        const block_wrapper = document.createElement('div'),
            add_block = document.createElement('div');
        
        block_wrapper.className = "blocks";
        add_block.className = "block-types";

        block_types.forEach(type => {
            const button = document.createElement('button');
            button.innerHTML = type.name;
            add_block.appendChild(button);
            button.editor_type = type.editor;
            button.tag = type.tag;
            if(type.subtype)
                button.subtype = type.subtype;
            if(type.editor_attrs)
                button.editor_attrs = JSON.stringify(type.editor_attrs);
        });

        add_block.addEventListener('click', e => {
            const editor = document.createElement(e.target.editor_type),
            wrapper = document.createElement('div'),
            deleteElement = document.createElement('button'),
            up = document.createElement('button'),
            down = document.createElement('button');

            deleteElement.innerHTML = "<svg-loader src='./src/img/decoration/close.svg'></svg-loader>";
            up.innerHTML = "<svg-loader src='./src/img/decoration/up-arrow.svg'></svg-loader>";
            down.innerHTML = "<svg-loader src='./src/img/decoration/down-arrow.svg'></svg-loader>";

            // wrapper.style.display = "contents";
            wrapper.appendChild(editor);
            wrapper.appendChild(up);
            wrapper.appendChild(deleteElement);
            wrapper.appendChild(down);

            up.addEventListener('click',() => {
                wrapper.parentNode.insertBefore(wrapper, wrapper.previousSibling);
            });
            down.addEventListener('click',() => {
                wrapper.parentNode.insertBefore(wrapper.nextSibling, wrapper);
            })
            deleteElement.addEventListener('click',() => {wrapper.remove();})

            editor.dataset.tag = e.target.tag;
            if(e.target.subtype)
                editor.dataset.subtype = e.target.subtype;
            if(e.target.editor_attrs){
                const editor_attrs = JSON.parse(e.target.editor_attrs);
                for(let attr in editor_attrs) {
                    editor.setAttribute(attr, editor_attrs[attr]);
                }
            }
            block_wrapper.appendChild(wrapper);
        });

        this.appendChild(block_wrapper);
        this.appendChild(add_block);

        this.init = undefined;
    }

    connectedCallback() {
        if(this.init)this.init();
    }
};

customElements.define('post-editor', PostEditor);