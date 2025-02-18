const pass = document.getElementById(data1),
      icon = document.querySelector(".bx");

icon.addEventListener("click", e => {
    if (data1.type === "password")
    
         {
        data1.type = "text"
        data2.type = "text"
        data3.type = "text";
        icon.classList.remove('bx-show-alt')
        icon.classList.add('bx-hide')
    } else {
        data1.type = "password"
        data2.type = "password"
        data3.type = "password";
        icon.classList.add('bx-show-alt')
        icon.classList.remove('bx-hide')
    }
})      

  
