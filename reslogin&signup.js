function signinRes() {
  var name1 = document.getElementById("name");
  var city1 = document.getElementById("city");
  var email1 = document.getElementById("email");
  var password1 = document.getElementById("password");
  var country1 = document.getElementById("country");

  var data = {
    name: name1.value,
    city: city1.value,
    email: email1.value,
    password: password1.value,
    country: country1.value,
  };
  console.log(data);
  // firebase.database().ref('restaurant').push(data)
  firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then((res) => {
     
        var msg = document.getElementById("error");
        msg.style.display = "block";
        msg.innerHTML = "successfully SIGNUP";
        console.log(res.user.uid);
        localStorage.setItem("uid", res.user.uid);
        firebase.database().ref(`restaurant/${res.user.uid}`).set(data).then((res)=>{
          window.location = "dashboad/dashboad.html"
         })
      
    
      // var msg = document.getElementById("error");
      // msg.style.display = "block";
      // msg.innerHTML = "successfully SIGNUP";
      // console.log(res.user.uid);
      // localStorage.setItem("uid", res.user.uid);
      // window.location = "dashboad/dashboad.html";
    })
    .catch((error) => {
      var errorMessage = error.message;
      var msg = document.getElementById("error");
      msg.style.display = "block";
      msg.innerHTML = errorMessage;
      console.log(errorMessage);
      // ..
    });
}



var login = () => {
  var email = document.getElementById("emailLogin");
  var password = document.getElementById("passwordLogin");
  firebase.auth().signInWithEmailAndPassword(email.value, password.value).then((res) => {
    

      firebase.database().ref(`restaurant/${res.user.uid}`).once("value",((data)=>{
console.log(data.val().email)
      }))



 
      
      localStorage.setItem("uid", res.user.uid);
      
      var msg = document.getElementById("error1");
      msg.style.display = "block";
      msg.innerHTML = "successfully Login";
      window.location = "dashboad/dashboad.html";
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      var msg = document.getElementById("error1");
      msg.style.display = "block";
      msg.innerHTML = error.message;
    });
};
