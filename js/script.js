const m = [
    "Januari", "Februari", "Maart", "April", "Mei", "Juni",
    "Juli", "Augustus", "September", "Oktober", "November", "December"
  ];
  
  let maand = new Date().getMonth();
  let jaar = new Date().getFullYear();
  
  const titel = document.getElementById("jaar");
  const body = document.getElementById("calendarrr");
  
  function kalender() {
    titel.textContent = `${m[maand]} ${jaar}`;
    body.innerHTML = "";
  
    const start = (new Date(jaar, maand, 1).getDay() + 6) % 7;
    const totaal = new Date(jaar, maand + 1, 0).getDate();
  
    let d = 1;
    for (let i = 0; i < 6; i++) {
      const rij = document.createElement("tr");
      for (let j = 0; j < 7; j++) {
        const cel = document.createElement("td");
        cel.textContent = (i === 0 && j < start) || d > totaal ? "" : d++;
        rij.appendChild(cel);
      }
      body.appendChild(rij);
    }
  }
  
  function prevMonth() {
    maand--;
    if (maand < 0) {
      maand = 11;
      jaar--;
    }
    kalender();
  }
  
  function nextMonth() {
    maand++;
    if (maand > 11) {
      maand = 0;
      jaar++;
    }
    kalender();
  }
  
  kalender();

  let totaal = 0;
const doel = 90;

function update() {
  document.getElementById("progress").textContent = `${totaal} / ${doel} minuten`;
  document.getElementById("message").textContent = totaal >= doel ? "🎉 Doel bereikt!" : "";
}

function addMinutes(m) {
  totaal += m;
  update();
}

function resetMinutes() {
  totaal = 0;
  update();
}

update();

  