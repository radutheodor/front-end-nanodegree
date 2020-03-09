// Personal API Key for OpenWeatherMap API
const apiKey = "a36...";
/* Global Variables */
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?";

/* Register event listener for user interaction */
document.getElementById("generate").addEventListener("click", () => {
  const inputCity = document.getElementById("zip").value;
  const userFeelings = document.getElementById("feelings").value;

  // chain Promises
  getWebApiData(baseUrl, inputCity, apiKey).then(data => {
    postData("/addWeather", {
      date: convertTimestampToDate(data.dt),
      city: inputCity,
      temperature: Math.round(data.main.temp),
      content: userFeelings
    });
    updateWeatherPage();
  });
});

/**
 * Function to convert unix UTC timestamp to readable date string
 * @param timestamp timestamp in format unix UTC
 */
const convertTimestampToDate = timestamp => {
  const date = new Date(timestamp * 1000);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

/**
 * Function to update Weather page after user interaction
 */
const updateWeatherPage = async () => {
  getProjectData().then(allProjectData => {
    try {
      const lastEntry = allProjectData.length - 1;
      document.getElementById("date").innerHTML = `Date: ${allProjectData[lastEntry].date}`;
      document.getElementById("temp").innerHTML = `Temperature now in ${allProjectData[lastEntry].city}: ${allProjectData[lastEntry].temperature} degrees Celsius`;
      document.getElementById("content").innerHTML = `Your feelings: ${allProjectData[lastEntry].content}`;
    } catch (error) {
      console.log("Error occured while updating weather page.", error);
    }
  });
};

/**
 * Function to GET Web API Data
 * @param baseUrl Open Weather Map Web API base url
 * @param inputCity city for which temperature will be displayed
 * @param apiKey Open Weather Web API key
 */
const getWebApiData = async (baseUrl, inputCity, apiKey) => {
  const response = await fetch(`${baseUrl}q=${inputCity}&appid=${apiKey}&units=metric`);

  try {
    const weatherData = await response.json();
    console.log(weatherData);
    return weatherData;
  } catch (error) {
    console.log("Error occured while getting Open Weather API data.", error);
  }
};

/**
 * Function to POST data to Express server side
 * @param url POST url
 * @param data data to be persisteed
 */
const postData = async (url, data) => {
  console.log(data);
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("Error occured while posting data.", error);
  }
};

/**
 * Function to GET Project Data
 */
const getProjectData = async () => {
  const request = await fetch("/getAllData");
  try {
    const allProjectData = await request.json();
    console.log(allProjectData);
    return allProjectData;
  } catch (error) {
    console.log("Error occured while getting project data.", error);
  }
};
