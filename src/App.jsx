import React, { useState, useEffect } from 'react';
import './index.css';
import logo from './assets/logomain.png';

const learnPlan = [
  // Day 1: Props
  [
    "Understand props usage in React components",
    "Use children props for composition",
    "Implement props drilling across 2–3 levels"
  ],

  // Day 2: useState
  [
    "Use useState for UI toggling & inputs",
    "Build a counter with increment/decrement",
    "Manage multiple state variables"
  ],

  // Day 3: useEffect
  [
    "Understand useEffect lifecycle",
    "Fetch data from API and render",
    "Apply cleanup function to avoid memory leaks"
  ],

  // Day 4: Custom Hooks
  [
    "Create custom useLocalStorage hook",
    "Build useCounter hook with logic reuse",
    "Use a custom form handler hook"
  ],

  // Day 5: useRef & DOM Access
  [
    "Focus input field on mount using useRef",
    "Track value without re-render",
    "Trigger animations or styles via refs"
  ],

  // Day 6: Forms with Formik
  [
    "Set up Formik in a React form",
    "Add basic validation and error display",
    "Submit form data and show confirmation"
  ],

  // Day 7: Lists & Keys
  [
    "Render dynamic list using map",
    "Use key prop properly for performance",
    "Delete and update list items"
  ],

  // Day 8: Lifting State Up
  [
    "Share state between sibling components",
    "Lift state up and pass down handlers",
    "Build a parent-child form flow"
  ],

  // Day 9: Routing with React Router
  [
    "Install and configure React Router v6",
    "Create routes and nested routes",
    "Use useNavigate and params"
  ],

  // Day 10: Reusable Components
  [
    "Build reusable Card and Button components",
    "Use props.children and props customization",
    "Style components with custom CSS"
  ],

  // Day 11: Redux Basics
  [
    "Setup Redux Toolkit store",
    "Create slice with actions and reducer",
    "Use useDispatch and useSelector"
  ],

  // Day 12: Redux Async
  [
    "Add async logic with createAsyncThunk",
    "Fetch data and store in Redux state",
    "Show loading and error states"
  ],

  // Day 13: Final Mini App
  [
    "Build full Todo/Note app with Redux",
    "Support add/edit/delete tasks",
    "Persist state with localStorage"
  ],

  // Day 14: Deploy & Polish
  [
    "Polish UI, test edge cases",
    "Deploy app to Netlify",
    "Reflect on learnings and plan next steps"
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
      <img className='logo' src={logo} alt="Mission Boom Logo" width="120" height="80" />
      <div className="topbar">
        <div>📅 Day {day}/14</div>
        <div>🔥 Streak: {streak}</div>
        <div>🧠 XP: {xp}</div>
        <button className="reset-btn" onClick={resetGame}>Reset</button>
      </div>

      <div className="glass">
        <h2 className='today-task-title'>📘 Today's Missions</h2>
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
        <button className="btn next-btn" onClick={nextDay}>Next Mission ➡️</button>
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
