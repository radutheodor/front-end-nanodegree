function handleTextSubmit(event) {
  // Prevent default action for the event
  event.preventDefault();
  // Define supported languages
  const supportedLanguages = ["en", "de", "es"];
  // Get text provided by user
  let textToAnalyze = document.getElementById("text").value;
  // Check length no longer than a tweet
  if (textToAnalyze.length > 144) {
    document.getElementById("textErrors").style.display = "block";
    document.getElementById("textError").innerHTML = `Please provide a text of max 144 characters.`;
  } else {
    // Get language of provided text
    Client.checkForLanguage(textToAnalyze).then(data => {
      try {
        // Analyze text only if language is supported
        if (supportedLanguages.includes(data.lang)) {
          console.log("::: Text Form Submitted :::");
          fetch("http://localhost:8081/sentiment", {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: textToAnalyze })
          })
            .then(response => response.json())
            .then(response => {
              document.getElementById("analized").innerHTML = `Analyzed text: ${response.text}`;
              document.getElementById("polarity").innerHTML = `Polarity: ${response.polarity}`;
              document.getElementById("subjectivity").innerHTML = `Subjectivity: ${response.subjectivity}`;
            });
        } else {
          document.getElementById("textErrors").style.display = "block";
          document.getElementById("textError").innerHTML = `Only English, German and Spanish languages supported. Your text seems to be ${data.lang}. Please provide a new text.`;
        }
      } catch (error) {
        console.log("Error occured while retreiving language of the text.", error);
      }
    });
  }
}

function handleUrlSubmit(event) {
  // Prevent default action for the event
  event.preventDefault();
  // Get url provided by user
  let urlToAnalyze = document.getElementById("url").value;

  console.log("::: URL Form Submitted :::");
  // Analyze URL only if valid
  if (Client.checkForUrl(JSON.parse(JSON.stringify(urlToAnalyze)))) {
    fetch("http://localhost:8081/sentiment", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: urlToAnalyze })
    })
      .then(response => response.json())
      .then(response => {
        document.getElementById("analized").innerHTML = `Analyzed URL: ${response.text}`;
        document.getElementById("polarity").innerHTML = `Polarity: ${response.polarity}`;
        document.getElementById("subjectivity").innerHTML = `Subjectivity: ${response.subjectivity}`;
      });
  } else {
    document.getElementById("urlErrors").style.display = "block";
    document.getElementById("urlError").innerHTML = `The URL ${JSON.stringify(urlToAnalyze)} is not valid`;
  }
}

export { handleTextSubmit };
export { handleUrlSubmit };
