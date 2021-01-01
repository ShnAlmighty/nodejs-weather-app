const form = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector("#msg1");
const msg2 = document.querySelector("#msg2");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const value = search.value;
    msg1.innerHTML="Loading";
    msg2.textContent="";
    //http://localhost:3000;
    fetch(`/weather?address=${value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error);
                msg1.textContent=data.error;
            }else{
                msg1.innerHTML=`Location:${data.Location}`;
                msg2.innerHTML=`Current<br>Temperature:${data.Temperature}<br>Humidity:${data.Humidity}<br>Weather:${data.Weather}`;
                console.log("Location:"+data.Location);
                console.log("Temperature:"+data.Temperature);
                console.log("Humidity:"+data.Humidity);
                console.log("Weather:"+data.Weather);
            }
    });
    });  
    
});
