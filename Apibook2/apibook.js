const main = document.querySelector(".main");

let count = 1;
let min = 1;
total = 0



window.addEventListener("load", async () => {
  const res = await fetch("https://api.itbook.store/1.0/new");
  const rest = await res.json();

  const data = rest.books.map((element) => {
      return `
                
           <div class = "container">
           <img src=${element.image} />
            <div class = "text">
                <h4>${element.title.substring(0, 14)}...</h4>
                <span>${element.price}</span>
              </div>
              <div class="price">
                  <div class="count" >
                  <div class="icon1">
                    <button class="minus" id=${element.isbn13}>-</button>
                  </div>
                    <div class="num">
                      <span class="number" id=${element.isbn13}>${count}</span>
                    </div>
                    <div class="icon2">
                    <button class="plus" id=${element.isbn13}>+</button>
                    </div>
                    </div>
                    <div class="m-total">
                    <span class="total" id=${element.isbn13}>0</span>
                  </div>
              </div>
          </div>
           `;
    })
    .join(" ");
  main.innerHTML = data;

  // plus buttonu burada yarandigi ucun burada cagiririq ki html terefde gorusun html etiketini.
  const plus = document.querySelectorAll(".plus");
  // buttonlarimiz cox oldugu ucun for eache saliriq
  plus.forEach((item) => {
    const id = item.getAttribute("id");
   
    item.addEventListener("click", () => {
      // hansi kitaba click etdiyimizi bilmek ucun apiden gelen isban13 ile plus buttonun idsini qarsilasdiriq
      rest.books.map((book) => {
        if (book.isbn13 == id) {
          console.log(book);

              count++
              console.log(count)
        
              const number = document.querySelector(".number");
               number.innerText = count
             
        
             if(count == min){
               minus.disabled = true
              } else{
               minus.disabled = false
                
              } 
        }
       
});

  //TOTAL
    });
  });
const minus = document.querySelectorAll(".minus");

  minus.forEach((item2) => {
    const id = item2.getAttribute("id");
    item2.addEventListener("click", () => {
  
      rest.books.map((book) => {
        if (book.isbn13 == id) {
          console.log(book);

          const number = document.querySelector(".number");

          if(count>min){
            count--
            console.log(count)
           number.innerText = count
        }
           
         if(count== min){
           minus.disabled = true
         
            
          } else{
           minus.disabled = false
           
          } 
        }
      });


    })
  })
  


  
});








  

 
 
    


  


