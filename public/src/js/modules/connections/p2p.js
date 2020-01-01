window.p2p = new class P2PController extends Array {
    static stun_server_URLs = [ {url: `stun://${location.hostname}:36471`} ];
    static connection = new RTCPeerConnection({iceServers: P2PController.stun_server_URLs});
    constructor() {
        super();
        // connection.onDataChannel = this.onDataChannel;
        // connection.icecandidate = this.onDataChannel;
        // connection.onDataChannel = this.onDataChannel;
    }

    onIceCandidate() {
        debugger;
    }

    onIceConnectionStateChanged() {
        debugger;
    }

    onDataChannel() {
        debugger;
    }

};


// LINKS:
//https://habr.com/ru/company/badoo/blog/315812/
//https://github.com/webrtc/samples/blob/gh-pages/src/content/datachannel/basic/js/main.js