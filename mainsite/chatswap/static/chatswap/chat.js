const socket = new WebSocket("ws://" + window.location.host);

//Defines what should happen after a message is receive by the websocket by taking the recieved data, creating new DOM objects,
//and filling them with the data.
socket.onmessage = function(e) {
    let data = JSON.parse(e.data);
    console.log(data);

    chatDiv = document.createElement("div");
    chatDiv.classList.add("individualChat");
    messageSpan = document.createElement("span");
    userSpan = document.createElement("span");
    userSpan.classList.add("individualChatUser");

    let username = data.username;
    text = document.createTextNode(data.message);
    user = document.createTextNode(username + ": ");

    messageSpan.appendChild(text);
    userSpan.appendChild(user);
    chatDiv.appendChild(userSpan)
    chatDiv.appendChild(messageSpan)
    document.getElementById("incoming_chats").appendChild(chatDiv);
};

socket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly');
};

//Defines how to send a message from the client to the websocket server by taking the values from the input, and packaging it
//in the socket.send() method as a JSON dictionary.
async function send() {
    let username = await retrieveUsername();
    let messageInput = document.getElementById("chat_input");
    message = messageInput.value;
    socket.send(JSON.stringify({"message" : message, "username": username}));
    messageInput.value = "";
}

document.getElementById("chat_button").onclick = function(e) {
    send();
};
document.getElementById("chat_input").addEventListener("keydown", function(e) {
    if (e.key == "Enter") {
        send();
    }
})

async function retrieveUsername() {
    return window.getUsername();
}