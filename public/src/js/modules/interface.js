let last_tab = 0,
    current_tab = 0;

const switchClass = (element, _class) => 
    element.classList.contains(_class)
    ?element.classList.remove(_class)
    :element.classList.add(_class);

//Queries
const content_title = document.querySelector('article>.title');
const modal_win = document.querySelector('modal-win');
const article = document.querySelector('article');
const user_info = document.querySelector('.user-info');
const user_info_tabs = user_info.querySelector('.tabs');
const user_info_tabs_content = user_info.querySelector('.tab-wrapper');

document.querySelector('nav').addEventListener('click', (e)=>{
    if(e.target.tagName == "NAV" || e.target.id == "close_menu")return;
    switch (e.target.dataset.action) {
        case "Page": 
        return content_controller.open('page', 'any-page');
        case "Groups":
        case "Messages":
        case "Contacts":
        case "Notifications":
        case "Files":
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
}, false);

close_menu.addEventListener('click', ()=>switchClass(document.documentElement, 'closed-menu'))

user_info.querySelector('.avatar').addEventListener('click', () => switchClass(document.documentElement, 'opened-user-info'));


user_info_tabs.addEventListener('click', e => {
    if(e.target.classList.contains('tabs'))return;
    let index = [].indexOf.call(e.target.parentElement.children, e.target);
    user_info_tabs_content.style.setProperty('--selected-tab', index);
});

login_button.addEventListener('click', e => {
    let fields = e.target.parentElement.querySelectorAll('input[type="text"], input[type="password"]'),
        pack = {lgn: fields[0].value, pswd: fields[1].value};
    console.log(pack);
    //validation
    //asynchronous encrypting with server-key
    //websocket-sending
});

register_button.addEventListener('click', e => {
    let fields = e.target.parentElement.querySelectorAll('input[type="text"], input[type="password"]'),
        pack = {lgn: fields[0].value, pswd: fields[1].value};
    console.log(pack);
    //validation
    //asynchronous encrypting with server-key
    //websocket-sending
});