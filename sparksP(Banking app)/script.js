let  p  = document.querySelector(".header");
p.addEventListener("click" , function(e){
     console.log("clickk") ;
   e.currentTarget.innerText = "CHANGE";

});

function loadData() {
    console.log("Loaded");
    fetch("http://localhost:3000/getposts")
    .then(result => result.json())
    .then(json=>show(json))
}  

window.onload = loadData ;


function show(users){
    let table = document.getElementById('table');
    for(let i=0 ; i < users.length ; i++ ){
        let obj = users[i];
        console.log(obj);
        let row = document.createElement('tr');
        let uid = document.createElement('td');
        let name = document.createElement('td');
        let email = document.createElement('td');
        let amount = document.createElement('td');
        let button = document.createElement('td');


        uid.innerHTML = obj.uid;
        name.innerHTML = obj.name;
        email.innerHTML = obj.email;
        amount.innerHTML = obj.amount;
        //Button
       var btn = document.createElement('input');
       btn.type = "button";
       btn.className = "btn";
       btn.value = "Click Here For Transctions";
       btn.onclick = (function(e) {location.replace("transection.html?c="+obj.uid)});
    //    td.appendChild(btn);
       
                  // 

        row.appendChild(uid);
        row.appendChild(name);
        row.appendChild(email);
        row.appendChild(amount);
        row.appendChild(btn);

       

        table.appendChild(row);

       }




}