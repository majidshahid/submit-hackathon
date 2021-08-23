var showitem=document.getElementById('showitem');


firebase.database().ref("item").on('child_added',(data)=>{
    console.log(data.val().image)
    var showitem=document.getElementById('showitem');
    showitem.innerHTML +=`
    <div class="card" style="width: 18rem; float:left ; margin:4px">
    <h5 class="card-title">HOTLE NAME:${data.val().hotlename}</h5>
        <img src="${data.val().image}" class="card-img-top" alt="..." width="300px" height="150px">
        <div class="card-body">
          <h5 class="card-title">Category:${data.val().category}</h5>
          <h5 class="card-text">NAME :${data.val().name}</h5>
          <h2 class="card-text"> price :${data.val().price}</h2>
   
          <a href="#" class="btn btn-primary" onclick="addtocard('${data.key}')">Order Now</a>
        </div>
      </div>
 
  
  `
})

function addtocard(a){
    console.log(a)
   firebase.database().ref(`item/${a}`).once('value',(data)=>{
       console.log(data.val())
       firebase.database().ref('orderitem').push(data.val())
   })
//    firebase.database().ref('orderitem').push('')
}
