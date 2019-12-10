const switchClass = (element, _class, onCallback = ()=>null, offCallback = ()=>null) => 
    (element.classList.contains(_class))
    ?(element.classList.remove(_class), offCallback())
    :(element.classList.add(_class), onCallback());




//Events
open_menu_button.addEventListener('click', ()=>switchClass(document.body, "header-open"));
close_menu_button.addEventListener('click', ()=>switchClass(document.body, "header-open"));
open_tool_menu_button.addEventListener('click', ()=>switchClass(document.body, "footer-open"));
close_tool_menu_button.addEventListener('click', ()=>switchClass(document.body, "footer-open"));
open_editor_button.addEventListener('click', ()=>switchClass(document.body, "editor-open"));
zen_mode_switch.addEventListener('click', ()=>switchClass(document.body, "zen-mode", 
()=>document.body.requestFullScreen(),
()=>document.body.cancelFullScreen()));

editor_add_block.addEventListener('click', ()=>switchClass(document.querySelector('.post-editor'), "block-types"));
