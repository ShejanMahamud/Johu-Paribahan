const seatButtons = document.querySelectorAll("#first-seat-row button");
const seatButtons2 = document.querySelectorAll("#second-seat-row button");
const selectedSeats = [];
let seatsSelected = 0;
function handleSeatClick(btn) {

    if (btn.getAttribute('data-added') === 'true') {
        btn.removeAttribute('data-added');
        btn.style.backgroundColor = ""; 
        btn.classList.remove("text-white"); 
        const index = selectedSeats.indexOf(btn);
        if (index !== -1) {
            selectedSeats.splice(index, 1); 
        }
        seatsSelected--;
        const seatAvailable = parseInt(document.getElementById("seat-count").innerText);
        document.getElementById("seat-count").innerText = seatAvailable + 1;
        const seatAvailable2 = parseInt(document.getElementById("seat-count-2").innerText);
        document.getElementById("seat-count-2").innerText = seatAvailable2 - 1;
        document.getElementById("seat-details").childNodes[5].remove("tr");

        const seatCount = parseInt(document.getElementById("seat-count-2").innerText) ;
       const ticketPrice = document.getElementById("price").innerText = seatCount * 550;
       const totalPrice = document.getElementById("total-price").innerText = ticketPrice

    } else if (seatsSelected < 4) {
        btn.setAttribute('data-added', 'true');
        btn.style.backgroundColor = "#1dd100";
        btn.classList.add("text-white");
        selectedSeats.push(btn);
        seatsSelected++;
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

    }
}

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
