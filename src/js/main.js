const switchClass = (element, _class) => 
    (element.classList.contains(_class))
    ?element.classList.remove(_class)
    :element.classList.add(_class);





document.querySelector('nav>button[data-act="menu"]').addEventListener('click', ()=>switchClass(document.body, "header-open"));
document.querySelector('.top-menu>button[data-act="menu"]').addEventListener('click', ()=>switchClass(document.body, "header-open"))
document.querySelector('.tool-menu>button[data-act="tool-menu"]').addEventListener('click', ()=>switchClass(document.body, "footer-open"))
document.querySelector('.add-button').addEventListener('click', ()=>switchClass(document.body, "editor-open"))