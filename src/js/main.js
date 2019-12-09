const switchClass = (element, _class) => 
    (element.classList.contains(_class))
    ?element.classList.remove(_class)
    :element.classList.add(_class);




//Events
open_menu_button.addEventListener('click', ()=>switchClass(document.body, "header-open"));
close_menu_button.addEventListener('click', ()=>switchClass(document.body, "header-open"));
open_tool_menu_button.addEventListener('click', ()=>switchClass(document.body, "footer-open"));
close_tool_menu_button.addEventListener('click', ()=>switchClass(document.body, "footer-open"));
open_editor_button.addEventListener('click', ()=>switchClass(document.body, "editor-open"));