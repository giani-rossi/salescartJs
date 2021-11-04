window.addEventListener("DOMContentLoaded", () => {
  let USD = $templateSalescart.querySelector("#totalTableUSD");

  function traer() {
    fetch(
      "https://freecurrencyapi.net/api/v2/latest?apikey=637a2f30-3b32-11ec-b14a-d923f2f67fce&base_currency=ARS"
    )
      .then((response) => response.json())
      .then((data) => {
        //       console.log(data.data.USD);
        //     console.log(USD);
        changeUSD = data.data.USD;
        console.log(USD);
        // USD.textContent = changeUSD
        console.log(changeUSD);
      });

    changeUSD = $templateFooter.querySelector("#totalPriceUSD");
    console.log(changeUSD);
  }
  traer();

  console.log(USD);
});
