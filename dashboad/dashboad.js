var a =localStorage.getItem("uid");
console.log(a)
firebase.database().ref(`restaurant/${localStorage.getItem("uid")}`).once("value",((data)=>{
    console.log(data.val())
    var resname= document.getElementById("resname");
    var city=document.getElementById("city");
var country=document.getElementById("country");
    resname.innerHTML=data.val().name;
    city.innerHTML=data.val().city;
    country.innerHTML=data.val().country;
          }))
          


let additem =async()=>{
  var added=document.getElementById("added");
  added.innerText='wait'
    var type=document.getElementById('type');
    var img=document.getElementById('image');
    var prc= document.getElementById('prc');
  var name=document.getElementById("nam")
  var resname= document.getElementById("resname");

   
      let b = await  pic( img.files[0]);
      var fooditem={
        category:type.value,
        image:await  pic( img.files[0]),
        price:prc.value,
        name:name.value,
        hotlename:resname.innerHTML
      
    }
  


  

    firebase.database().ref("item").push(fooditem).then((success)=>{
      var msg= document.getElementById('one');
      msg.style.display = "block";
      msg.innerHTML = "successfully update item";
      var added=document.getElementById("added");
      added.innerText='Add Item'
      
    })
    type.value="";
    img.value="";
    prc.vaue="";
   
}

firebase.database().ref('item').on('child_added',(data)=>{
  var divitem = document.getElementById('first');
  divitem.innerHTML +=`
  <div class="card" style="width: 18rem;">
  <img src="${data.val().image}" class="card-img-top" alt="...">
  <div class="card-body">
  <h5 class="card-title">Name :${data.val().name}</h5>
    <h5 class="card-title"> price: ${data.val().price}</h5>
   
    <p class="card-text"> Category:${data.val().category}</p>
  
  </div>
</div>`
})
  // <a href="#" class="btn btn-primary">Go somewhere</a>
let pic =(image)=>{
    return new Promise((resolve,reject)=>{
  
  
     var upload= firebase.storage().ref(`myfile/${image.name}`).put(image);
    upload.on('state_changed', 
    (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: 
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: 
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
     reject(error)
    }, 
    () => {
      
    upload.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
    resolve(downloadURL)
      });
    }
  );
  })
  
  }
function goto(){
  window.location='../userinterface/userinterface.html'
}