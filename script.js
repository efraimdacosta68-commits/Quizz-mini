// Quiz logic for one-question-per-page quiz with shuffle, timer, feedback, best score, and share
const TOTAL_TIME = 1800; // seconds total
let timeLeft = TOTAL_TIME;
let timerInterval = null;
const QUESTIONS = [
  {
    type: "mcq",
    question: "Ibukota Indonesia adalah?",
    options: ["Jakarta", "Bandung", "Surabaya", "Medan"],
    answer: "Jakarta",
    explain: "Ibukota negara Indonesia adalah Jakarta.",
  },
  {
    type: "mcq",
    question: "Planet terdekat ke Matahari adalah?",
    options: ["Venus", "Mars", "Merkurius", "Bumi"],
    answer: "Merkurius",
    explain: "Merkurius adalah planet terdekat ke Matahari.",
  },
  {
    type: "mcq",
    question: "Siapa penulis kitab 'Harry Potter'?",
    options: [
      "J.R.R. Tolkien",
      "J.K. Rowling",
      "George R.R. Martin",
      "Stephen King",
    ],
    answer: "J.K. Rowling",
    explain: "J.K. Rowling menulis seri Harry Potter.",
  },
  {
    type: "mcq",
    question: "Satuan internasional untuk massa adalah?",
    options: ["Newton", "Gram", "Kilogram", "Liter"],
    answer: "Kilogram",
    explain: "Kilogram (kg) adalah satuan SI untuk massa.",
  },
  {
    type: "mcq",
    question: "Gunung tertinggi di dunia (permukaan laut) adalah?",
    options: ["K2", "Everest", "Kilimanjaro", "Annapurna"],
    answer: "Everest",
    explain: "Gunung Everest adalah puncak tertinggi di atas permukaan laut.",
  },
  {
    type: "mcq",
    question: "Simbol kimia untuk air adalah?",
    options: ["H2O", "O2", "CO2", "HO"],
    answer: "H2O",
    explain: "Air terdiri dari dua atom hidrogen dan satu atom oksigen: H2O.",
  },
  {
    type: "mcq",
    question: "Negara dengan populasi terbesar di dunia adalah?",
    options: ["India", "Amerika Serikat", "China", "Indonesia"],
    answer: "China",
    explain: "China memiliki populasi terbesar (perkiraan terbaru).",
  },
  {
    type: "mcq",
    question: "Benua terkecil berdasarkan luas adalah?",
    options: ["Antartika", "Australia", "Eropa", "Amerika Selatan"],
    answer: "Australia",
    explain: "Australia merupakan benua terkecil.",
  },
  {
    type: "mcq",
    question: "Siapa penemu telepon?",
    options: [
      "Thomas Edison",
      "Alexander Graham Bell",
      "Nikola Tesla",
      "Guglielmo Marconi",
    ],
    answer: "Alexander Graham Bell",
    explain: "Bell dikenal luas sebagai penemu telepon.",
  },
  {
    type: "mcq",
    question: "Festival cahaya di India yang dikenal sebagai?",
    options: ["Holi", "Diwali", "Navratri", "Eid"],
    answer: "Diwali",
    explain: "Diwali adalah festival lampu yang populer di India.",
  },
  {
    type: "mcq",
    question: "Sungai terpanjang di dunia sering disebut?",
    options: ["Amazon", "Nil", "Yangtze", "Mississippi"],
    answer: "Nil",
    explain: "Meski ada perdebatan, Nil sering disebut sungai terpanjang.",
  },
  {
    type: "mcq",
    question: "Apa ibu kota Prancis?",
    options: ["Lyon", "Marseille", "Paris", "Nice"],
    answer: "Paris",
    explain: "Paris adalah ibu kota Prancis.",
  },
  {
    type: "mcq",
    question: "Mata uang Jepang adalah?",
    options: ["Yuan", "Won", "Yen", "Rupiah"],
    answer: "Yen",
    explain: "Yen (¥) adalah mata uang Jepang.",
  },
  {
    type: "mcq",
    question: "Apa hasil dari 9 x 8?",
    options: ["72", "81", "69", "64"],
    answer: "72",
    explain: "9 dikalikan 8 sama dengan 72.",
  },
  {
    type: "mcq",
    question: "Organ tubuh yang memompa darah adalah?",
    options: ["Paru-paru", "Hati", "Jantung", "Ginjal"],
    answer: "Jantung",
    explain: "Jantung memompa darah ke seluruh tubuh.",
  },
  {
    type: "mcq",
    question: "Bahasa resmi Brasil adalah?",
    options: ["Portugis", "Spanyol", "Inggris", "Prancis"],
    answer: "Portugis",
    explain: "Bahasa resmi Brasil adalah Portugis.",
  },
  {
    type: "mcq",
    question: "Siapa pelukis terkenal lukisan 'Mona Lisa'?",
    options: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Michelangelo",
    ],
    answer: "Leonardo da Vinci",
    explain: "Mona Lisa dilukis oleh Leonardo da Vinci.",
  },
  {
    type: "mcq",
    question: "Planet yang dikenal sebagai 'Planet Merah' adalah?",
    options: ["Jupiter", "Mars", "Saturnus", "Venus"],
    answer: "Mars",
    explain: "Mars disebut planet merah karena permukaan beroksida besi.",
  },
  {
    type: "mcq",
    question: "Apa bahasa resmi di Mesir?",
    options: ["Arab", "Persia", "Turki", "Ibrani"],
    answer: "Arab",
    explain: "Bahasa resmi Mesir adalah bahasa Arab.",
  },
  {
    type: "mcq",
    question: "Benua tempat negara Kenya berada adalah?",
    options: ["Asia", "Afrika", "Eropa", "Oseania"],
    answer: "Afrika",
    explain: "Kenya terletak di Afrika Timur.",
  },
  {
    type: "mcq",
    question: "Apa satuan untuk listrik arus?",
    options: ["Volt", "Ohm", "Ampere", "Watt"],
    answer: "Ampere",
    explain: "Ampere (A) adalah satuan kuat arus listrik.",
  },
  {
    type: "mcq",
    question: "Negara mana yang terkenal dengan Menara Pisa?",
    options: ["Spanyol", "Italia", "Portugal", "Belgia"],
    answer: "Italia",
    explain: "Menara Pisa berada di negara Italia.",
  },
  {
    type: "mcq",
    question: "Apa nama organ yang digunakan tumbuhan untuk fotosintesis?",
    options: ["Akar", "Daun", "Batang", "Bunga"],
    answer: "Daun",
    explain: "Daun adalah tempat fotosintesis berlangsung.",
  },
  {
    type: "mcq",
    question: "Apa singkatan dari 'WWW' di internet?",
    options: [
      "World Wide Web",
      "World Web Wide",
      "Web Wide World",
      "Wide World Web",
    ],
    answer: "World Wide Web",
    explain: "WWW berarti World Wide Web.",
  },
  {
    type: "mcq",
    question: "Bendera negara Jepang dominan warna apa?",
    options: [
      "Merah & Putih",
      "Biruh & Putih",
      "Hijau & Putih",
      "Hitam & Putih",
    ],
    answer: "Merah & Putih",
    explain: "Bendera Jepang berisi lingkaran merah di latar putih.",
  },
  {
    type: "mcq",
    question: "Siapa penemu listrik dinamo (generator praktis)?",
    options: [
      "Michael Faraday",
      "Isaac Newton",
      "Galileo Galilei",
      "Albert Einstein",
    ],
    answer: "Michael Faraday",
    explain: "Faraday menemukan prinsip induksi elektromagnetik.",
  },
  {
    type: "mcq",
    question: "Apa nama lautan terbesar di Bumi?",
    options: ["Atlantik", "Pasifik", "Hindia", "Arktik"],
    answer: "Pasifik",
    explain: "Samudra Pasifik adalah yang terbesar.",
  },
  {
    type: "mcq",
    question: "Ibukota Australia adalah?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    answer: "Canberra",
    explain: "Canberra adalah ibu kota Australia.",
  },
  {
    type: "mcq",
    question: "Hewan tercepat di darat adalah?",
    options: ["Cheetah", "Kuda", "Kelinci", "Antelope"],
    answer: "Cheetah",
    explain: "Cheetah dapat berlari sangat cepat, mencapai ~100 km/jam.",
  },
  {
    type: "mcq",
    question: "Siapa yang menulis 'Romeo and Juliet'?",
    options: [
      "William Shakespeare",
      "Charles Dickens",
      "Mark Twain",
      "Jane Austen",
    ],
    answer: "William Shakespeare",
    explain: "Romeo and Juliet adalah karya Shakespeare.",
  },
  {
    type: "mcq",
    question: "Negara yang dikenal sebagai 'Tanah Matahari Terbit' adalah?",
    options: ["Korea", "China", "Jepang", "Thailand"],
    answer: "Jepang",
    explain: "Jepang sering disebut 'Land of the Rising Sun'.",
  },
  {
    type: "mcq",
    question: "Apa unsur paling melimpah di atmosfer Bumi?",
    options: ["Oksigen", "Nitrogen", "Karbon Dioksida", "Argon"],
    answer: "Nitrogen",
    explain: "Nitrogen (~78%) adalah komponen utama atmosfer.",
  },
  {
    type: "mcq",
    question: "Simbol untuk emas dalam tabel periodik adalah?",
    options: ["Au", "Ag", "Fe", "Gd"],
    answer: "Au",
    explain: "Au berasal dari kata Latin 'Aurum'.",
  },
  {
    type: "mcq",
    question: "Manakah sport yang menggunakan 'serve' dan 'ace'?",
    options: ["Basketball", "Tennis", "Soccer", "Cricket"],
    answer: "Tennis",
    explain: "Serve dan ace umum di tenis.",
  },
  {
    type: "mcq",
    question: "Siapa presiden pertama Amerika Serikat?",
    options: [
      "Abraham Lincoln",
      "George Washington",
      "Thomas Jefferson",
      "John Adams",
    ],
    answer: "George Washington",
    explain: "George Washington adalah presiden pertama AS.",
  },
  {
    type: "mcq",
    question: "Apa nama atom bermuatan negatif?",
    options: ["Proton", "Neutron", "Elektron", "Ion"],
    answer: "Elektron",
    explain: "Elektron bermuatan negatif.",
  },
  {
    type: "mcq",
    question: "Kontinen tempat Rusia berada sebagian besar adalah?",
    options: ["Afrika", "Eropa & Asia", "Amerika Utara", "Australia"],
    answer: "Eropa & Asia",
    explain: "Rusia melintasi Eropa dan Asia.",
  },
  {
    type: "mcq",
    question: "Apa nama ibukota Korea Selatan?",
    options: ["Busan", "Seoul", "Pyongyang", "Incheon"],
    answer: "Seoul",
    explain: "Seoul adalah ibu kota Korea Selatan.",
  },
  {
    type: "mcq",
    question: "Apa hasil dari 15 + 27?",
    options: ["42", "32", "52", "40"],
    answer: "42",
    explain: "15 + 27 = 42.",
  },
  {
    type: "mcq",
    question: "Pulau terbesar di dunia adalah?",
    options: ["Greenland", "New Guinea", "Borneo", "Madagaskar"],
    answer: "Greenland",
    explain: "Greenland adalah pulau terbesar.",
  },
  {
    type: "mcq",
    question: "Apa bahasa resmi di Argentina?",
    options: ["Spanyol", "Portugis", "Prancis", "Italia"],
    answer: "Spanyol",
    explain: "Spanyol adalah bahasa resmi Argentina.",
  },
  {
    type: "mcq",
    question: "Apa nama presiden pertama Indonesia?",
    options: ["Sukarno", "Suharto", "Habibie", "Gus Dur"],
    answer: "Sukarno",
    explain: "Sukarno adalah presiden pertama Indonesia.",
  },
  {
    type: "mcq",
    question: "Benda langit yang menyinari Bumi di siang hari adalah?",
    options: ["Bulan", "Matahari", "Mars", "Venus"],
    answer: "Matahari",
    explain: "Matahari adalah sumber cahaya siang hari.",
  },
  {
    type: "mcq",
    question: "Satuan suhu dalam sistem SI adalah?",
    options: ["Celsius", "Fahrenheit", "Kelvin", "Rankine"],
    answer: "Kelvin",
    explain: "Kelvin adalah satuan suhu dasar SI.",
  },
  {
    type: "mcq",
    question: "Balapan mobil Formula 1 biasanya berlangsung di sirkuit?",
    options: [
      "Oval track",
      "Street circuit",
      "Road course (sirkuit permanen)",
      "Semua benar",
    ],
    answer: "Semua benar",
    explain:
      "Formula 1 menggunakan berbagai tipe sirkuit termasuk jalan raya, sirkuit permanen, dll.",
  },
  {
    type: "tf",
    question: "Benua Antarctica tidak memiliki penduduk asli yang permanen.",
    answer: "True",
    explain:
      "Antartika tidak memiliki penduduk asli permanen; hanya peneliti sementara.",
  },
  {
    type: "tf",
    question: "Air mendidih pada 100°C pada tekanan permukaan laut.",
    answer: "True",
    explain: "Pada tekanan 1 atm, air murni mendidih pada 100°C.",
  },
  {
    type: "tf",
    question: "Banyak satelit buatan Bumi mengorbit di luar angkasa.",
    answer: "True",
    explain: "Ada ribuan satelit buatan mengorbit Bumi.",
  },
  {
    type: "text",
    question: "Sebutkan singkatan dari 'UN' dalam bahasa Inggris.",
    answer: "United Nations",
    explain: "UN = United Nations (Perserikatan Bangsa-Bangsa).",
  },
  {
    type: "text",
    question: "Berapa jumlah provinsi di Indonesia (jawab angka)?",
    answer: "38",
    explain: "Sejak 2022 Indonesia memiliki 38 provinsi.",
  },
];

// shuffle function
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// state
let order = shuffle(Array.from({ length: QUESTIONS.length }, (_, i) => i));
let currentIdx = 0;
let answers = Array(QUESTIONS.length).fill(null);
let scoreBestKey = "quiz50_best_score_v1";

// elements
const card = document.getElementById("card");
const timerEl = document.getElementById("timer");
const progressBar = document.getElementById("progressBar");
const bestEl = document.getElementById("best");

function loadBest() {
  const data = localStorage.getItem(scoreBestKey);
  if (data) {
    bestEl.textContent = "Best: " + data;
  } else {
    bestEl.textContent = "Best: -";
  }
}
loadBest();

function startTimer() {
  timerInterval = setInterval(function () {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      finishQuiz();
    }
  }, 1000);
}
function updateTimer() {
  const m = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const s = String(timeLeft % 60).padStart(2, "0");
  timerEl.textContent = m + ":" + s;
}
updateTimer();
startTimer();

function renderQuestion() {
  var qIdx = order[currentIdx];
  var q = QUESTIONS[qIdx];
  card.innerHTML = "";
  var num = document.createElement("div");
  num.className = "q-number";
  num.textContent = "Soal " + (currentIdx + 1) + " dari " + QUESTIONS.length;
  card.appendChild(num);
  var qtext = document.createElement("div");
  qtext.className = "question";
  qtext.innerHTML = q.question;
  card.appendChild(qtext);
  var opts = document.createElement("div");
  opts.className = "options";
  if (q.type === "mcq") {
    q.options.forEach(function (opt) {
      var label = document.createElement("label");
      label.className = "option";
      var input = document.createElement("input");
      input.type = "radio";
      input.name = "answer";
      input.value = opt;
      input.addEventListener("change", function () {
        answers[qIdx] = input.value;
      });
      label.appendChild(input);
      var span = document.createElement("span");
      span.textContent = opt;
      label.appendChild(span);
      opts.appendChild(label);
    });
  } else if (q.type === "tf") {
    ["True", "False"].forEach(function (val) {
      var label = document.createElement("label");
      label.className = "option";
      var input = document.createElement("input");
      input.type = "radio";
      input.name = "answer";
      input.value = val;
      input.addEventListener("change", function () {
        answers[qIdx] = input.value;
      });
      label.appendChild(input);
      var span = document.createElement("span");
      span.textContent = val === "True" ? "Benar" : "Salah";
      label.appendChild(span);
      opts.appendChild(label);
    });
  } else if (q.type === "text") {
    var input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Ketik jawaban...";
    input.className = "option";
    input.addEventListener("input", function (e) {
      answers[qIdx] = e.target.value;
    });
    opts.appendChild(input);
  }
  card.appendChild(opts);
  // show previously selected
  if (answers[qIdx] !== null) {
    var inputs = card.querySelectorAll("input");
    inputs.forEach(function (inp) {
      if (inp.type === "radio" && inp.value === answers[qIdx])
        inp.checked = true;
      if (inp.type === "text") inp.value = answers[qIdx];
    });
  }
  updateProgress();
}

function updateProgress() {
  var pct = Math.round((currentIdx / QUESTIONS.length) * 100);
  progressBar.style.width = pct + "%";
}

function checkAnswerAndNext() {
  var qIdx = order[currentIdx];
  var q = QUESTIONS[qIdx];
  var user = answers[qIdx];
  var correct = false;
  if (q.type === "mcq" || q.type === "text") {
    if (user != null) {
      if (typeof q.answer === "string")
        correct = user.trim().toLowerCase() === q.answer.trim().toLowerCase();
      else correct = user === q.answer;
    }
  } else if (q.type === "tf") {
    if (user != null) correct = String(user) === String(q.answer);
  }
  // show feedback colors briefly
  var opts = card.querySelectorAll(".option");
  opts.forEach(function (optEl) {
    optEl.classList.remove("correct", "wrong");
  });
  // remove old feedback messages
  var oldFb = card.querySelectorAll(".feedback");
  oldFb.forEach(function (n) {
    n.remove();
  });
  if (user == null || user === "") {
    // no answer selected
    card
      .querySelector(".question")
      .insertAdjacentHTML(
        "afterend",
        '<div class="feedback small">Belum menjawab. Jawaban akan dianggap salah jika dilanjutkan.</div>'
      );
  } else if (correct) {
    // mark chosen as correct
    opts.forEach(function (optEl) {
      var inp = optEl.querySelector("input");
      if (inp) {
        if (
          inp.value &&
          inp.value.toString().toLowerCase() ===
            q.answer.toString().toLowerCase()
        )
          optEl.classList.add("correct");
      }
    });
  } else {
    // mark correct & wrong
    opts.forEach(function (optEl) {
      var inp = optEl.querySelector("input");
      if (inp) {
        if (
          inp.value &&
          inp.value.toString().toLowerCase() ===
            q.answer.toString().toLowerCase()
        )
          optEl.classList.add("correct");
        if (inp.checked) optEl.classList.add("wrong");
      }
    });
    if (q.type === "text") {
      card
        .querySelector(".question")
        .insertAdjacentHTML(
          "afterend",
          '<div class="feedback small">Kunci: <b>' + q.answer + "</b></div>"
        );
    }
  }
  // proceed next after short delay
  setTimeout(function () {
    currentIdx++;
    if (currentIdx >= QUESTIONS.length) finishQuiz();
    else renderQuestion();
  }, 700);
}

function finishQuiz() {
  clearInterval(timerInterval); // calculate score
  var points = 0;
  for (var i = 0; i < QUESTIONS.length; i++) {
    var q = QUESTIONS[i];
    var user = answers[i];
    if (user != null && user !== "") {
      if (q.type === "text") {
        if (user.trim().toLowerCase() === q.answer.trim().toLowerCase())
          points++;
      } else {
        if (String(user).toLowerCase() === String(q.answer).toLowerCase())
          points++;
      }
    }
  }
  // show modal
  var modal = document.getElementById("resultModal");
  var text = document.getElementById("resultText");
  text.innerHTML =
    "Skor: <b>" +
    points +
    "</b> / " +
    QUESTIONS.length +
    " <br>Waktu tersisa: " +
    timeLeft +
    " detik";
  modal.classList.remove("hidden");
  // save best
  var prev = parseInt(localStorage.getItem(scoreBestKey) || "0", 10);
  if (points > prev) {
    localStorage.setItem(scoreBestKey, String(points));
    loadBest();
  }
}

// navigation buttons
document.getElementById("next").addEventListener("click", checkAnswerAndNext);
document.getElementById("skip").addEventListener("click", function () {
  currentIdx++;
  if (currentIdx >= QUESTIONS.length) finishQuiz();
  else renderQuestion();
});
document.getElementById("prev").addEventListener("click", function () {
  if (currentIdx > 0) {
    currentIdx--;
    renderQuestion();
  }
});
document.getElementById("finish").addEventListener("click", finishQuiz);

// share via whatsapp
document.getElementById("share").addEventListener("click", function () {
  var scoreText = localStorage.getItem(scoreBestKey) || "-";
  var url = encodeURIComponent(window.location.href);
  var text = encodeURIComponent(
    "Aku main Quiz 50 Soal dan skor terbaikku: " +
      scoreText +
      ". Coba kamu juga! " +
      url
  );
  window.open("https://api.whatsapp.com/send?text=" + text, "_blank");
});

// modal buttons
document.getElementById("retry").addEventListener("click", function () {
  location.reload();
});
document.getElementById("close").addEventListener("click", function () {
  document.getElementById("resultModal").classList.add("hidden");
});

// initial render
renderQuestion();
