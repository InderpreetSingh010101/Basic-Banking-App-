let  p  = document.querySelector(".header");
p.addEventListener("click" , function(e){
     console.log("clickk") ;
   e.currentTarget.innerText = "CHANGE";

});

function loadData() {
    console.log("Loaded");
    fetch("http://localhost:3000/gethists")
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
        let acc1 = document.createElement('td');
        let acc2 = document.createElement('td');
        let amount = document.createElement('td');
        let date = document.createElement('td');
        //let button = document.createElement('td');


        acc1.innerHTML = obj.acc1;
        acc2.innerHTML = obj.acc2;
        amount.innerHTML = obj.amount;
        date.innerHTML = obj.date;
        //Button
    //    var btn = document.createElement('input');
    //    btn.type = "button";
    //    btn.className = "btn";
    //    btn.value = "Click Here For Transctions";
    //    btn.onclick = (function(e) {location.replace("transection.html?c="+obj.uid)});
    //    td.appendChild(btn);
       
                  // 

        row.appendChild(acc1);
        row.appendChild(acc2);
        row.appendChild(amount);
        row.appendChild(date);
        //row.appendChild(btn);

       

        table.appendChild(row);

       }




}