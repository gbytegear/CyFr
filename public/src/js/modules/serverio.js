const send = (json, callback = response => console.log(response)) => {
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

window.serverIO = {send};