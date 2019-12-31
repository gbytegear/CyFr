let reauth = ()=>{
    let uid = localStorage.getItem('uid');
    if(uid) serverIO.send({auth: uid}, response => {
        if(response.registered)localStorage.setItem('uid', response.uid);
    });
    else serverIO.send({register: null}, response => {
        localStorage.setItem('uid', response.uid);
    });
    return setTimeout(reauth, 5000);
};

reauth();