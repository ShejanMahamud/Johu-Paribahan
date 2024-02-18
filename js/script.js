const seatButtons = document.querySelectorAll("#first-seat-row button");
const seatButtons2 = document.querySelectorAll("#second-seat-row button");
let seatsSelected = 0;
const selectedSeats = [];

// Add event listeners to seat buttons
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
        document.getElementById("seat-count").innerText = seatAvailable + 1;
        const seatAvailable2 = parseInt(document.getElementById("seat-count-2").innerText);
        document.getElementById("seat-count-2").innerText = seatAvailable2 - 1;
        document.getElementById("seat-details").childNodes[5].remove("tr");

        const seatCount = parseInt(document.getElementById("seat-count-2").innerText) ;
       const ticketPrice = document.getElementById("price").innerText = seatCount * 550;
       const totalPrice = document.getElementById("total-price").innerText = ticketPrice;
       document.getElementById("discounted-price").classList.add("hidden");
       document.getElementById("coupon-sec").classList.remove("hidden");
       document.getElementById("coupon-error").classList.remove("hidden")
       document.getElementById("coupon-error").innerText = "To get discount you have to purchase 4 tickets";
       document.getElementById("apply-coupon").classList.add("bg-gray-700");
       document.getElementById("apply-coupon").setAttribute('disabled','disabled');
    } else if (seatsSelected < 4) {
        btn.setAttribute('data-added', 'true');
        btn.style.backgroundColor = "#1dd100";
        btn.classList.add("text-white");
        selectedSeats.push(btn);
        seatsSelected ++;
        
        const seatAvailable = parseInt(document.getElementById("seat-count").innerText);
        document.getElementById("seat-count").innerText = seatAvailable - 1;
        const seatAvailable2 = parseInt(document.getElementById("seat-count-2").innerText);
        document.getElementById("seat-count-2").innerText = seatAvailable2 + 1;
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
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
       if(seatCount !== 4){
        document.getElementById("apply-coupon").setAttribute('disabled','disabled');
        document.getElementById("total-price").innerText = totalPrice;
        document.getElementById("apply-coupon").classList.add("bg-gray-700");
        

    }else{
        discountCalc("NEW15", 15);
        discountCalc("Couple 20", 20);
        document.getElementById("apply-coupon").removeAttribute('disabled');
        document.getElementById("apply-coupon").classList.remove("bg-gray-700");
        document.getElementById("coupon-error").classList.add("hidden");
    }

    }
}

function discountCalc(couponCode, discount) {
    const applyCouponButton = document.getElementById("apply-coupon");
    applyCouponButton.addEventListener('click', function() {
        const couponText = document.getElementById("coupon-field").value;
        if (couponText === couponCode) {
            const totalPrice = parseInt(document.getElementById("price").innerText);
            const discountedPrice = totalPrice / 100 * discount;
            const grandTotal = totalPrice - discountedPrice;
            document.getElementById("discounted-price").classList.remove("hidden")
            document.getElementById("discounted-price").innerText = `- ${discountedPrice}`;
            document.getElementById("total-price").innerText = grandTotal;
            document.getElementById("coupon-sec").classList.add("hidden");
            document.getElementById("coupon-error").classList.add("hidden");
        } else {
            document.getElementById("coupon-error").innerText = "Invalid coupon code";
        }
    });
}

