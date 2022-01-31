//m
let chat = document.getElementById("chat")
var firebaseConfig = {
  apiKey: "AIzaSyBJo9UUWci-GCRkZ5U800FeOfBV6OiN3vE",
  authDomain: "wery-chat-app.firebaseapp.com",
  projectId: "wery-chat-app",
  storageBucket: "wery-chat-app.appspot.com",
  messagingSenderId: "608607459353",
  appId: "1:608607459353:web:80ae292699be3a1b8a7288",
  measurementId: "G-6M8EQW4BFY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
let Name;
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log(user)
    Name = "Lala";
  }
}); // Vanila javascript 
firebase.database().ref("Message").on("child_added", function (snap) {

  if ((snap.val().name == Name) && snap.val().message != "") {
    // console.log(`${snap.val().name} : ${snap.val().message}`)
    addingchat("me", `${snap.val().message}`, `${snap.val().name}`, snap.val().Time);
  }
  else {
    addingchat("you", snap.val().message, snap.val().name, snap.val().Time);
  }

});


let Submit = document.querySelector(".Submit");
Submit.addEventListener("click", (e) => {
  e.preventDefault();
  let text = document.querySelector(".Text")
  //   let newmessage = new messageref;
  let t = new Date;
  let time = `${t.getHours()}:${t.getMinutes()}`
  console.log(time)
  firebase.database().ref("Message").push({
    name: Name, 
    message: text.value,
    Time: time,
  });

  text.value = "";

  //  let x = document.createElement("span");
  //  x.innerHTML = message;

})
var mainApp = {};
(function () {
  var mainContainer = document.getElementById("main_container");

  var logtout = function () {
    firebase.auth().signOut().then(function () {
      console.log('success');
      window.location.replace("login.html");
    }, function () { })
  }

  var init = function () {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        console.log("stay");
        mainContainer.style.display = "";
      } else {
        // No user is signed in.
        mainContainer.style.display = "none";
        console.log("redirect");
        window.location.replace("login.html");
      }
    });
  }

  init();

  mainApp.logout = logtout;
})();
function addingchat(meoryou, Message, Name, time) {
  console.log(message);
  var x = document.createElement("li");
  x.classList.add(`${meoryou}`);
  var ent = document.createElement("div");
  ent.classList.add("entet");
  var h2 = document.createElement("h2");
  h2.innerHTML = `${time} / ${Name}`;
  var tri = document.createElement("div");
  tri.classList.add("triangle");
  var message = document.createElement("div");
  message.classList.add("message");
  ent.append(h2);
  x.append(ent, tri, message);
  message.innerHTML = Message;
  chat.appendChild(x);
  chat.scrollTop = chat.scrollHeight;

}