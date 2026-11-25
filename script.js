
/* =========================================
   NURSETUTOR AI - OFFLINE LEARNING ENGINE
   Version 1.0
========================================= */

const $ = id => document.getElementById(id);

const STORAGE_KEY = "nurseTutorAI_progress";

let progress = JSON.parse(
  localStorage.getItem(STORAGE_KEY) || '{"completedQuizzes":0,"quizHistory":[]}'
);

// =========================================
// NURSING LEARNING CONTENT
// =========================================

const nursingTopics = [
  {
    id: 1,
    title: "Introduction to Nursing",
    category: "Fundamentals of Nursing",
    description: "Explore the meaning, purpose and fundamental principles of nursing.",
    content: `
      Nursing is a profession focused on promoting health,
      preventing illness, supporting recovery and providing
      compassionate care.

      Important areas include:
      • Health promotion
      • Disease prevention
      • Patient education
      • Nursing assessment
      • Patient advocacy
      • Safe and respectful care

      Nursing practice requires professional knowledge,
      ethical conduct, communication and teamwork.
    `
  },
  {
    id: 2,
    title: "Infection Prevention and Control",
    category: "Fundamentals of Nursing",
    description: "Learn the principles of preventing and controlling infections.",
    content: `
      Infection prevention and control involves practices
      that reduce the spread of microorganisms.

      Important principles include:
      • Hand hygiene
      • Appropriate use of personal protective equipment
      • Safe handling of equipment
      • Environmental cleanliness
      • Safe waste disposal
      • Standard precautions

      Always follow approved infection prevention guidelines
      and local clinical policies.
    `
  },
  {
    id: 3,
    title: "Vital Signs",
    category: "Basic Nursing Skills",
    description: "Understand the importance of monitoring vital signs.",
    content: `
      Vital signs are clinical measurements used to assess
      important functions of the human body.

      The main vital signs are:
      • Body temperature
      • Pulse
      • Respiratory rate
      • Blood pressure

      Oxygen saturation is also commonly monitored.

      Measurements must be interpreted using the patient's
      age, condition, clinical context and approved reference
      ranges. Abnormal findings should be reported promptly
      according to clinical policy.
    `
  },
  {
    id: 4,
    title: "Patient Communication",
    category: "Professional Nursing Practice",
    description: "Explore effective communication in nursing care.",
    content: `
      Therapeutic communication helps nurses build trust
      and understand patients' needs.

      Important communication skills include:
      • Active listening
      • Respectful language
      • Empathy
      • Appropriate questioning
      • Confidentiality
      • Clear documentation

      Nurses should communicate in ways that respect
      patients' dignity, culture and preferences.
    `
  },
  {
    id: 5,
    title: "Patient Safety",
    category: "Fundamentals of Nursing",
    description: "Understand basic principles of safe patient care.",
    content: `
      Patient safety involves reducing preventable harm
      during healthcare delivery.

      Important principles include:
      • Correct patient identification
      • Effective communication
      • Infection prevention
      • Safe medication practices
      • Accurate documentation
      • Reporting safety concerns

      Always follow professional standards and facility
      protocols.
    `
  }
];

// =========================================
// QUESTION BANK
// =========================================

const questionBank = [
  {
    question: "Which of the following is a major goal of nursing?",
    options: [
      "Promoting health",
      "Ignoring patient concerns",
      "Avoiding patient education",
      "Preventing communication"
    ],
    answer: 0,
    explanation: "Promoting health is one of the central goals of nursing."
  },
  {
    question: "Which practice is important for infection prevention?",
    options: [
      "Sharing unclean equipment",
      "Hand hygiene",
      "Ignoring protective equipment",
      "Reusing contaminated materials"
    ],
    answer: 1,
    explanation: "Hand hygiene helps reduce the transmission of microorganisms."
  },
  {
    question: "Which measurement is considered a vital sign?",
    options: [
      "Hair length",
      "Blood pressure",
      "Shoe size",
      "Eye colour"
    ],
    answer: 1,
    explanation: "Blood pressure is one of the main vital signs."
  },
  {
    question: "Which skill supports therapeutic communication?",
    options: [
      "Active listening",
      "Interrupting constantly",
      "Ignoring questions",
      "Using disrespectful language"
    ],
    answer: 0,
    explanation: "Active listening helps nurses understand patients' concerns."
  },
  {
    question: "What is an important part of patient safety?",
    options: [
      "Guessing patient identities",
      "Ignoring safety concerns",
      "Correct patient identification",
      "Avoiding documentation"
    ],
    answer: 2,
    explanation: "Correct patient identification is an important safety practice."
  }
];

// =========================================
// SAVE AND LOAD PROGRESS
// =========================================

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function updateDashboard() {
  $("topicsCount").textContent = nursingTopics.length;
  $("questionsCount").textContent = questionBank.length;
  $("completedCount").textContent = progress.completedQuizzes;
}

// =========================================
// NURSING TUTOR
// =========================================

function showTutor() {
  $("workspace").innerHTML = `
    <h2>🤖 Nursing Tutor</h2>
    <p>Enter a nursing topic to explore available learning materials.</p>

    <input
      type="text"
      id="tutorInput"
      placeholder="Example: infection prevention"
    >

    <button class="action-button" id="tutorButton">
      Explore Topic
    </button>

    <div id="tutorResponse"></div>
  `;

  $("tutorButton").addEventListener("click", answerTutor);

  $("tutorInput").addEventListener("keydown", event => {
    if (event.key === "Enter") answerTutor();
  });
}

function answerTutor() {
  const input = $("tutorInput").value.trim().toLowerCase();

  if (!input) {
    $("tutorResponse").innerHTML = "<p>Please enter a topic.</p>";
    return;
  }

  const topic = nursingTopics.find(item =>
    item.title.toLowerCase().includes(input) ||
    item.category.toLowerCase().includes(input) ||
    item.description.toLowerCase().includes(input) ||
    item.content.toLowerCase().includes(input)
  );

  if (!topic) {
    $("tutorResponse").innerHTML = `
      <p>No matching topic was found in the current offline library.</p>
      <p>Try: nursing, infection, vital signs, communication or safety.</p>
    `;
    return;
  }

  $("tutorResponse").innerHTML = `
    <div class="learning-result">
      <h3>${topic.title}</h3>
      <p>${topic.content.replace(/\n/g, "<br>")}</p>
    </div>
  `;
}

// =========================================
// STUDY MATERIALS
// =========================================

function showMaterials() {
  $("workspace").innerHTML = `
    <h2>📖 Study Materials</h2>
    <p>Choose a topic to begin studying.</p>
    <div id="materialsList"></div>
  `;

  const list = $("materialsList");

  nursingTopics.forEach(topic => {
    const card = document.createElement("div");
    card.className = "learning-result";

    const heading = document.createElement("h3");
    heading.textContent = topic.title;

    const description = document.createElement("p");
    description.textContent = topic.description;

    const button = document.createElement("button");
    button.className = "action-button";
    button.textContent = "Read Material";

    button.addEventListener("click", () => showTopic(topic.id));

    card.append(heading, description, button);
    list.appendChild(card);
  });
}

function showTopic(id) {
  const topic = nursingTopics.find(item => item.id === id);

  if (!topic) return;

  $("workspace").innerHTML = `
    <button class="back-button" id="backMaterials">← Back to Topics</button>
    <h2>${topic.title}</h2>
    <p class="topic-category">${topic.category}</p>
    <div class="learning-result">
      <p>${topic.content.replace(/\n/g, "<br>")}</p>
    </div>
  `;

  $("backMaterials").addEventListener("click", showMaterials);
}

// =========================================
// QUIZ CENTRE
// =========================================

let currentQuestion = 0;
let quizAnswers = [];

function showQuiz() {
  currentQuestion = 0;
  quizAnswers = [];

  $("workspace").innerHTML = `
    <h2>✍️ Quiz Centre</h2>
    <p>Test your knowledge of basic nursing concepts.</p>
    <div id="quizArea"></div>
  `;

  displayQuestion();
}

function displayQuestion() {
  const question = questionBank[currentQuestion];

  const area = $("quizArea");

  area.innerHTML = `
    <p class="quiz-progress">
      Question ${currentQuestion + 1} of ${questionBank.length}
    </p>

    <h3>${question.question}</h3>

    <div id="quizOptions"></div>

    <button class="action-button" id="nextQuestion">
      ${currentQuestion === questionBank.length - 1 ? "Submit Quiz" : "Next Question"}
    </button>
  `;

  const options = $("quizOptions");

  question.options.forEach((option, index) => {
    const label = document.createElement("label");
    label.className = "quiz-option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "quizAnswer";
    radio.value = index;

    if (quizAnswers[currentQuestion] === index) {
      radio.checked = true;
    }

    label.append(radio, document.createTextNode(" " + option));
    options.appendChild(label);
  });

  $("nextQuestion").addEventListener("click", () => {
    const selected = document.querySelector('input[name="quizAnswer"]:checked');

    if (!selected) {
      alert("Please select an answer.");
      return;
    }

    quizAnswers[currentQuestion] = Number(selected.value);

    if (currentQuestion < questionBank.length - 1) {
      currentQuestion++;
      displayQuestion();
    } else {
      showQuizResults();
    }
  });
}

function showQuizResults() {
  let score = 0;

  questionBank.forEach((question, index) => {
    if (quizAnswers[index] === question.answer) {
      score++;
    }
  });

  progress.completedQuizzes++;
  progress.quizHistory.push({
    date: new Date().toISOString(),
    score,
    total: questionBank.length
  });

  saveProgress();
  updateDashboard();

  let review = "";

  questionBank.forEach((question, index) => {
    const correct = quizAnswers[index] === question.answer;

    review += `
      <div class="learning-result">
        <h3>Question ${index + 1}: ${correct ? "Correct" : "Incorrect"}</h3>
        <p><strong>Correct answer:</strong> ${question.options[question.answer]}</p>
        <p>${question.explanation}</p>
      </div>
    `;
  });

  $("workspace").innerHTML = `
    <h2>🏆 Quiz Results</h2>
    <h3 class="quiz-score">Your Score: ${score}/${questionBank.length}</h3>
    <p>${Math.round(score / questionBank.length * 100)}% achieved</p>
    <h3>Answer Review</h3>
    ${review}
    <button class="action-button" id="retryQuiz">Try Again</button>
  `;

  $("retryQuiz").addEventListener("click", showQuiz);
}

// =========================================
// LEARNING PROGRESS
// =========================================

function showProgress() {
  const history = progress.quizHistory || [];

  let historyHTML = history.length
    ? history.slice().reverse().map((item, index) => `
        <div class="learning-result">
          <strong>Quiz ${history.length - index}</strong>
          <p>Score: ${item.score}/${item.total}</p>
          <p>Date: ${new Date(item.date).toLocaleDateString()}</p>
        </div>
      `).join("")
    : "<p>You have not completed a quiz yet.</p>";

  $("workspace").innerHTML = `
    <h2>📊 My Learning Progress</h2>
    <div class="learning-result">
      <h3>Completed Quizzes</h3>
      <p>${progress.completedQuizzes}</p>
    </div>
    <h3>Quiz History</h3>
    ${historyHTML}
  `;
}

// =========================================
// CLINICAL LEARNING
// =========================================

function showClinical() {
  $("workspace").innerHTML = `
    <h2>🩺 Clinical Learning</h2>
    <p>Explore foundational clinical learning principles.</p>

    <div class="learning-result">
      <h3>Clinical Observation</h3>
      <p>Learn to observe patients carefully, collect relevant information and communicate changes to the supervising healthcare professional.</p>
    </div>

    <div class="learning-result">
      <h3>Professional Responsibility</h3>
      <p>Respect patient dignity, confidentiality, consent and professional boundaries.</p>
    </div>

    <div class="learning-result">
      <h3>Safe Clinical Practice</h3>
      <p>Follow approved procedures, seek supervision and report concerns promptly. Do not perform unfamiliar clinical procedures without appropriate training and supervision.</p>
    </div>
  `;
}

// =========================================
// ABOUT NURSETUTOR AI
// =========================================

function showAbout() {
  $("workspace").innerHTML = `
    <h2>ℹ️ About NurseTutor AI</h2>

    <div class="learning-result">
      <h3>Our Purpose</h3>
      <p>NurseTutor AI is an offline-first educational platform designed to support Registered General Nursing students in Ghana.</p>
    </div>

    <div class="learning-result">
      <h3>Learning Features</h3>
      <p>Study materials, topic exploration, practice questions and learning progress tracking.</p>
    </div>

    <div class="learning-result">
      <h3>Offline Learning</h3>
      <p>The current learning engine uses locally stored educational content. It does not require an external AI service.</p>
    </div>

    <div class="learning-result">
      <h3>Educational Disclaimer</h3>
      <p>Always compare learning materials with your approved curriculum and guidance from qualified nursing educators.</p>
    </div>
  `;
}

// =========================================
// NAVIGATION
// =========================================

const sections = {
  tutor: showTutor,
  materials: showMaterials,
  quiz: showQuiz,
  progress: showProgress,
  clinical: showClinical,
  about: showAbout
};

document.querySelectorAll("[data-section]").forEach(button => {
  button.addEventListener("click", () => {
    const section = button.dataset.section;

    if (sections[section]) {
      sections[section]();
    }
  });
});

// =========================================
// START APPLICATION
// =========================================

updateDashboard();

console.log("NurseTutor AI learning engine loaded successfully.");
    
