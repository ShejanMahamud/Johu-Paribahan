
const seatButtons = document.querySelectorAll("#first-seat-row button");
const seatButtons2 = document.querySelectorAll("#second-seat-row button");


let seatsSelected = 0;
const selectedSeats = [];

document.getElementById("back").addEventListener("click", function () {
    window.location.reload();
})

for (const button of seatButtons) {
    button.addEventListener("click", function () {
        handleSeatClick(button);
    });
}
for (const button of seatButtons2){
    button.addEventListener("click", function () {
        handleSeatClick(button); 
    });
}
function addElementsById(id,className){
    document.getElementById(id).classList.add(className);
}
function removeElementsById(id,className){
    document.getElementById(id).classList.remove(className);
}

function setInnerText (id,text){
    document.getElementById(id).innerText = text;
}

function backgroundChange(id,value){
    document.getElementById(id).style.backgroundColor = value;
}

function setAttribute(id,name,value){
    document.getElementById(id).setAttribute(name,value);
}

function removeAttribute(id,name,value){
    document.getElementById(id).removeAttribute(name,value);
}

function discountCalc(couponCode1,couponCode2, discount1, discount2) {
    const applyCouponButton = document.getElementById("apply-coupon");
    applyCouponButton.addEventListener('click', function() {
        const couponText = document.getElementById("coupon-field").value;
        if (couponText === couponCode1 ) {
            const totalPrice = parseInt(document.getElementById("price").innerText);
            const discountedPrice = totalPrice / 100 * discount1;
            const grandTotal = totalPrice - discountedPrice;
            removeElementsById("discounted-price","hidden");
            setInnerText("discounted-price",`BDT -${discountedPrice}`);
            setInnerText("total-price",grandTotal);
            addElementsById("coupon-sec","hidden");
            removeElementsById("discount-success","hidden");
            addElementsById("coupon-error","hidden");
            return;
        } else {
            removeElementsById("coupon-error","hidden");
        }

        if (couponText === couponCode2) {
            const totalPrice = parseInt(document.getElementById("price").innerText);
            const discountedPrice = totalPrice / 100 * discount2;
            const grandTotal = totalPrice - discountedPrice;
            removeElementsById("discounted-price","hidden");
            setInnerText("discounted-price",`BDT -${discountedPrice}`);
            setInnerText("total-price",grandTotal);
            addElementsById("coupon-sec","hidden");
            removeElementsById("discount-success","hidden");
            addElementsById("coupon-error","hidden");
        } else {
            removeElementsById("coupon-error","hidden");
        }
    });
}

function handleSeatClick(btn) {

    if (btn.getAttribute('data-added') === 'true') {
        btn.removeAttribute('data-added'); 
        btn.style.backgroundColor = ""; 
        btn.classList.remove("text-white"); 
        const index = selectedSeats.indexOf(btn);
        if (index !== -1) {
            selectedSeats.splice(index, 1); 
        }
        seatsSelected --;

        const seatAvailable = parseInt(document.getElementById("seat-count").innerText);
        setInnerText("seat-count", seatAvailable+1);
        const seatAvailable2 = parseInt(document.getElementById("seat-count-2").innerText);
        setInnerText("seat-count-2", seatAvailable2-1);
        document.getElementById("seat-details").childNodes[5].remove("tr");
        const seatCount = parseInt(document.getElementById("seat-count-2").innerText) ;
       const ticketPrice = document.getElementById("price").innerText = seatCount * 550;
       const totalPrice = document.getElementById("total-price").innerText = ticketPrice;
       addElementsById("discounted-price","hidden");
       removeElementsById("coupon-sec","hidden");
       removeElementsById("coupon-error2","hidden");
        addElementsById("fillup-alert","hidden");
        backgroundChange("apply-coupon","");
        setAttribute("apply-coupon","disabled","disabled");
        addElementsById("discount-success","hidden");

       if(selectedSeats.length <= 0 ){
        setAttribute("next-btn","disabled","disabled");
        backgroundChange("next-btn","");
    }
    
    } else if (seatsSelected < 4 ) { 
        btn.setAttribute('data-added', 'true'); 
        btn.style.backgroundColor = "#1dd100"; 
        btn.classList.add("text-white"); 
        selectedSeats.push(btn); 
        seatsSelected ++; 

        // Update seat counts and prices
        const seatAvailable = parseInt(document.getElementById("seat-count").innerText);
        setInnerText("seat-count",seatAvailable - 1)
        const seatAvailable2 = parseInt(document.getElementById("seat-count-2").innerText);
        setInnerText("seat-count-2",seatAvailable2 +1)
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        tr.setAttribute("class","seat-number");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        td1.innerText = btn.innerText;
        td2.innerText = "Economy";
        td3.innerText = 550;
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        document.getElementById("seat-details").appendChild(tr);
        const seatCount = parseInt(document.getElementById("seat-count-2").innerText) ;
       const ticketPrice = document.getElementById("price").innerText = seatCount * 550;
       const totalPrice = document.getElementById("total-price").innerText = ticketPrice;

       removeElementsById("fillup-alert","hidden");

       if(seatCount !== 4){
        setAttribute("apply-coupon","disabled","disabled");
        setInnerText("total-price",totalPrice);
        addElementsById("apply-coupon","bg-gray-400");
        addElementsById("coupon-error2","hidden");
    }else{
        discountCalc("NEW15","Couple 20", 15,20);
        removeAttribute("apply-coupon","disabled","disabled");
        backgroundChange("apply-coupon","#1dd100")
        addElementsById("coupon-error2","hidden");
    }
    }
    
    document.getElementById("phone").addEventListener('keyup', function(e) {
        const inputValue = parseInt(e.target.value);
        if (isNaN(inputValue)) {
            setAttribute("next-btn","disabled","disabled");
            backgroundChange("next-btn","");
        } else {
            removeAttribute("next-btn","disabled","disabled");
            backgroundChange("next-btn","#1dd100");
            addElementsById("fillup-alert","hidden");
        }
    });
    
    }
