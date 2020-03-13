function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  console.log("Moe");
  let formText = document.getElementById("name").value;
  Client.checkForName(formText);

  console.log("::: Form Submitted :::");
  fetch("http://localhost:8082/test")
    .then(res => res.json())
    .then(function(res) {
      document.getElementById("results").innerHTML = res.message;
    });

  getData();
}

const getData = async () => {
  const request = await fetch("/aylin");
  try {
    const data = await request.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error occured while getting project data.", error);
  }
};

export { handleSubmit };
