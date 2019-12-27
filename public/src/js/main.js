import './modules/content.js';
import './modules/elements/modalwin.js';

// try{ //mobile debug
let last_tab = 0,
      current_tab = 0;

const content_title = document.querySelector('article>.title');
const modal_win = document.querySelector('modal-win');

document.querySelector('nav').addEventListener('click', (e)=>{
    if(e.target.tagName == "NAV" || e.target.id == "close_menu")return;
    switch (e.target.dataset.action) {
        case "Page": 
        return content_controller.open('page', 'any-page');
        case "Groups":
        case "Messages":
        case "Contacts":
        case "Notifications":
        case "Media":
        case "Settings":
        modal_win.open(e.target.dataset.action);
    }
})

document.querySelector('article>.tabs').addEventListener('click', e => {
    if(e.target.classList.contains('tabs'))return;
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

const article = document.querySelector('article');

// const openMenu = () => {
//     document.documentElement.classList.add('open-menu');
//     setTimeout(()=>article.addEventListener('click', closeMenu),1)
// };

// const closeMenu = ()=>{
//     if(!document.documentElement.classList.contains('open-menu'))return;
//     document.documentElement.classList.remove('open-menu');
//     article.removeEventListener('click', closeMenu);
// }

// open_menu.addEventListener('click', openMenu);

// close_menu.addEventListener('click', closeMenu);

// }catch(e){alert(e);} //mobile debug