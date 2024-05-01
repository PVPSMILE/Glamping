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
    const price = 3000;
    var price_out = document.getElementById("price_out");
    price_out.innerHTML = (1+" день");
    price_out2.innerHTML = (price+" грн.");
    price_out.style.display = "block";
    let dates = obj.split(" to ");
    let data1 = new Date(dates[0]);
    let data2 = new Date(dates[1]); 
    let obj2 = (Math.round((data2.getTime() - data1.getTime()) / (1000 * 3600 * 24)) + 1);

    if (obj2 == "NaN"){
        price_out.innerHTML = (1+" день");
        price_out2.innerHTML = (price+" грн.");
    }
    else if (obj2 < 5) {
        price_out.innerHTML = (obj2+" дні");
        price_out2.innerHTML = (price*obj2+" грн.");
    }
    else if (obj2 > 5) {
        price_out.innerHTML = (obj2+" днів");
        price_out2.innerHTML = (price*obj2+" грн.");
    } 
}
let popupBg = document.querySelector('.popup_bg');
let popup = document.querySelector('.popup');
let openPopupButtons = document.querySelectorAll('.open-popup');
let closePopupButton = document.querySelector('.close-popup');

function popup_activate (){
    popupBg.classList.add('active');
    popup.classList.add('active');
}
function popup_deactivate (){
    popupBg.classList.remove('active');
    popup.classList.remove('active');

}
function validateForm() {
    var fullname = document.getElementById("fullname").value;
    var surname = document.getElementById("surname").value;
    var phone = document.getElementById("phone").value;
    var count_price = document.getElementById("count_price").value;   
    if (fullname === "" || surname === "" || phone === "" || count_price === "") {
      console.log("Пожалуйста, заполните все поля формы.");
      return false;
    } else {
        popup_activate()
        console.log("wfwef");
      return true;
    }
}

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
  
