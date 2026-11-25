
/* =========================================
   NURSETUTOR AI
   PROFESSIONAL OFFLINE LEARNING ENGINE
   Created & Developed by JOE TECH
   Version 2.0
========================================= */

const $ = id => document.getElementById(id);

const STORAGE_KEY = "nurseTutorAI_progress";

let progress;

try {
  progress = JSON.parse(
    localStorage.getItem(STORAGE_KEY) ||
    '{"completedQuizzes":0,"quizHistory":[]}'
  );
} catch (error) {
  progress = {
    completedQuizzes: 0,
    quizHistory: []
  };
}

if (
  !progress ||
  typeof progress !== "object" ||
  !Array.isArray(progress.quizHistory)
) {
  progress = {
    completedQuizzes: 0,
    quizHistory: []
  };
}

progress.completedQuizzes =
  Number(progress.completedQuizzes) || 0;

let currentSection = null;

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
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(progress)
    );
  } catch (error) {
    console.warn("Progress could not be saved.", error);
  }
}

function updateDashboard() {
  $("topicsCount").textContent = nursingTopics.length;
  $("questionsCount").textContent = questionBank.length;
  $("completedCount").textContent = progress.completedQuizzes;
}

// =========================================
// COMPACT NAVIGATION ENGINE
// =========================================

const sections = {
  tutor: showTutor,
  materials: showMaterials,
  quiz: showQuiz,
  progress: showProgress,
  clinical: showClinical,
  about: showAbout
};

function setDashboardVisibility(showDashboard) {
  const welcome = document.querySelector(".welcome");
  const dashboard = document.querySelector(".dashboard");
  const safety = document.querySelector(".safety-note");
  const footer = document.querySelector(".main-footer");

  welcome.style.display = showDashboard ? "" : "none";
  dashboard.style.display = showDashboard ? "" : "none";
  safety.style.display = showDashboard ? "" : "none";
  footer.style.display = showDashboard ? "" : "none";
}

function updateNavigation(section) {
  document.querySelectorAll("[data-section]").forEach(button => {
    const active = button.dataset.section === section;

    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function showDashboard() {
  currentSection = null;

  setDashboardVisibility(true);
  updateNavigation(null);

  $("workspace").innerHTML = `
    <div class="empty-state">
      <span>🎓</span>
      <h2>Welcome to NurseTutor AI</h2>
      <p>Select a learning feature from the navigation panel
      to begin your learning session.</p>
    </div>
  `;

  document.querySelector(".section-heading h2").textContent =
    "Your Learning Centre";

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderWorkspace(html, backAction = showDashboard) {
  const workspace = $("workspace");

  workspace.innerHTML = html;

  const backButton = document.createElement("button");

  backButton.className = "back-button";
  backButton.textContent = "← Back";
  backButton.addEventListener("click", backAction);

  workspace.prepend(backButton);
}

function openSection(section) {
  if (!sections[section]) return;

  currentSection = section;

  setDashboardVisibility(false);
  updateNavigation(section);

  const titles = {
    tutor: "Nursing Tutor",
    materials: "Study Materials",
    quiz: "Quiz Centre",
    progress: "My Learning Progress",
    clinical: "Clinical Learning",
    about: "About NurseTutor AI"
  };

  document.querySelector(".section-heading h2").textContent =
    titles[section];

  sections[section]();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-section]").forEach(button => {
  button.addEventListener("click", () => {
    openSection(button.dataset.section);
  });
});

// =========================================
// NURSING TUTOR
// =========================================

function showTutor() {
  renderWorkspace(`
    <h2>🤖 Nursing Tutor</h2>

    <p>Explore available nursing topics in your offline learning library.</p>

    <input
      type="text"
      id="tutorInput"
      placeholder="Example: infection prevention"
      aria-label="Enter a nursing topic"
    >

    <button class="action-button" id="tutorButton">
      Explore Topic
    </button>

    <div id="tutorResponse"></div>
  `);

  $("tutorButton").addEventListener("click", answerTutor);

  $("tutorInput").addEventListener("keydown", event => {
    if (event.key === "Enter") answerTutor();
  });
}

function answerTutor() {
  const input = $("tutorInput").value.trim().toLowerCase();

  if (!input) {
    $("tutorResponse").textContent = "Please enter a topic.";
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
      <div class="learning-result">
        <h3>No matching topic found</h3>
        <p>Try nursing, infection, vital signs,
        communication or safety.</p>
      </div>
    `;
    return;
  }

  const result = document.createElement("div");
  result.className = "learning-result";

  const heading = document.createElement("h3");
  heading.textContent = topic.title;

  const category = document.createElement("p");
  category.className = "topic-category";
  category.textContent = topic.category;

  const content = document.createElement("p");
  content.textContent = topic.content;

  result.append(heading, category, content);

  $("tutorResponse").replaceChildren(result);
}

// =========================================
// STUDY MATERIALS
// =========================================

function showMaterials() {
  renderWorkspace(`
    <h2>📚 Study Materials</h2>
    <p>Choose a topic to begin studying.</p>
    <div id="materialsList"></div>
  `);

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

  renderWorkspace(`
    <h2>${topic.title}</h2>
    <p class="topic-category">${topic.category}</p>

    <div class="learning-result">
      <p id="topicContent"></p>
    </div>
  `, showMaterials);

  $("topicContent").textContent = topic.content;
}

// =========================================
// QUIZ CENTRE
// =========================================

let currentQuestion = 0;
let quizAnswers = [];

function showQuiz() {
  currentQuestion = 0;
  quizAnswers = [];

  renderWorkspace(`
    <h2>✍️ Quiz Centre</h2>
    <p>Test your knowledge of basic nursing concepts.</p>
    <div id="quizArea"></div>
  `);

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
      ${currentQuestion === questionBank.length - 1
        ? "Submit Quiz"
        : "Next Question"}
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
    const selected = document.querySelector(
      'input[name="quizAnswer"]:checked'
    );

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

  renderWorkspace(`
    <h2>🏆 Quiz Results</h2>

    <h3 class="quiz-score">
      Your Score: ${score}/${questionBank.length}
    </h3>

    <p>${Math.round(score / questionBank.length * 100)}% achieved</p>

    <h3>Answer Review</h3>

    <div id="answerReview"></div>

    <button class="action-button" id="retryQuiz">
      Try Again
    </button>
  `);

  const review = $("answerReview");

  questionBank.forEach((question, index) => {
    const correct = quizAnswers[index] === question.answer;

    const card = document.createElement("div");
    card.className = "learning-result";

    const heading = document.createElement("h3");
    heading.textContent =
      `Question ${index + 1}: ${correct ? "Correct" : "Incorrect"}`;

    const answer = document.createElement("p");
    answer.textContent =
      `Correct answer: ${question.options[question.answer]}`;

    const explanation = document.createElement("p");
    explanation.textContent = question.explanation;

    card.append(heading, answer, explanation);
    review.appendChild(card);
  });

  $("retryQuiz").addEventListener("click", showQuiz);
}

// =========================================
// LEARNING PROGRESS
// =========================================

function showProgress() {
  const history = progress.quizHistory || [];

  renderWorkspace(`
    <h2>📊 My Learning Progress</h2>

    <div class="learning-result">
      <h3>Completed Quizzes</h3>
      <p>${progress.completedQuizzes}</p>
    </div>

    <h3>Quiz History</h3>

    <div id="historyList"></div>
  `);

  const list = $("historyList");

  if (!history.length) {
    const message = document.createElement("p");
    message.textContent = "You have not completed a quiz yet.";
    list.appendChild(message);
    return;
  }

  history.slice().reverse().forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "learning-result";

    const heading = document.createElement("h3");
    heading.textContent = `Quiz ${history.length - index}`;

    const score = document.createElement("p");
    score.textContent = `Score: ${item.score}/${item.total}`;

    const date = document.createElement("p");
    date.textContent =
      `Date: ${new Date(item.date).toLocaleDateString()}`;

    card.append(heading, score, date);
    list.appendChild(card);
  });
}

// =========================================
// CLINICAL LEARNING
// =========================================

function showClinical() {
  renderWorkspace(`
    <h2>🩺 Clinical Learning</h2>

    <p>Explore foundational clinical learning principles.</p>

    <div class="learning-result">
      <h3>Clinical Observation</h3>
      <p>Learn to observe patients carefully, collect relevant
      information and communicate changes to the supervising
      healthcare professional.</p>
    </div>

    <div class="learning-result">
      <h3>Professional Responsibility</h3>
      <p>Respect patient dignity, confidentiality, consent
      and professional boundaries.</p>
    </div>

    <div class="learning-result">
      <h3>Safe Clinical Practice</h3>
      <p>Follow approved procedures, seek supervision and
      report concerns promptly. Do not perform unfamiliar
      clinical procedures without appropriate training
      and supervision.</p>
    </div>
  `);
}

// =========================================
// ABOUT NURSETUTOR AI
// =========================================

function showAbout() {
  renderWorkspace(`
    <h2>ℹ️ About NurseTutor AI</h2>

    <div class="learning-result">
      <h3>Our Purpose</h3>
      <p>NurseTutor AI is an offline-first educational
      platform designed to support Registered General
      Nursing students in Ghana.</p>
    </div>

    <div class="learning-result">
      <h3>Learning Features</h3>
      <p>Study materials, topic exploration, practice
      questions and learning progress tracking.</p>
    </div>

    <div class="learning-result">
      <h3>Offline Learning</h3>
      <p>The current learning engine uses locally stored
      educational content. It does not require an external
      AI service. Full offline website access will be
      added through the PWA upgrade.</p>
    </div>

    <div class="learning-result">
      <h3>Creator & Developer</h3>
      <p><strong>JOE TECH</strong></p>
      <p>NurseTutor AI is created and developed by JOE TECH.</p>
    </div>

    <div class="learning-result">
      <h3>Educational Disclaimer</h3>
      <p>Always compare learning materials with your
      approved curriculum and guidance from qualified
      nursing educators.</p>
    </div>
  `);
}

// =========================================
// START APPLICATION
// =========================================

updateDashboard();
showDashboard();

console.log(
  "NurseTutor AI Version 2.0 loaded successfully."
);
       
