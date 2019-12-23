import './modules/resizer.js';
import './modules/content.js';

// try{ //mobile debug
let last_tab = 0,
      current_tab = 0;

const content_title = document.querySelector('article>.title');

document.querySelector('nav').addEventListener('click', (e)=>{
    if(e.target.tagName == "NAV" || e.target.id == "close_menu")return;
    switch (e.target.classList[0]) {
        case "page": return content_controller.open('page', 'any-page');
    }
})

document.querySelector('article>.tabs').addEventListener('click', e => {
    let index = [].indexOf.call(e.target.parentElement.children, e.target);
    if(current_tab == index) return;
    document.documentElement.style.setProperty('--selected-tab', index);
    content_title.innerText = e.target.innerText;
    last_tab = current_tab;
    current_tab = index;
})

document.oncontextmenu = () => false;

document.querySelector('article>.tabs').addEventListener('dblclick', e => {
    content_controller.close([].indexOf.call(e.target.parentElement.children, e.target));
    document.documentElement.style.setProperty('--selected-tab', last_tab);
    current_tab = last_tab;
    if(last_tab > 0)last_tab--;
    //TODO: add logic of delete current tab!!!
}, false)

// }catch(e){alert(e);} //mobile debug