import './modules/resizer.js';
import './modules/content.js';

// try{ //mobile debug

document.querySelector('nav').addEventListener('click', (e)=>{
    if(e.target.tagName == "NAV" || e.target.id == "close_menu")return;
    switch (e.target.classList[0]) {
        case "page": return content_controller.open('page', 'any-page');
    }
})

document.querySelector('article>.tabs').addEventListener('click', e => {
    document.documentElement.style.setProperty('--selected-tab', [].indexOf.call(e.target.parentElement.children, e.target));
})

document.oncontextmenu = () => false;

document.querySelector('article>.tabs').addEventListener('contextmenu', e => {
    content_controller.close([].indexOf.call(e.target.parentElement.children, e.target));
}, false)

// }catch(e){alert(e);} //mobile debug