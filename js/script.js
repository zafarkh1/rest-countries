const container = document.querySelector(".card-wrapper");
const btn = document.querySelector(".fa-solid");
const input = document.querySelector("#name");

btn.addEventListener("click", () => {
  const name = input.value.toLowerCase();
  let url = `https://restcountries.com/v2/name/${name}`;
  // let url = `https://restcountries.com/v2/all`;

  container.innerHTML = "";
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Doesn't work");
      }
      return response.json();
    })
    .then((data) => {
      data.map((country) => {
        const countryElement = document.createElement("div");
        const flagElement = document.createElement("img");
        const countryName = document.createElement("h3");
        const countryPopulation = document.createElement("p");
        const countryCapital = document.createElement("p");
        const countryLanguage = document.createElement("p");

        flagElement.src = country.flags.png;
        flagElement.alt = country.name;

        countryName.innerText = country.name;

				const myPopulation = country.population;

        const billion = myPopulation * 0.000000001;
        const million = myPopulation * 0.000001;
        const thousand = myPopulation * 0.001;

        if (myPopulation > 999 && myPopulation <= 999999) {
          countryPopulation.innerHTML = `<strong>Population:</strong> ${thousand.toFixed(
            0
          )} thousand`;
        } else if (myPopulation > 999999 && myPopulation <= 999999999) {
          countryPopulation.innerHTML = `<strong>Population:</strong> ${million.toFixed(
            0
          )} million`;
        } else if (myPopulation > 999999999) {
          countryPopulation.innerHTML = `<strong>Population:</strong> ${billion.toFixed(
            1
          )} billion`;
        }

        countryCapital.innerHTML = `<strong>Capital:</strong> ${country.capital}`;

        countryLanguage.innerHTML = `<strong>Language:</strong> ${country.languages[0].name}`;

        countryElement.appendChild(flagElement);
        countryElement.appendChild(countryName);
        countryElement.appendChild(countryPopulation);
        countryElement.appendChild(countryCapital);
        countryElement.appendChild(countryLanguage);

        container.appendChild(countryElement);
      });
    })
    .catch((error) => console.error("Page not found", error));

  input.value = "";
});