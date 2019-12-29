const GET = "GET";
const POST = "POST";

const serverRequest = (method = GET, path, response_type = 'text',
    data = {
        onloaded: (response, status, status_text) => console.log(response, `status:${status}`),
        body: ""
    }) => {
    let xhr = new XMLHttpRequest();
    xhr.open(method, path, true);
    xhr.responseType = response_type;
    
    xhr.onerror = () => console.error("XMLHttpReauest Error", {method, path, data});
    xhr.onload = () => {
        if(xhr.status != 200) return data.onloaded(null, xhr.status, xhr.statusText);
        return data.onloaded(xhr.response, xhr.status, xhr.statusText);
    }

    switch(method) {
        case "GET": return xhr.send();
        case "POST": return xhr.send([data.body]);
    }
}

const syncServerRequest = async (method = GET, path,
data = {
    body: ""
}) => {
    let xhr = new XMLHttpRequest();
    xhr.open(method, path, false);

    switch(method) {
        case "GET": xhr.send(null); break;
        case "POST": xhr.send([data.body]); break;
    }

    if(xhr.status === 200)
            return xhr.response;
        else
            return xhr.statusText;
}

window.serverIO = {GET, POST, serverRequest, syncServerRequest};