document.addEventListener("DOMContentLoaded", function () {
  const dateInput = document.getElementById("date-input");
  const calendar = document.getElementById("calendar");

  dateInput.addEventListener("click", function () {
    calendar.style.display =
      calendar.style.display === "block" ? "none" : "block";
  });

  function buildCalendar(year, month) {
    calendar.innerHTML = ""; // Clear previous calendar

    const monthNames = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    const daysInWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    let firstDay = new Date(year, month, 1).getDay();
    let lastDate = new Date(year, month + 1, 0).getDate();

    // Month and Year selection
    let monthYearDiv = document.createElement("div");
    monthYearDiv.classList.add("month-year");

    let prevBtn = document.createElement("button");
    prevBtn.textContent = "<";
    prevBtn.addEventListener("click", function () {
      if (month === 0) {
        month = 11;
        year--;
      } else {
        month--;
      }
      buildCalendar(year, month);
    });

    let nextBtn = document.createElement("button");
    nextBtn.textContent = ">";
    nextBtn.addEventListener("click", function () {
      if (month === 11) {
        month = 0;
        year++;
      } else {
        month++;
      }
      buildCalendar(year, month);
    });

    let monthSelect = document.createElement("select");
    monthNames.forEach((monthName, index) => {
      let option = document.createElement("option");
      option.value = index;
      option.textContent = monthName;
      if (index === month) {
        option.selected = true;
      }
      monthSelect.appendChild(option);
    });

    monthSelect.addEventListener("change", function () {
      month = parseInt(this.value);
      buildCalendar(year, month);
    });

    let yearSelect = document.createElement("select");
    for (let i = year - 50; i <= year + 50; i++) {
      let option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      if (i === year) {
        option.selected = true;
      }
      yearSelect.appendChild(option);
    }

    yearSelect.addEventListener("change", function () {
      year = parseInt(this.value);
      buildCalendar(year, month);
    });

    monthYearDiv.appendChild(prevBtn);
    monthYearDiv.appendChild(monthSelect);
    monthYearDiv.appendChild(yearSelect);
    monthYearDiv.appendChild(nextBtn);
    calendar.appendChild(monthYearDiv);

    let calendarTable = document.createElement("table");
    let headerRow = document.createElement("tr");
    daysInWeek.forEach((day) => {
      let th = document.createElement("th");
      th.textContent = day;
      headerRow.appendChild(th);
    });
    calendarTable.appendChild(headerRow);

    let dateRow = document.createElement("tr");
    for (let i = 0; i < firstDay; i++) {
      let td = document.createElement("td");
      dateRow.appendChild(td);
    }

    for (let date = 1; date <= lastDate; date++) {
      if ((firstDay + date - 1) % 7 === 0) {
        calendarTable.appendChild(dateRow);
        dateRow = document.createElement("tr");
      }
      let td = document.createElement("td");
      td.textContent = date;
      td.addEventListener("click", function () {
        dateInput.value = `${date} de ${monthNames[month]} de ${year}`;
        calendar.style.display = "none";
      });
      dateRow.appendChild(td);
    }
    calendarTable.appendChild(dateRow);
    calendar.appendChild(calendarTable);
  }

  const today = new Date();
  buildCalendar(today.getFullYear(), today.getMonth());
});
