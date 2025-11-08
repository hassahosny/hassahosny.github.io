// --- عناصر الواجهة ---
const startScreen = document.getElementById('start-screen');
const examScreen = document.getElementById('exam-screen');
const scoreScreen = document.getElementById('score-screen');
const leaderboardScreen = document.getElementById('leaderboard-screen');

const studentNameInput = document.getElementById('student-name');
const startBtn = document.getElementById('start-btn');
const timerDisplay = document.getElementById('timer');
const leaderboardBtn = document.getElementById('leaderboard-btn');
const questionContainer = document.getElementById('question-container');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');

const scoreText = document.getElementById('score-text');
const restartBtn = document.getElementById('restart-btn');
const viewLeaderboardBtn = document.getElementById('view-leaderboard-btn');

const leaderboardList = document.getElementById('leaderboard-list');
const backToStartBtn = document.getElementById('back-to-start-btn');

// --- أسئلة الامتحان (30 سؤال بالإنجليزية) ---
const questions = [
    // Section 1: Fundamentals & Atomic Structure
    {
        question: "Which of the following is listed as a conventional source of energy in the document?",
        options: [
            "(a) Solar Power",
            "(b) Wind Energy",
            "(c) Fossil Fuel",
            "(d) Geothermal Energy"
        ],
        answer: "(c) Fossil Fuel"
    },
    {
        question: "What is the energy released by the complete fission of 1 kg of U-235 equivalent to?",
        options: [
            "(a) Burning 1000 tones of coal.",
            "(b) Burning 4500 tones of high-grade coal.",
            "(c) 1 kg of U-238.",
            "(d) 100 barrels of oil."
        ],
        answer: "(b) Burning 4500 tones of high-grade coal."
    },
    {
        question: "In the nuclear symbol ${}_{Z}^{A}X$, what does 'Z' represent?",
        options: [
            "(a) The mass number.",
            "(b) The atomic number, or number of protons.",
            "(c) The number of neutrons.",
            "(d) The number of electrons."
        ],
        answer: "(b) The atomic number, or number of protons."
    },
    {
        question: "What is the approximate mass of a proton in atomic mass units (amu)?",
        options: [
            "(a) 0.000549 amu",
            "(b) 1.6727 × 10⁻²⁴ amu",
            "(c) 1.007316 amu",
            "(d) 1.008701 amu"
        ],
        answer: "(c) 1.007316 amu"
    },
    {
        question: "What are nucleons?",
        options: [
            "(a) Only protons.",
            "(b) Only neutrons.",
            "(c) Electrons orbiting the nucleus.",
            "(d) Protons and neutrons as components of an atomic nucleus."
        ],
        answer: "(d) Protons and neutrons as components of an atomic nucleus."
    },
    {
        question: "What is the composition of natural Uranium?",
        options: [
            "(a) 99.282% U-238 and 0.712% U-235.",
            "(b) 99.282% U-235 and 0.712% U-238.",
            "(c) 50% U-235 and 50% U-238.",
            "(d) 100% U-235."
        ],
        answer: "(a) 99.282% U-238 and 0.712% U-235."
    },
    {
        question: "What is the definition of 'Isotopes'?",
        options: [
            "(a) Atoms with the same number of neutrons but different protons.",
            "(b) Atoms with the same mass number.",
            "(c) Atoms that have the same number of protons but differ in their masses.",
            "(d) Atoms that have the same number of electrons but different chemical properties."
        ],
        answer: "(c) Atoms that have the same number of protons but differ in their masses."
    },
    {
        question: "What is one Atomic Mass Unit (amu) defined as?",
        options: [
            "(a) The mass of a hydrogen atom.",
            "(b) 1.602 × 10⁻¹⁹ g",
            "(c) 1.6605 × 10⁻²⁴ g",
            "(d) The mass of a C-12 atom."
        ],
        answer: "(c) 1.6605 × 10⁻²⁴ g"
    },
    // Section 2: Energy, Mass & Binding Energy
    {
        question: "Energy released in a nuclear reaction corresponds to a change in mass according to which Einstein's law?",
        options: [
            "(a) E = hf",
            "(b) E = ½mv²",
            "(c) ΔE = Δm · C²",
            "(d) PV = nRT"
        ],
        answer: "(c) ΔE = Δm · C²"
    },
    {
        question: "What is the 'Mass Defect' (Δm)?",
        options: [
            "(a) The difference between the sum of masses of individual nucleons and the measured mass of the nucleus.",
            "(b) The mass of the electrons.",
            "(c) The mass lost during chemical reactions.",
            "(d) The mass converted to energy in fusion only."
        ],
        answer: "(a) The difference between the sum of masses of individual nucleons and the measured mass of the nucleus."
    },
    {
        question: "What is the energy equivalent of 1 amu?",
        options: [
            "(a) 1.602 × 10⁻¹⁹ J",
            "(b) 1.0 MeV",
            "(c) 931.58 MeV",
            "(d) 3.2 × 10⁻¹¹ J"
        ],
        answer: "(c) 931.58 MeV"
    },
    {
        question: "According to the binding energy curve, when is energy released by fusion?",
        options: [
            "(a) When a heavy-mass nucleus is broken.",
            "(b) When two light-mass nuclei are combined to form a heavier nucleus.",
            "(c) When a nucleus splits into exactly two equal parts.",
            "(d) When elements around Iron (Fe) are broken."
        ],
        answer: "(b) When two light-mass nuclei are combined to form a heavier nucleus."
    },
    {
        question: "According to the binding energy curve, which elements are generally the most stable?",
        options: [
            "(a) Nuclei with mass number < 20.",
            "(b) Nuclei with mass number > 140.",
            "(c) Nuclei with mass number in the range 20 to 60.",
            "(d) All elements have the same stability."
        ],
        answer: "(c) Nuclei with mass number in the range 20 to 60."
    },
    {
        question: "How do you balance a nuclear equation like ${}_{Z1}K^{A1} + {}_{Z2}L^{A2} = {}_{Z3}M^{A3} + {}_{Z4}N^{A4}$?",
        options: [
            "(a) Z₁ + Z₃ = Z₂ + Z₄ and A₁ + A₃ = A₂ + A₄",
            "(b) Z₁ + Z₂ = Z₃ + Z₄ and A₁ + A₂ = A₃ + A₄",
            "(c) Z₁ · Z₂ = Z₃ · Z₄",
            "(d) A₁ + Z₁ = A₃ + Z₃"
        ],
        answer: "(b) Z₁ + Z₂ = Z₃ + Z₄ and A₁ + A₂ = A₃ + A₄"
    },
    // Section 3: Fission, Fusion & Reactor Components
    {
        question: "What is 'Nuclear Fission'?",
        options: [
            "(a) When two or more light nuclei fuse to form a heavier nucleus.",
            "(b) When a heavy nucleus is split into two or more lighter nuclei.",
            "(c) The decay of a nucleus by emitting an alpha particle.",
            "(d) The process of converting U-238 to Pu-239."
        ],
        answer: "(b) When a heavy nucleus is split into two or more lighter nuclei."
    },
    {
        question: "What is the primary challenge in achieving a controlled 'Nuclear Fusion' reaction?",
        options: [
            "(a) The fuel (like H-2) is extremely rare.",
            "(b) The strong repulsion between positively charged nuclei (Coulomb repulsion).",
            "(c) The reaction absorbs energy (endothermic).",
            "(d) It produces more radioactive waste than fission."
        ],
        answer: "(b) The strong repulsion between positively charged nuclei (Coulomb repulsion)."
    },
    {
        question: "Which of these isotopes is fissionable by neutrons of all energies?",
        options: [
            "(a) U-238",
            "(b) Th-232",
            "(c) U-235",
            "(d) H-2"
        ],
        answer: "(c) U-235"
    },
    {
        question: "What is the function of the 'Moderator' in a nuclear reactor?",
        options: [
            "(a) To absorb neutrons and stop the reaction.",
            "(b) To reflect neutrons back into the core.",
            "(c) To slow down the fission neutrons.",
            "(d) To act as a biological shield."
        ],
        answer: "(c) To slow down the fission neutrons."
    },
    {
        question: "What is the function of 'Control Rods'?",
        options: [
            "(a) To moderate the speed of neutrons.",
            "(b) To absorb neutrons and control the rate of reaction.",
            "(c) To transfer heat from the core.",
            "(d) To provide structural support for the fuel."
        ],
        answer: "(b) To absorb neutrons and control the rate of reaction."
    },
    {
        question: "What is a 'Breeder Reactor'?",
        options: [
            "(a) A reactor that only uses U-235.",
            "(b) A reactor where more fissionable nuclei are produced than consumed.",
            "(c) A reactor that converts U-235 into U-238.",
            "(d) A reactor that can only be used for fuel generation, not power."
        ],
        answer: "(b) A reactor where more fissionable nuclei are produced than consumed."
    },
    // Section 4: Reactor Types
    {
        question: "In a Pressurized Water Reactor (PWR), how is heat transferred?",
        options: [
            "(a) Water boils directly in the reactor core.",
            "(b) Hot, pressurized water from the primary loop heats a separate secondary loop in a steam generator.",
            "(c) Liquid sodium is used to transfer heat.",
            "(d) CO₂ gas is heated by the fuel rods."
        ],
        answer: "(b) Hot, pressurized water from the primary loop heats a separate secondary loop in a steam generator."
    },
    {
        question: "What is a primary disadvantage of a Boiling Water Reactor (BWR)?",
        options: [
            "(a) It is more complex and has more components than a PWR.",
            "(b) It requires a separate pressurizer.",
            "(c) The turbine is contaminated with radioactivity.",
            "(d) It cannot use water as a coolant."
        ],
        answer: "(c) The turbine is contaminated with radioactivity."
    },
    {
        question: "In a Gas Cooled Reactor (GCR), what materials are typically used as the coolant and moderator?",
        options: [
            "(a) Coolant: Water, Moderator: Heavy Water",
            "(b) Coolant: Liquid Sodium, Moderator: None",
            "(c) Coolant: CO₂ or Helium, Moderator: Graphite",
            "(d) Coolant: Heavy Water, Moderator: Graphite"
        ],
        answer: "(c) Coolant: CO₂ or Helium, Moderator: Graphite"
    },
    {
        question: "A Heavy Water Reactor (HWR), like the CANDU reactor, has a unique advantage. What is it?",
        options: [
            "(a) It can use CO₂ gas as a coolant.",
            "(b) It operates at extremely high pressures.",
            "(c) It can use natural Uranium (0.7% U-235) as fuel.",
            "(d) It boils the heavy water directly in the core."
        ],
        answer: "(c) It can use natural Uranium (0.7% U-235) as fuel."
    },
    {
        question: "What is the process for converting fertile U-238 into fissionable Pu-239?",
        options: [
            "(a) U-238 captures a neutron, becomes U-239, which decays to Np-239 and then to Pu-239.",
            "(b) U-238 splits into Pu-239 and an alpha particle.",
            "(c) U-238 undergoes fusion.",
            "(d) U-238 captures a proton."
        ],
        answer: "(a) U-238 captures a neutron, becomes U-239, which decays to Np-239 and then to Pu-239."
    },
    // Section 5: Heat Release & Radioactive Decay
    {
        question: "For a flat plate (slab) fuel element, the temperature Tₛ at the fuel-cladding interface is given by:",
        options: [
            "(a) Tₛ = Tₘₐₓ + (q'''a²)/(2kբ)",
            "(b) Tₛ = Tₘₐₓ / (2kբ)",
            "(c) Tₛ = Tₘₐₓ - (q'''a²)/(2kբ)",
            "(d) Tₛ = q'''a² ⋅ 2kբ"
        ],
        answer: "(c) Tₛ = Tₘₐₓ - (q'''a²)/(2kբ)"
    },
    {
        question: "What is the general heat conduction equation in a fuel cladding (where no heat is generated)?",
        options: [
            "(a) d²T/dx² + q'''/kբ = 0",
            "(b) d²T/dx² = q'''",
            "(c) d²T/dx² = 0",
            "(d) d²T/dx² = k꜀"
        ],
        answer: "(c) d²T/dx² = 0"
    },
    {
        question: "For a cylindrical fuel rod, what is the heat conduction equation within the fuel?",
        options: [
            "(a) d²T/dr² + (1/r)dT/dr = 0",
            "(b) d²T/dr² + (1/r)dT/dr + q'''/kբ = 0",
            "(c) d²T/dr² + q'''/kբ = 0",
            "(d) q'''/kբ = 0"
        ],
        answer: "(b) d²T/dr² + (1/r)dT/dr + q'''/kբ = 0"
    },
    {
        question: "The 'Activity' (A) of a radioisotope is given by the equation:",
        options: [
            "(a) A = N₀e^(λθ)",
            "(b) A = λ / N",
            "(c) A = λN",
            "(d) A = N / λ"
        ],
        answer: "(c) A = λN"
    },
    {
        question: "What is the 'Half-life' (θ₁/₂)?",
        options: [
            "(a) The time it takes for the decay constant to double.",
            "(b) The time it takes for all nuclei to decay.",
            "(c) The time during which one-half of the radioactive nuclei decay.",
            "(d) Half of the total lifetime of an isotope."
        ],
        answer: "(c) The time during which one-half of the radioactive nuclei decay."
    }
];

// --- متغيرات حالة الامتحان ---
let currentQuestionIndex = 0;
let studentAnswers = [];
let timerInterval;
let timeLeft = 1800; // 30 دقيقة * 60 ثانية
let studentName = "";

// --- دوال الانتقال بين الشاشات ---
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// --- دوال الامتحان ---
function startExam() {
    studentName = studentNameInput.value.trim();
    if (studentName === "") {
        alert("Please enter your name");
        return;
    }
    
    currentQuestionIndex = 0;
    studentAnswers = new Array(questions.length).fill(null);
    timeLeft = 1800; // 30 دقيقة
    
    showScreen('exam-screen');
    displayQuestion();
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft <= 0) {
            endExam();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    questionContainer.innerHTML = `
        <h3>(${currentQuestionIndex + 1} / ${questions.length}) ${question.question}</h3>
        <div class="options-container">
            ${question.options.map(option => `
                <div class="option" data-value="${option}">${option}</div>
            `).join('')}
        </div>
    `;

    // إضافة مستمعي الأحداث (event listeners) للاختيارات
    document.querySelectorAll('.option').forEach(optionEl => {
        optionEl.addEventListener('click', () => {
            // إزالة التحديد السابق
            document.querySelectorAll('.option').forEach(el => el.classList.remove('selected'));
            // تحديد الاختيار الحالي
            optionEl.classList.add('selected');
            studentAnswers[currentQuestionIndex] = optionEl.dataset.value;
        });
    });

    // إظهار زر التسليم في السؤال الأخير
    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    }
}

function endExam() {
    clearInterval(timerInterval);

    // حساب النتيجة
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        if (studentAnswers[i] === questions[i].answer) {
            score++;
        }
    }
    
    const finalScore = (score / questions.length) * 100;
    scoreText.textContent = `Hello ${studentName}, your score is: ${score} out of ${questions.length} (${finalScore.toFixed(2)}%)`;
    
    saveScore(studentName, score);
    showScreen('score-screen');
}

// --- دوال لوحة الأوائل (Leaderboard) ---
function saveScore(name, score) {
    const scores = JSON.parse(localStorage.getItem('quizScores')) || [];
    scores.push({ name: name, score: score, total: questions.length, date: new Date().toLocaleString() });
    
    // ترتيب تنازلي حسب النتيجة
    scores.sort((a, b) => b.score - a.score);
    
    localStorage.setItem('quizScores', JSON.stringify(scores));
}

function displayLeaderboard() {
    const scores = JSON.parse(localStorage.getItem('quizScores')) || [];
    leaderboardList.innerHTML = ""; // مسح القائمة القديمة
    
    if (scores.length === 0) {
        leaderboardList.innerHTML = "<li>No scores recorded yet.</li>";
        return;
    }
    
    scores.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} <span class="score">${item.score} / ${item.total}</span>`;
        leaderboardList.appendChild(li);
    });
    
    showScreen('leaderboard-screen');
}

// --- ربط الأحداث ---
startBtn.addEventListener('click', startExam);
nextBtn.addEventListener('click', nextQuestion);
submitBtn.addEventListener('click', endExam);

// أزرار الانتقال
leaderboardBtn.addEventListener('click', displayLeaderboard);
viewLeaderboardBtn.addEventListener('click', displayLeaderboard);
restartBtn.addEventListener('click', () => window.location.reload());
backToStartBtn.addEventListener('click', () => window.location.reload());