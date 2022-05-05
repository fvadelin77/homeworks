const databaseUrl = "https://chatbox-752d6-default-rtdb.europe-west1.firebasedatabase.app/"

let userName = null;
let template = `
<div class="chat-bubble ${data.userName === userName?"self":"other"}">
  <div class="username">${data.userName}</div>
  <div class="message">${data.chatMessage}</div>
  <div class="time">${data.date}</div>
</div>
`

function startChat() {
  let name = document.querySelector('[name="name"]').value;
  name = name.trim();
  if(name.length < 3) {
    document.querySelector('[name="name"]').classList.add('error');
  } else{
      
  }
}

function addMessage(){
  let chatMessage = document.querySelector("[name='chatMessage']").value;
  chatMessage = chatMessage.trim();

  let response = await fetch(
    databaseUrl + ".json", {
      method: "POST",
      body: JSON.stringify(
        userName = userName,
        message = message,
        date = new Date(),
  )}
  
  )};

  // let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
  // let minutes = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
  // let time = hour + ":" + minutes


  // dayjs(data.date).format('HH:MM')