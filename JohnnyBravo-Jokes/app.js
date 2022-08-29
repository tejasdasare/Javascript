const jokeForm = document.getElementById("jokeForm");
const jokeText = document.getElementById("jokeText");
const firstNameIp = document.getElementById("firstName");
const lastNameIp = document.getElementById("lastName");

jokeForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  //   console.log("clicked");
  const firstName = firstNameIp.value || "Johnny";

  const lastName = lastNameIp.value || "Bravo";
  const url = `http://api.icndb.com/jokes/random?firstName=${firstName}&lastName=${lastName}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    jokeText.innerHTML = data.value.joke;
  } catch (ex) {
    console.log(ex);
  }

  //   console.log(data.value.joke);
});
