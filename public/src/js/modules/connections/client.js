const user_info_element = document.querySelector('.user-info');

const logined = () => {
  user_info_element.classList.remove('unlogined');
  user_info_element.querySelector('.nickname').innerText = client.nickname;
},
      unlogined = () => {
  user_info_element.classList.add('unlogined');
  user_info_element.querySelector('.nickname').innerText = "";
};

serverIO.wsOn('connect', data => {
  if(!uid)return serverIO.wsocket.send('{"action":"session","new":true}');
  serverIO.wsSend("session", {uid});
  // serverIO.wsocket.send(`{"action":"session","uid":"${uid}"}`);
});

serverIO.wsOn('setUID', data => {
  uid = data.uid;
  window.salt = data.salt;
  client = {logined: false};
});

serverIO.wsOn('setState', data => {
  if(data.salt) {
    window.salt = data.salt;
    delete data.salt;
  }
  client = data;
  if(client.logined)
    logined();
    else
    unlogined();
});

// serverIO.wsocket.onmessage = e => {
//   let data = JSON.parse(e.data);
//   if(data.action) switch(data.action) {
//     case "connect":
//       if(!uid)return serverIO.wsocket.send('{"action":"session","new":true}');
//       return serverIO.wsocket.send(`{"action":"session","uid":"${uid}"}`);
//     case "setUID":
//       uid = data.uid;
//       window.salt = data.salt;
//       return client = {logined: false};
//     case "setState":
//       delete data.action;
//       if(data.salt) {
//         window.salt = data.salt;
//         delete data.salt;
//       }
//       client = data;
//       if(client.logined)
//         logined();
//         else
//         unlogined();
//   }
// }

Object.defineProperties(window, {
  uid:{
    get: () => localStorage.getItem('uid'),
    set: uid => localStorage.setItem('uid', uid)
  },
  client: {
    get: () => JSON.parse(localStorage.getItem('client')),
    set: client => localStorage.setItem('client', JSON.stringify(client))
  }
});

// Interface functions
window.login = e => {
  let fields = e.target.parentElement.querySelectorAll('input[type="text"], input[type="password"]'),
      err_str = '',
      pack = {
        nickname: fields[0].value,
        pswdhash: keccak512(keccak512(fields[1].value) + salt),
        uid: localStorage.getItem('uid')
      };
  console.log(pack);
  //validation
  if(pack.nickname.length == 0) (fields[0].classList.add('err'), err_str += "Login isn't entered!\n");
  if(fields[1].value.length == 0)
    (fields[1].classList.add('err'), err_str += "Password isn't entered!\n");
    else if(fields[1].value.length < 8)
    (fields[1].classList.add('err'), err_str += "Password is too short!\n");
  if(err_str != '') {
    let info_str = e.target.parentElement.querySelector('.login-info-string');
    info_str.classList.add('err');
    info_str.innerText = err_str;
    return;
  }
  //websocket-sending
  serverIO.wsSend("login", pack);
}

window.register = e => {
  let fields = e.target.parentElement.querySelectorAll('input[type="text"], input[type="password"]'),
      err_str = '',
      pack = {
        nickname: fields[0].value,
        email: fields[1].value,
        pswdhash: keccak512(fields[2].value),
        uid: localStorage.getItem('uid')
      };
  console.log(pack);
  //validation
  if(pack.nickname.length == 0) (fields[0].classList.add('err'), err_str += "Login isn't entered!\n");
  if(fields[2].value.length == 0)
    (fields[2].classList.add('err'), err_str += "Password isn't entered!\n");
    else if(fields[2].value.length < 8)
    (fields[2].classList.add('err'), err_str += "Password is too short!\n");
  if(err_str != '') {
    let info_str = e.target.parentElement.querySelector('.login-info-string');
    info_str.classList.add('err');
    info_str.innerText = err_str;
    return;
  }
  //websocket-sending
  serverIO.wsSend("register", pack);
}

window.logout = () => {
  serverIO.wsSend("logout", {uid});
}
