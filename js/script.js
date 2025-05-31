const m = ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"];
let maand = new Date().getMonth();
let jaar = new Date().getFullYear();
let geselecteerd = null;

const titel = document.getElementById("jaar");
const body = document.getElementById("calendarrr");
const progress = document.getElementById("progress");
const message = document.getElementById("message");

function kalender() {
  titel.textContent = `${m[maand]} ${jaar}`;
  body.innerHTML = "";

  const start = (new Date(jaar, maand, 1).getDay() + 6) % 7;
  const dagen = new Date(jaar, maand + 1, 0).getDate();
  let d = 1;

  for (let i = 0; i < 6; i++) {
    const rij = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      const cel = document.createElement("td");

      if ((i === 0 && j < start) || d > dagen) {
        cel.textContent = "";
      } else {
        cel.textContent = d;
        const datum = `${jaar}-${String(maand + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
        if ((localStorage.getItem(datum) || 0) >= 90) {
          cel.style.backgroundColor = "#ff4d4d";
          cel.style.color = "black";
        }

        cel.onclick = () => {
          geselecteerd = datum;
          update();
          kalender();
        };

        if (geselecteerd === datum) {
          cel.style.outline = "2px solid #00ff99";
        }

        d++;
      }

      rij.appendChild(cel);
    }
    body.appendChild(rij);
  }

  toonStatistieken();
}

function update() {
  if (!geselecteerd) {
    progress.textContent = `0 / 90 minuten`;
    message.textContent = "";
    return;
  }
  let min = parseInt(localStorage.getItem(geselecteerd)) || 0;
  progress.textContent = `${min} / 90 minuten`;
  message.textContent = min >= 90 ? "🎉 Doel bereikt!" : "";
}

function addMinutes(m) {
  if (!geselecteerd) return;
  let min = parseInt(localStorage.getItem(geselecteerd)) || 0;
  localStorage.setItem(geselecteerd, min + m);
  update();
  kalender();
}

function resetMinutes() {
  if (!geselecteerd) return;
  localStorage.setItem(geselecteerd, 0);
  update();
  kalender();
}

function prevMonth() {
  maand--;
  if (maand < 0) {
    maand = 11;
    jaar--;
  }
  geselecteerd = null;
  kalender();
  update();
}

function nextMonth() {
  maand++;
  if (maand > 11) {
    maand = 0;
    jaar++;
  }
  geselecteerd = null;
  kalender();
  update();
}

function toonStatistieken() {
  let totaal = 0, behaald = 0;
  const dagen = new Date(jaar, maand + 1, 0).getDate();

  for (let d = 1; d <= dagen; d++) {
    const datum = `${jaar}-${String(maand + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    let min = +localStorage.getItem(datum) || 0;
    totaal += min;
    behaald += min >= 90;
  }

  document.getElementById("totaalMinuten").textContent = `Totaal minuten deze maand: ${totaal}`;
  document.getElementById("dagenBehaald").textContent = `Dagen doel behaald: ${behaald}`;
}

kalender();
update();
