const resizeNavigationBar = (e) => {
    if(e.clientX > document.documentElement.clientWidth - 100) 
        return document.documentElement.style
        .setProperty('--nav', `calc(100% - 16px)`);;
    document.documentElement.style
    .setProperty('--nav', `${e.clientX/(document.documentElement.clientWidth/100)}%`);
    document.documentElement.style
        .setProperty('--show-nav', `1`);
    if(e.clientX < 150){
        document.documentElement.style
        .setProperty('--nav', `0px`);
        document.documentElement.style
        .setProperty('--show-nav', `0`);
    }
}

const resizeNavigationBarTouch = (e) => {
    resizeNavigationBar({clientX: e.changedTouches[0].screenX, clientY: e.changedTouches[0].screenY});
}

resizer.addEventListener('mousedown',()=>{
    document.documentElement.addEventListener('mousemove', resizeNavigationBar);
});

resizer.addEventListener('touchstart',()=>{
    document.documentElement.addEventListener('touchmove', resizeNavigationBarTouch);
});

document.addEventListener('mouseup',()=>{
    document.documentElement.removeEventListener('mousemove', resizeNavigationBar);
});

resizer.addEventListener('touchend',()=>{
    document.documentElement.removeEventListener('touchmove', resizeNavigationBarTouch);
});


resizer.addEventListener('dblclick', ()=> {
    document.documentElement.style
    .setProperty('--nav', null);
    document.documentElement.style
    .setProperty('--show-nav', null);
});