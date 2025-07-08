import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./assets/styles/App.css";
import MainPage from "./pages/main";
import LoginPage from "./pages/login";
import MyPage from "./pages/mypage";
import TimerPage from "./pages/timer";
import RecordPage from "./pages/record";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/main" replace />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/timer" element={<TimerPage />} />
          <Route path="/record" element={<RecordPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
