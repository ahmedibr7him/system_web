let title=document.getElementById("title");
let price_1=document.getElementById("price_1");
let price_2=document.getElementById("price_2");
let price_3=document.getElementById("price_3");
let total=document.getElementById("total");
let item_counte=document.getElementById("item_counte");
let category=document.getElementById("category");
let create=document.getElementById("create");

let search=document.getElementById("search");
let search_title=document.getElementById("search_title");
let search_categore=document.getElementById("search_category");

let mood="create";
let tmp;


// total price
function price(){
    if(price_1.value !=""){
        let t_p=(+price_1.value + +price_2.value)- +price_3.value;
        total.innerHTML=t_p
        total.style.background="green"
    }else{
        total.style.background="brown"
        total.innerHTML=""
    }
}


// on click create

let pro;
if(localStorage.product !=null){
    pro=JSON.parse(localStorage.product);
    
    

}else{
    pro=[]
    
}

create.onclick=function (){
    let new_create={
        title:title.value,
        price1:price_1.value,
        price2:price_2.value,
        price3:price_3.value,
        totall:total.innerHTML,
        item1_counte:item_counte.value ,
        item2_category:category.value,
       
      
        
    }
  if(mood==="create"){
       if(item_counte.value>1){
          
         
        pro.push(new_create)
        
   

    
          
        
      }else{
         pro.push(new_create)
      }
  }else{
    pro[tmp]=new_create;
    item_counte.style.display="block";
    mood="create"
    create.innerHTML="Create"
  }
   
    localStorage.setItem("product", JSON.stringify(pro))
    
    clear_data()
    show_prodect()
    
   
}
  


// clear data

function clear_data(){
    title.value="";
    price_1.value="";
    price_2.value="";
    price_3.value="";
    total.innerHTML="";
    item_counte.value="";
    category.value="";
    
}



// show product


function show_prodect(){
    
    price();

    let table="";
    for(let i=0;i<pro.length;i++){
      table +=`
        <tr>
                    <td>${[i]}</td>
                    <td>${pro[i].title}</td>
                    <td>${pro[i].price1}</td>
                    <td>${pro[i].price2}</td>
                    <td>${pro[i].price3}</td>
                    <td>${pro[i].totall}</td>
                    <td id="btcountfath"> <button onclick="bt1(${i})" id="btcount1">-</button>${pro[i].item1_counte} <button onclick="bt2(${i})" id="btcount2">+</button></td>
                    <td>${pro[i].item2_category}</td>
                    
                    <td><button onclick="update(${i})" id="update">update</button></td>
                    <td><button onclick="dellete(${i})" id="delete">delete</button></td>
                </tr>
      `
    
    
     
      
    }
    let tbody=document.getElementById("tbody").innerHTML=table;

 
let delete_all=document.getElementById("remove_all");
    if(pro.length > 0 ){
        delete_all.classList.remove("hide")
    }else {
     delete_all.classList.add("hide") 
    }


    delete_all.onclick=function (){
        localStorage.clear();
        pro.splice(0);
        show_prodect()
       
        
    }
}
show_prodect()
 


// delete

function dellete(i){
 pro.splice(i,1) 
 show_prodect()
 localStorage.product=JSON.stringify(pro)
}


// update
 function update(i){
    title.value=pro[0].title;
    price_1.value=pro[0].price1;
    price_2.value=pro[0].price2;
    price_3.value=pro[0].price3;
    category.value=pro[0].item2_category;
    total.innerHTML=pro[i].totall;
    item_counte.value=pro[i].item1_counte
   
    create.innerHTML="Update";
    item_counte.style.display="none";
     mood="update";
     tmp=i
    
    if(total.innerHTML !=""){
        total.style.background="green"
    }else{
        total.style.background="brown";
    }
   
 }


//  search
 let search_mood="title"
 function btsearch(id){
    let v=document.getElementById("search")
   
    if(id=="search_title"){
        search.focus();
        search_mood="title"
        v.placeholder="Search by Title";

    }else if(id=="search_category"){
        search.focus();
        search_mood="category"
        v.placeholder="Search by Category";
        
    }

 }


 function getsearch(value){
    let table="";
      if(search_mood="title"){
            for(let x=0;x<pro.length;x++){
             if(pro[x].title.includes(value)){
                  
                table +=`
        <tr>
                    <td>${[x]}</td>
                    <td>${pro[x].title}</td>
                    <td>${pro[x].price1}</td>
                    <td>${pro[x].price2}</td>
                    <td>${pro[x].price3}</td>
                    <td>${pro[x].totall}</td>
                    <td>${pro[x].item1_counte}</td>
                    <td>${pro[x].item2_category}</td>
                    
                    <td><button onclick="update(${x})" id="update">update</button></td>
                    <td><button onclick="dellete(${x})" id="delete">delete</button></td>
                </tr>
      `
    
             }
    }
      }else if(search_mood="category"){
                    for(let x=0;x<pro.length;x++){
             if(pro[x].item2_category.includes(value)){
                  
                table +=`
        <tr>
                    <td>${[x]}</td>
                    <td>${pro[x].title}</td>
                    <td>${pro[x].price1}</td>
                    <td>${pro[x].price2}</td>
                    <td>${pro[x].price3}</td>
                    <td>${pro[x].totall}</td>
                    <td>${pro[x].item1_counte}</td>
                    <td>${pro[x].item2_category}</td>
                    
                    <td><button onclick="update(${x})" id="update">update</button></td>
                    <td><button onclick="dellete(${x})" id="delete">delete</button></td>
                </tr>
      `
    
             }
    }
      }
       let tbody=document.getElementById("tbody").innerHTML=table;

 }











function bt1(i){
    if(pro[i].item1_counte>0)
    {
        pro[i].item1_counte-=1;
    }else if(pro[i].item1_counte=0){
          pro[i].item1_counte.remove()

    }
    
    
    show_prodect()
 localStorage.product=JSON.stringify(pro)
}

function bt2(i){
    if(pro[i].item1_counte>0)
    {
        pro[i].item1_counte++;
    }
    else if(pro[i].item1_counte=0){
          pro[i].item1_counte.remove();
    }
        show_prodect()
 localStorage.product=JSON.stringify(pro)
    }
    
    
    








