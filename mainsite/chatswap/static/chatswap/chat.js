const socket = new WebSocket("ws://" + window.location.host);

//Defines what should happen after a message or vote is received by the websocket by taking the recieved data, creating new DOM objects,
//and filling them with the data.
socket.onmessage = function(e) {
    let data = JSON.parse(e.data);

    //Creates all DOM elements needed for a chat, and appends it to a div which contains all elements
    if (data.type == "chat") {
        chatDiv = document.createElement("div");
        chatDiv.id = "chat_" + data.id;
        chatDiv.classList.add("individualChat");
        messageSpan = document.createElement("span");
        userSpan = document.createElement("span");
        userSpan.classList.add("individualChatUser");

        upVote = document.createElement("i");
        downVote = document.createElement("i");
        upVote.id = "upvote_" + data.id;
        downVote.id = "downvote_" + data.id;
        upVote.classList.add("fa-solid", "fa-caret-up", "voteButton");
        downVote.classList.add("fa-solid", "fa-caret-down", "voteButton");
        upVote.onclick = function(e) {
            send("vote", data.id, "up");
        }
        downVote.onclick = function(e) {
            send("vote", data.id, "down");
        }
        voteTally = document.createElement("span");
        voteTally.id = "tally_" + data.id;
    
        let username = data.username;
        text = document.createTextNode(data.message);
        user = document.createTextNode(username + ": ");
    
        messageSpan.appendChild(text);
        userSpan.appendChild(user);
        chatDiv.appendChild(userSpan);
        chatDiv.appendChild(messageSpan);
        chatDiv.appendChild(upVote);
        chatDiv.appendChild(downVote);
        chatDiv.appendChild(voteTally);
        document.getElementById("incoming_chats").appendChild(chatDiv);
    }
    //Increments or decrements a chat's voteTally span depending if an up vote or down vote is received by the socket.
    if (data.type == "vote") {
        if(data.vote == "up"){
            currentTally = parseInt(document.getElementById("tally_" + data.id).innerHTML);
            if (isNaN(currentTally)) currentTally = 0;
            currentTally++;
            document.getElementById("tally_" + data.id).innerHTML  = (currentTally).toString();
        }
        if(data.vote == "down"){
            currentTally = parseInt(document.getElementById("tally_" + data.id).innerHTML);
            if (isNaN(currentTally)) currentTally = 0;
            currentTally--;
            document.getElementById("tally_" + data.id).innerHTML  = (currentTally).toString();
        }
    }

};

socket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly');
};

//Defines how to send a message from the client to the websocket server by taking the values from the input, and packaging it
//in the socket.send() method as a JSON dictionary.
function send(type, id, vote) {
    if (type == "chat") {
        let username = window.globalUsername();
        let messageInput = document.getElementById("chat_input");
        message = messageInput.value;
        try {
            socket.send(JSON.stringify({"message" : message, "username": username}));
        } 
        catch (exception) {
            console.log(exception);
            return;
        }
        messageInput.value = "";
    }
    if (type == "vote"){
        try {
            socket.send(JSON.stringify({"id" : id, "vote": vote}));
            console.log("sending...")
        } 
        catch (exception) {
            console.log(exception);
            return;
        }
    }
}

document.getElementById("chat_button").onclick = function(e) {
    send("chat");
};
document.getElementById("chat_input").addEventListener("keydown", function(e) {
    if (e.key == "Enter") {
        send("chat");
    }
})