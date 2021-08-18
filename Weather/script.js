const wrapper = document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoText = inputPart.querySelector(".info-text"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
locationBtn1 = inputPart.querySelector(".btn"),
weatherIcon = document.querySelector(".weather-part img"),
wrapperinput =document.querySelector(".wrapper input"),
arrowBack = wrapper.querySelector("header i");

let api;


locationBtn1.addEventListener("click", ()=>{
    if(inputField.value != ""){
        requestApi(inputField.value);
    }
});



locationBtn.addEventListener("click", ()=>{
    if(navigator.geolocation){ //if browser support geolocation api
        navigator.geolocation.getCurrentPosition(OnSuccess, onError);
    }
    else{
        alert("Your browser don't support geolocation api");

    }

});

function OnSuccess(position){
    const {latitude,longitude} = position.coords;
    api= `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=e658001fc2d22bfd4fc6bd291f702a83`
    fetchData();
}


function onError(error){
    infoText.innerText = error.message;
    infoText.classList.add("error");
}
function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e658001fc2d22bfd4fc6bd291f702a83`;
    fetchData();
}
function fetchData(){

    infoText.innerText = "Getting weather details...";
    infoText.classList.add("pending");
     fetch(api).then(response => response.json()).then(result => weatherDetails(result));
}


function weatherDetails(info){
    infoText.classList.replace("pending", "error");
    if(info.cod == "404"){
        infoText.innerText = `${inputField.value} isn't a valid city name`
    }else{

        const city = info.name;
        const country = info.sys.country;

        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        //using custom icon
        if(id == 800){
            weatherIcon.src = "icon/sunny.svg";

        }
        else if(id >= 200 && id <= 232){
            weatherIcon.src = "icon/storm.svg";
        }
        else if(id >= 600 && id <= 622){
            weatherIcon.src = "icon/snowing.svg";
        }
        else if(id >= 701 && id <= 781){
            weatherIcon.src = "icon/haze.svg";
        }
        else if(id >= 801 && id <= 804){
            weatherIcon.src = "icon/cloudy.svg";
        }
        else if(id >= 300 && id <= 321 || (id >= 500 && id <= 531)){
            weatherIcon.src = "icon/rain.svg";
        }


        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".locations span").innerText = `${city}, ${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity span").innerText = `${humidity}%`;

        infoText.classList.remove("pending", "error");
        wrapper.classList.add("active");
        console.log(info);

    }
}


arrowBack.addEventListener("click", ()=>{

    wrapper.classList.remove("active");
    

});
