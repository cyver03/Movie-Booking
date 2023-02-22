let movie_picker = document.querySelector(".movie-picker");
let select_movie = document.getElementById('movies');
let seats = document.querySelector(".seats");
let no_of_seat = document.getElementById("no-of-seat");
let price = document.getElementById("price");
let movie_price = document.getElementById("movie-price");
let seat_mapper = document.querySelectorAll(".seat");
let selected_seat = [];
let movie_selected = "";


function onLoad(){
    let movie_collection = [
        {
            name : "Avengers:Endgame",
            price : 10
        },
        {
            name : "Joker",
            price : 8
        },
        {
            name : "Toy Story",
            price : 7
        },
        {
            name : "Lion King",
            price : 6
        }
    ];
    movie_collection.forEach(movie => {
        let option = document.createElement("option");
        option.value = movie.price;
        option.innerText = movie.name;
        select_movie.add(option);
    });
    selected_seat = JSON.parse(localStorage.getItem("selectedSeats"));
    if(selected_seat != null || selected_seat.length < 1){
        seat_mapper.forEach((seat, index) => {
            if(selected_seat.indexOf(index) > -1){
                seat.classList.add("selected");
            }
        });
    }
    movie_selected = JSON.parse(localStorage.getItem("selectedMovie"));
    select_movie.value = movie_selected;
    updateSummary();
}
function getSelectedSeat(){
    selected_seat = seats.querySelectorAll(".selected");
    let seat_index = [...selected_seat].map(seat => [...seat_mapper].indexOf(seat));
    localStorage.setItem("selectedSeats", JSON.stringify(seat_index));
}
function updateSummary(){
    let total_price = 0;
    no_of_seat.innerHTML = `<b>${selected_seat.length}</b>`;
    total_price = select_movie.value * selected_seat.length;
    price.innerText = `$${total_price}`;
    movie_price.innerText = `$${select_movie.value}`;
}
select_movie.addEventListener("change", ()=>{
    updateSummary();
    movie_selected = select_movie.value;
    localStorage.setItem("selectedMovie", JSON.stringify(movie_selected));
});
seats.addEventListener("click", (e)=>{
    let seat = e.target;
    if(seat.classList.contains("seat") && !(seat.classList.contains("na") || seat.classList.contains("occupied"))){
        seat.classList.toggle("selected"); 
    }
    getSelectedSeat();
    updateSummary();
});

onLoad();

