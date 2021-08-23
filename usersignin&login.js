function signinuser(){
    var name1 = document.getElementById("name");
    var city1= document.getElementById("city");
    var email1=document.getElementById("email");
    var password1 = document.getElementById("password");
    var country1 = document.getElementById("country");
    var phone1= document.getElementById("number");


    var data= {
        name:name1.value,
       city:city1.value,
        email:email1.value,
        password: password1.value,
        country:country1.value,
        phone:phone1.value,
    }
    console.log(data)
    // firebase.database().ref('restaurant').push(data)
    firebase.auth().createUserWithEmailAndPassword(email1.value, password1.value)
    .then((res) => {
      var msg=document.getElementById('error')
      msg.style.display='block'
        msg.innerHTML="successfully SIGNUP"
      firebase.database().ref(`user/${res.user.uid}`).set(data).then((response)=>{
window.location="userinterface/userinterface.html"
      })
     
    })

    // firebase.database().ref(`restaurant/${res.user.uid}`).set(data).then((res)=>{
    //   window.location = "dashboad/dashboad.html"
    //  })
  

    .catch((error) => {
    
      var errorMessage = error.message;
      var msg=document.getElementById('error')
    msg.style.display='block'
      msg.innerHTML=errorMessage
      console.log(errorMessage)
      // ..
    });
   
}




var login =()=>{
    var email=document.getElementById("emaillogin");
    var password=document.getElementById("passwordlogin");
    console.log(email.value)
    console.log(password.value)
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then((res) => {
      // Signed in
      // var user = userCredential.user;
      // console.log(res.user.uid)
      
      // ...
      window.location="userinterface/userinterface.html"
      console.log(res.user.uid)
    //   firebase.database().ref(`restaurant/${res.user.uid}`).once('value',(data)=>{
    //       console.log(data.val())
    //   })
    //   firebase.database().ref(`restaurant/${res.user.uid}`).once("value",(data)=>{
    //       console.log(data.val().name)
    //   })
      // firebase.database().ref(`student/${res.user.uid}`.once('value',(data)=>{
      //   console.log(data.value())
      // }
      // )
      // )
//       localStorage.setItem("uid",res.user.uid)
// window.location="profile.html"
var msg=document.getElementById('error1')
msg.style.display='block'
  msg.innerHTML="successfully Login"
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
      var msg=document.getElementById('error1')
msg.style.display='block'
  msg.innerHTML=error.message
    });
}