import React, { useState, useEffect } from 'react';
import './index.css';
import logo from './assets/logomain.png';


const learnTitles = [
  "React Setup + JSX Basics",
  "State & Events",
  "Conditional Rendering & Lists",
  "Reusable Components + Styling",
  "useEffect & Side Effects",
  "Forms & Formik",
  "Routing with React Router",
  "Dynamic Routing & Params",
  "Lifting State Up & Data Sharing",
  "useContext for Global State",
  "Custom Hooks",
  "Redux Toolkit",
  "Data Manipulation (map, filter, reduce)",
  "Final Project + Optimization"
];

const learnPlan = [
    // Day 1
  [
    "Install Vite and create React project",
    "Understand JSX syntax and rules",
    "Create functional components",
    "Use props and children to pass data",
    "Mini Task: Make a UserCard component using props"
  ],
  // Day 2
  [
    "Learn useState hook",
    "Handle button click events",
    "Create controlled input fields",
    "Mini Task: Counter app with reset"
  ],
  // Day 3
  [
    "Render elements conditionally with if/ternary/&&",
    "Use .map() to render lists",
    "Understand React key prop importance",
    "Mini Task: Display a to-do list with delete feature"
  ],
  // Day 4
  [
    "Split UI into reusable components",
    "Create reusable Button and Card",
    "Apply custom CSS or CSS modules",
    "Mini Task: Styled card and button layout"
  ],
  // Day 5
  [
    "Learn useEffect for lifecycle control",
    "Run effects on mount, update, and unmount",
    "Fetch data from JSONPlaceholder",
    "Mini Task: Fetch and display users with loading state"
  ],
  // Day 6
  [
    "Create forms with controlled inputs",
    "Validate inputs manually",
    "Install and use Formik + Yup",
    "Mini Task: Signup form with validation"
  ],
  // Day 7
  [
    "Install react-router-dom",
    "Setup Routes and Links",
    "Create multi-page layout (Home, About, Profile)",
    "Mini Task: Navigation between routes"
  ],
  // Day 8
  [
    "Use useParams and useNavigate",
    "Create dynamic route for user/profile",
    "Mini Task: Navigate from user list to individual user details"
  ],
  // Day 9
  [
    "Pass data from child to parent",
    "Lift shared state to common ancestor",
    "Mini Task: Filter/search items from a list"
  ],
  // Day 10
  [
    "Create context and provide it",
    "Consume context across multiple components",
    "Mini Task: Theme switcher using useContext"
  ],
  // Day 11
  [
    "Understand when to extract custom logic",
    "Create a useLocalStorage hook",
    "Mini Task: Store to-do items in localStorage using custom hook"
  ],
  // Day 12
  [
    "Install @reduxjs/toolkit & react-redux",
    "Setup store, slice, actions",
    "Mini Task: Global counter using Redux"
  ],
  // Day 13
  [
    "Use map, filter, reduce in JSX",
    "Sort and search lists",
    "Mini Task: Product filter with category & price"
  ],
  // Day 14
  [
    "Clean and restructure folders",
    "Apply code-splitting with lazy loading",
    "Use memoization (useMemo, React.memo)",
    "Final Task: Complete and polish mini project"
  ]
];



const powerCards = [
  { title: "React Seedling 🌱", desc: "You're born in the React universe." },
  { title: "JSX Jutsu ✨", desc: "Mastered JSX like a shinobi scroll." },
  { title: "Props Paladin 🛡️", desc: "Passed data with power!" },
  { title: "State Slayer ⚔️", desc: "useState? EZ!" },
  { title: "Event Bender 🔥", desc: "Events bend to your will." },
  { title: "Render Ranger 🧙", desc: "Conditions obey your logic." },
  { title: "List Lord 🧾", desc: "Mapped your way to glory." },
  { title: "Effect Enchanter 🧪", desc: "Side effects? No sweat." },
  { title: "Form Fighter 📝", desc: "Controlled every field." },
  { title: "State Uplifter 🧼", desc: "Shared state like a pro." },
  { title: "Router Rider 🧭", desc: "You rode the route dragon!" },
  { title: "Ref Wizard 🔮", desc: "Focused the unseen DOM." },
  { title: "Hook Alchemist ⚗️", desc: "Custom logic = max reuse." },
  { title: "Deployer Hero 🚀", desc: "Your app is live!" },
];

const App = () => {
  const getLS = (key, fallback) => JSON.parse(localStorage.getItem(key)) || fallback;
  const setLS = (key, val) => localStorage.setItem(key, JSON.stringify(val));

  const [day, setDay] = useState(getLS("day", 1));
  const [xp, setXp] = useState(getLS("xp", 0));
  const [streak, setStreak] = useState(getLS("streak", 0));
  const [tasks, setTasks] = useState(getLS("tasks", learnPlan[0].map(t => ({ text: t, done: false }))));
  const [cards, setCards] = useState(getLS("cards", []));
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    setLS("day", day);
    setLS("xp", xp);
    setLS("streak", streak);
    setLS("tasks", tasks);
    setLS("cards", cards);
  }, [day, xp, streak, tasks, cards]);

  const completeTask = (index) => {
  const updated = [...tasks];
  const wasDone = updated[index].done;
  updated[index].done = !wasDone;
  setTasks(updated);
  setXp(xp + (wasDone ? -10 : 10));
  };

  const nextDay = () => {
  if (day >= 14) return;
  if (!tasks.every(t => t.done)) return alert("Complete all tasks first!");
  const next = day + 1;
  setDay(next);
  setStreak(streak + 1);
  setTasks(learnPlan[next - 1].map(t => ({ text: t, done: false })));
  setCards([...cards, powerCards[day - 1]]);
  };

  const resetGame = () => {
    if (!window.confirm("Reset your journey?")) return;
    setDay(1);
    setXp(0);
    setStreak(0);
    setCards([]);
    setTasks(learnPlan[0].map(t => ({ text: t, done: false })));
  };

  return (
    <div className="app">
      <img className='logo' src={logo} alt="Mission Boom Logo" width="120" height="100" />
      <div className="topbar">
        <div>📅 Day {day}/14</div>
        <div>🔥 Streak: {streak}</div>
        <div>🧠 XP: {xp}</div>
        <button className="reset-btn" onClick={resetGame}>Reset</button>
      </div>

      <div className="glass">
      
        <h2 className='today-task-title day-title'>Day {day}</h2>
        <h2 className='today-task-title'>{learnTitles[day - 1]}</h2>
<div className="task-list">
  {tasks.map((task, i) => (
    <label key={i} className={`task-card ${task.done ? 'done' : ''}`}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => completeTask(i)}
      />
      <span>{task.text}</span>
    </label>
  ))}
</div>
        <button className="btn next-btn" onClick={nextDay}>Next Day </button>
      </div>

      <div className="glass">
        <h2 className='today-task-title'>🗺️ Progress Map</h2>
        <div className="progress">
          {[...Array(14)].map((_, i) => (
            <div key={i} className={`dot ${i < day ? 'filled' : ''}`}>{i + 1}</div>
          ))}
        </div>
      </div>

      <div className="glass">
        <h2 className='today-task-title'>🃏 Power Cards</h2>
        <button className="btn" onClick={() => setShowCards(!showCards)}>
          {showCards ? "Hide Cards" : "Show Cards"}
        </button>
        {showCards && (
          <div className="card-grid"> 
            {cards.map((card, i) => (
              <div className="card" key={i}>
                <h3>{card.title}</h3>
                <p>{card.desc}</p> 
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="mentor">👽 "Stay consistent. React will soon bow to your will."</footer>
    </div>
  );
};

export default App;
