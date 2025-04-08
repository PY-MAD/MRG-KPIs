// لا تعيد تعريف نفس المتغير أكثر من مرة في نفس الصفحة
var quarterData = [];
var monthData = [];

function renderQuarterChart() {
  const ctx = document.getElementById("chart-bars")?.getContext("2d");
  if (!ctx) return;

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: quarterData.map(q => q.label),
      datasets: [{
        label: "نسبة التحقق",
        data: quarterData.map(q => q.value),
        backgroundColor: "#0ea5e9",
        borderRadius: 6,
        maxBarThickness: 25
      }]
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      plugins: { legend: { display: true } },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: { color: "#fff", font: { size: 12 } },
          grid: { display: false }
        },
        x: {
          ticks: { color: "#fff" },
          grid: { display: false }
        }
      }
    }
  });
}

function renderMonthChart() {
  const ctx2 = document.getElementById("chart-line")?.getContext("2d");
  if (!ctx2) return;

  const gradient = ctx2.createLinearGradient(0, 230, 0, 50);
  gradient.addColorStop(1, "rgba(203,12,159,0.2)");
  gradient.addColorStop(0.2, "rgba(72,72,176,0.0)");
  gradient.addColorStop(0, "rgba(203,12,159,0)");

  new Chart(ctx2, {
    type: "line",
    data: {
      labels: monthData.map(m => m.label),
      datasets: [{
        label: "المبيعات الشهرية",
        data: monthData.map(m => m.value),
        borderColor: "#cb0c9f",
        backgroundColor: gradient,
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        borderWidth: 3
      }]
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: "#b2b9bf", font: { size: 11 } },
          grid: { borderDash: [5, 5] }
        },
        x: {
          ticks: { color: "#b2b9bf", font: { size: 11 } },
          grid: { borderDash: [5, 5] }
        }
      }
    }
  });
}

// هذا بعد تعريف الدوال
fetch("/salesKPIs/api/kpis/dashboard")
  .then((res) => res.json())
  .then((data) => {
    quarterData = data.quarters;
    monthData = data.months;
    renderQuarterChart();
    renderMonthChart();
  })
  .catch((err) => console.error(err));