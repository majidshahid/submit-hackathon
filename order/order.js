
firebase.database().ref('orderitem').on("child_added",(data)=>{
    console.log(data.val())
    var card=document.getElementById("one")
card .innerHTML+=`
<div class="card" style="width: 18rem; float:left ; margin:4px">
    <img src="${data.val().image}" class="card-img-top" alt="..." width="300px" height="150px">
    <div class="card-body">
      <h5 class="card-title">Category:${data.val().category}</h5>
      <h5 class="card-text">NAME :${data.val().name}</h5>
      <h2 class="card-text"> price :${data.val().price}</h2>
    </div>
  </div>


`
})