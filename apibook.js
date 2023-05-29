const main = document.querySelector(".main");
const total = document.querySelector(".total");
const inp = document.querySelector(" .inp-cont input")
let count = 0


window.addEventListener("load", async () => {
  const res = await fetch("https://api.itbook.store/1.0/new");
  const rest = await res.json();

  const data = rest.books.map((element,index) => {
      return `
      <div class = "container" >
      <a href="./about/about.html" class="image" id=${index} ><img src=${element.image} /></a>
      
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
         </div>
     </div>
     
          
           `;
           
    })
    .join(" ");
  main.innerHTML = data;

  // plus buttonu burada yarandigi ucun burada cagiririq ki html terefde gorusun html etiketini.
  const plus = document.querySelectorAll(".plus");
  const minus = document.querySelectorAll(".minus");
  const number = document.querySelectorAll(".number");
 
  // buttonlarimiz cox oldugu ucun for eache saliriq
 
  plus.forEach((item) => {
    const id = item.getAttribute("id");
    
    item.addEventListener("click", () => {
      // hansi kitaba click etdiyimizi bilmek ucun apiden gelen isban13 ile plus buttonun idsini ve number idsin qarsilasdiriq
      number.forEach((num) => {
        const numId = num.getAttribute("id");
        // totalin valuesini almaq ucun metod
        const totalValue = Number(total.innerHTML);
        // hansi kitaba click etdiyimi bilmek ucun butun kitablari mapliyib adsine gore tapmaq.
        rest.books.map((book) => {
          if (book.isbn13 == id && numId == book.isbn13) {
            //numberin deyerini almaq ucun deyisken yaradiriq
            const numValue = Number(num.innerHTML);
            // apiden gelen pricedeki $ isarresini silmek ucun slice metodundan isdifade ederek index nomresi 0 olan deyeri saymaraq diger deyerleri gosdermesi ucun metod
            const bookPrice = Number(book.price.slice(1));
            // plus iconuna click etdikde coun deyerini bir artirmaq ucun funksiya
            num.innerText = numValue + 1;
            // artirilmis number valusunu yeni deyerini almaq ucun funkisya
            const newNumValue = Number(num.innerHTML);
            // numberin yeni deyeri ile kitabin qiymetinin vurulmasi
            const multi = totalValue + bookPrice;
            // hesablanmis qiymetin totala yazdirilmasi
            total.innerHTML = multi;

          }
        });
      });

      //TOTAL
    });
  });

  //MINUS
  minus.forEach((item) => {
    const id = item.getAttribute("id");
    item.addEventListener("click", () => {
       number.forEach((num) => {
        const numId = num.getAttribute("id");
        console.log(numId)
        const totalValue = Number(total.innerHTML);
       
        rest.books.map((book) => {
          const numValue = Number(num.innerHTML);
          if (book.isbn13 == id && numId == book.isbn13 && numValue != 0 ) {
           
           
            const bookPrice = Number(book.price.slice(1));
            num.innerText = numValue - 1;
            
            const newNumValue = Number(num.innerHTML);
            const subst = totalValue - bookPrice;
           
            total.innerHTML = subst.toFixed(2);

          }
        });
      });

     
    });
  });

 
  // Next page

  const boxs = document.querySelectorAll(".image");

  boxs.forEach((movie) => {
    movie.addEventListener("click", () => {
      const id = movie.getAttribute("id");
      console.log(id)
      rest.books.map((item, index) => {
        if (id == index) {
          window.localStorage.setItem("movie", JSON.stringify(item));
        }
      });
      
    });
});


inp.addEventListener("input", (e) => { 
let inputValue = e.target.value;
let filter = rest.books.filter((items) => 
items.title.toLowerCase().includes(inputValue.toLowerCase()) );
let booksFilter = filter.map((item, index) => {
let title = item.title.substring(0, 14); 
return `<a href="../Apibook/About/about.html" class="box" id=${index}><h4>${item.title}</h4> <span>${item.price}</span><img src=${item.image} /></a>`; }).join();
 main.innerHTML = booksFilter; 
});
   



});
