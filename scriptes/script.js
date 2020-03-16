const discription = document.querySelector(".discription");
const cities = document.querySelector(".cities");
const regions = document.querySelector("#Regioni").querySelectorAll("path");
regions.forEach(item => {
  item.addEventListener(
    "mousemove",
    function(e) {
      // body...
      var x = e.clientX;
      var y = e.clientY;
      var id;
      data.forEach(d => {
        if (d.id == item.id) {
          let totalConfirmed, totalRecovered, totalDeceased;
          totalConfirmed = totalRecovered = totalDeceased = 0;

          d.cities.forEach(c => {
            totalConfirmed += Number.parseInt(c.cases.confirmed);
            totalRecovered += Number.parseInt(c.cases.recovered);
            totalDeceased += Number.parseInt(c.cases.deceased);
            if (full === false) {
              let color = "black";
              if (c.cases.confirmed > 0) {
                color = "red";
              }
              cities.innerHTML +=
                "<p><b style='color:" +
                color +
                "'>" +
                c.name[1] +
                " : </b> 😷 " +
                c.cases.confirmed +
                "</p>";
            }
          });
          full = true;
          var title = "<h4>" + d.name[0] + "</h4>";
          if (totalConfirmed != totalRecovered + totalDeceased) {
            item.classList.add("infected");
            item.style.stroke = "red";
          } else {
            item.classList.remove("infected");
            item.style.stroke = "green";
          }
          var confirmed = "<p>😷 : " + totalConfirmed + "</p>";
          var recovered = "<p>😁 : " + totalRecovered + "</p>";
          var deceased = "<p>😵 : " + totalDeceased + "</p>";
          discription.innerHTML = title + confirmed + recovered + deceased;
        }
      });
      discription.style.display = "block";
      discription.style.left = x + 15 + "px";
      discription.style.top = y + "px";
    },
    item.addEventListener("mouseleave", function() {
      // body...
      discription.style.display = "none";
      cities.innerHTML = "";
      full = false;
      initJSON();
    })
  );
});
let data;
let full = false;
function initJSON() {
  var req = new XMLHttpRequest();
  req.open("GET", "scriptes/data.json");
  req.onload = function() {
    data = JSON.parse(req.responseText);
  };
  req.send();
}
window.onload = initJSON();
