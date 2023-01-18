const socket = io();
let ii = 1;
var required_notification = 15;
// Elements
const messageInput = document.querySelector("input");
const sendButton = document.querySelector("button");

// Templates

socket.on("message", (message) => {
  console.log(message);
  new_msg(message);
});

function sendMsg() {
  message = messageInput.value;
  //   if (message != "")
  socket.emit("sendMessage", message, (error) => {
    if (error) {
      return console.log(error);
    }

    console.log("Message delivered!");
  });

  messageInput.value = "";
  messageInput.focus();
}

function new_msg(message) {
  (() => {
    var area = document.getElementById("message_area");
    let n = document.createElement("div");
    let message_id = "mes" + ii.toString();
    n.setAttribute("id", message_id);
    n.innerHTML = `<div class="message" >
        <img class="msg-icon" src="../res/app_icon.png" />
        <span>${message}</span>
      </div>`;
    area.appendChild(n);
    area.style.display = "block";

    if (ii > required_notification) {
      document
        .getElementById("mes" + (ii - required_notification).toString())
        .remove();
    }
  })();
  ii++;
}
