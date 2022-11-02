import logo from "./logo.svg";
import "./App.css";
import TakingQuiz from "./component/taking_quiz/TakingQuiz"
import { quiz1, quiz2, quiz3, quiz4, quiz5, quiz6} from "./mockup_data/quiz"

function App() {
  return (
    <TakingQuiz quiz={quiz5}/>
  );
}

export default App;
