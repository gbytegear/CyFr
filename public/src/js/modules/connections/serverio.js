const sendPost = (json, callback = response => console.log(response)) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", './', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    xhr.onreadystatechange = () => {
        if (xhr.readyState != 4) return;

        if (xhr.status != 200) {
            console.error(xhr.status + ': ' + xhr.statusText);
        }else callback(JSON.parse(xhr.response));
    }

    xhr.send(JSON.stringify(json));
};


//WebSocket
const ws_event_callbacks = new Object;

const wsocket = new WebSocket(`ws://${location.host}`);

const wsOn = (action, callback) => {
  ws_event_callbacks[action] = callback;
}

wsocket.onmessage = e => {
  const data = JSON.parse(e.data);
  const action = data.action;
  delete data.action;
  ws_event_callbacks[action](data, wsocket);
}

const wsSend = (action, data) => {
  data["action"] = action;
  wsocket.send(JSON.stringify(data));
}

// wsocket.onmessage = event => console.log(event);

window.serverIO = {sendPost, wsOn, wsSend};
