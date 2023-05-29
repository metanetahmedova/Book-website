const data = localStorage.getItem('movie')
console.log(data)
const obj = JSON.parse(data);

const main = document.querySelector(".main");


window.addEventListener("load", () => {
  const newData = [];
  newData.push(obj);
  console.log(newData);
  
  main.innerHTML = "";
  let bookData = newData.map((element, index) => {
     
      return `
                <div class="main">
                   <img src=${element.image}>   
                   
                <div class="text">
                   <h4>${element.title}</h4>
                   <span class="date">${element.price}</span>
                </div>
             </div>
            `;
    })
    .join();

 
  main.innerHTML = bookData;
});
