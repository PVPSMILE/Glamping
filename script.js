
var phoneInput = document.querySelector('.phone')
phoneInput.addEventListener('keydown', function(event) {

   if( !(event.key == 'ArrowLeft' ||  event.key == 'ArrowRight' ||  event.key == 'Backspace' || event.key == 'Tab')) { event.preventDefault() }
    var mask = '+380 (11) 111-11-11'; 
 
    if (/[0-9+\ -()]/.test(event.key)) {    
        var currentString = this.value;
        var currentLength = currentString.length;
        if (/[0-9]/.test(event.key)) {
            if (mask[currentLength] == '1') {
                this.value = currentString + event.key;
            } else {
                for (var i=currentLength; i<mask.length; i++) {
                if (mask[i] == '1') {
                    this.value = currentString + event.key;
                    break;
                }
                currentString += mask[i];
                }
            }
        }
    } 
});

flatpickr( "#count_price",{
    mode: "range",
    minDate: "today",
    dateFormat: "Y-m-d",
    disable: [


        {
        from:"2024-04-11",
        to:"2024-04-13"
        }
    ]
     
});

function countPrice() {

    var obj = document.getElementById("count_price").value.toString();;
    if (obj.length > 10){
        const price = 3000;
        var price_out = document.getElementById("price_out");
        price_out.style.display = "block";
        let dates = obj.split(" to ");
    
        let data1 = new Date(dates[0]);
        let data2 = new Date(dates[1]);
      

        let obj2 = Math.round((data2.getTime() - data1.getTime()) / (1000 * 3600 * 24));
        
        price_out.innerHTML = (obj2+"ночі");
        price_out2.innerHTML = (price*obj2);
    }
    else {
        return; 
    }

}

function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    if (name === "" || email === "") {
      alert("Пожалуйста, заполните все поля формы.");
      return false;
    } else {
      // Если все поля заполнены, можно выполнить другие действия, например, отправить данные на сервер
      // Например, можно использовать AJAX для отправки данных без перезагрузки страницы
      alert("Все поля формы заполнены!");
      return true;
    }
    }

let popupBg = document.querySelector('.popup_bg');
let popup = document.querySelector('.popup');
let openPopupButtons = document.querySelectorAll('.open-popup');
let closePopupButton = document.querySelector('.close-popup');

openPopupButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        popupBg.classList.add('active');
        popup.classList.add('active');
    })
});
function popup_activate (){
    popupBg.classList.add('active');
    popup.classList.add('active');

}
closePopupButton.addEventListener('click',() => {
    popupBg.classList.remove('active');
    popup.classList.remove('active');
});

document.addEventListener('click', (e) => {
    if(e.target === popupBg) {
        popupBg.classList.remove('active');
        popup.classList.remove('active');
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const peopleCount = document.getElementById("peopleCount");
    const addPersonBtn = document.getElementById("addPerson");
    const removePersonBtn = document.getElementById("removePerson");
  
    let count = 4; 
    updateCount();

    function updateCount() {
      peopleCount.textContent = count;
    }

    addPersonBtn.addEventListener("click", function() {
      if (count < 6) {
        count++;
        updateCount();
      }
    });
  
    removePersonBtn.addEventListener("click", function() {
      if (count > 1) {
        count--;
        updateCount();
      }
    });
  });
  
