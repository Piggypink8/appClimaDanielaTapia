// 'navigator' es una función que nos proporciona el browser para buscar la ubicacion del usuario
// fetch data: obtener un dato.



// Con esto llamamos a la api
const API_KEY = '00f35b9658b194fd6cd7357796c53437';

// Recibe la data del usuario de su ubicacion (position)
const fetchData = position => { 
    
    // Primero obtenemos la posición geográfica (latitud y longitud)
    const {latitude, longitude} = position.coords // Vamos a la parte .coords de position (un objeto) y en las variables (keys) latitude y longitude y pone el valor de las keys del objeto con el mismo nombre de las variables --- Toma los datos del objeto 'position.coords' de las key latitude y longitude 


    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=es`)
    .then(response => response.json())// Metodo para obtenes datos como viento,lluvia,clima,pais,temperatira,presion,humedad
    .then(data => setWeatherData(data))


console.log(position)
}

const setWeatherData = (data) => { 
    console.log(data)

    // Le damos el valor a nuestros datos solicitados a partir del objeto data, obtenido en el fetchData.
    const weatherData = { 
        location: `Localidad : ${data.name}`,
        description: data.weather[0].main, //key
        humidity: `${data.main.humidity}%`, //key
        wind: data.wind.speed, //key
        temperature:`${data.main.temp.toFixed(0)}°`, //key
        date: getDate(), //key
    }


    // Iteramos las keys de nuestro objeto 'weatherData' y nos devuelve las key, y lo que hacemos es obtener el valor de las keys.
    Object.keys(weatherData).forEach( key => { 
        document.getElementById(key).textContent = weatherData[key] // Le damos el valor de las keys en el objeto obtenido del fetchData

       
    })
     
    if (data.weather[0].main == 'Clouds') { 
        console.log('Nubloso')
    }

    if (data.main.temp.toFixed(0) > 25 ) { 
        console.log('temperatura mayor a 20 grados')
    } else { 
        console.log('No es mayor a 25 grados es de: ' + data.main.temp)
    }
}


const getDate = () => { 
    let date = new Date();
    return`${date.toDateString()}`
    //return `${date.getDate()}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}` // el slice hace que si tiene 2 caracteres le saca el 0, sino se lo deja.
}
// Esta funcion obtiene la ubicación del usuario.
const onLoad = () => { 
    navigator.geolocation.getCurrentPosition(fetchData)
}