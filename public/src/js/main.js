import './modules/resizer.js';
import './modules/content.js';

try{

document.querySelector('nav').addEventListener('click', (e)=>{
    if(e.target.tagName == "NAV" || e.target.id == "close_menu")return;
    switch (e.target.classList[0]) {
        case "page": return content_controller.open('page', 'any-page');
    }
})

}catch(e){alert(e);}