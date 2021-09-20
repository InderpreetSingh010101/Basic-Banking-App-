
let params = (new URL(document.location)).searchParams;
let name = params.get("c");
console.log(name);
let inp1 = document.querySelector(".i1");
inp1.value = name ;

function loadData() {
console.log("Loaded");
fetch("http://localhost:3000/getpost/"+ name)
.then(result => result.json())
.then(json=>show(json))
 }  

let amount1 , amount2 ;
let id1 , id2 ;
 function show(users){
   // console.log(users[0].name);
      amount1 = users[0].amount ;
      id1 = users[0].uid ;
   let nmbox1 = document.querySelector(".namebox1");
   let ebox1 = document.querySelector(".emailbox1");
   nmbox1.innerHTML = users[0].name;
   ebox1.innerHTML = users[0].email;


 }

window.onload = loadData ;

let inp2 = document.querySelector(".i2");
 inp2.addEventListener("keypress",function (e) {
        if (e.key === 'Enter') {
          let data2 ;
          fetch("http://localhost:3000/getpost/"+ inp2.value)
              .then(result => result.json())
                .then(json=>show2(json))
                
                function show2(usr){
               //  console.log(usr[0].name);
               amount2 = usr[0].amount ;
               id2 = usr[0].uid ;
               let nmbox2 = document.querySelector(".namebox2");
                let ebox2 = document.querySelector(".emailbox2");
                 nmbox2.innerHTML = usr[0].name;
                    ebox2.innerHTML = usr[0].email;
                }
        }
});










let amt = document.querySelector(".amti");
let btn = document.querySelector(".amtbtn");

let data2 ;

btn.addEventListener("click",function (e) {
    
        data2 = amt.value ;
      // console.log(data2);
     if(amt.value == "" ||amt.value <= 0 ){
         alert("Enter The Amount First");
     }else if(inp2.value == ""){
         alert("Enter The Amount No for Transfer");
        //  console.log(amount1 , amount2) ;
     }else if(amount1 < data2){
        alert("Not Enought Balance In The Account");
         
     }else{
         amount1 = parseInt(amount1) - parseInt(data2) ;
         amount2 = parseInt(amount2) + parseInt(data2) ;

            // Date & Time
              var currentdate = new Date(); 
              var datetime =  currentdate.getDate() + "-"
              + (currentdate.getMonth()+1)  + "-" 
              + currentdate.getFullYear() + "  "  
              + currentdate.getHours() + "."  
              + currentdate.getMinutes() + "." 
              + currentdate.getSeconds();



         //console.log(amount1 , amount2);
         fetch("http://localhost:3000/transection/"+ id1 + "/"+amount1)
        .then( fetch("http://localhost:3000/transection/"+ id2 + "/"+amount2)
                 .then( fetch("http://localhost:3000/addhists/"+ id1 + "/"+ id2 +"/"+ data2 + "/" +  datetime ))
                 )

         alert("Transection Has been sucessfull");
         location.replace("/sparksP(Banking%20app)/hists.html");
     }
            
    
    });

    