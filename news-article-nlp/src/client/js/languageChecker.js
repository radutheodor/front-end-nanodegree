async function checkForLanguage(input) {
  console.log("::: Running checkForLanguage :::", input);
  const response = await fetch("http://localhost:8081/language", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text: input })
  });

  try {
    const langData = await response.json();
    console.log(langData);
    return langData;
  } catch (error) {
    console.log("Error occured while posting data.", error);
  }
}

export { checkForLanguage };
