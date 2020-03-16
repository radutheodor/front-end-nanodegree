function handleTextSubmit(event) {
  event.preventDefault();

  let textToAnalyze = document.getElementById("text").value;

  console.log("::: Text Form Submitted :::");
  fetch("http://localhost:8081/textSentiment", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text: textToAnalyze })
  })
    .then(response => response.json())
    .then(response => {
      document.getElementById("text").innerHTML = `Analyzed text: "${response.text}"`;
      document.getElementById("polarity").innerHTML = `Polarity: ${response.polarity}`;
      document.getElementById("subjectivity").innerHTML = `Subjectivity: ${response.subjectivity}`;
    });
}

function handleUrlSubmit(event) {
  event.preventDefault();

  let urlToAnalyze = document.getElementById("url").value;

  console.log("::: URL Form Submitted :::");
  fetch("http://localhost:8081/urlSentiment", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text: urlToAnalyze })
  })
    .then(response => response.json())
    .then(response => {
      document.getElementById("text").innerHTML = `Analyzed URL: "${response.text}"`;
      document.getElementById("polarity").innerHTML = `Polarity: ${response.polarity}`;
      document.getElementById("subjectivity").innerHTML = `Subjectivity: ${response.subjectivity}`;
    });
}

export { handleTextSubmit };
export { handleUrlSubmit };
