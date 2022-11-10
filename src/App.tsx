import logo from "./logo.svg";
import "./App.css";
import TakingQuiz from "./component/taking_quiz/TakingQuiz"
import { quiz1, quiz2, quiz3, quiz4, quiz5, quiz6, quiz7, quiz8, quiz9} from "./mockup_data/quiz"
import {user1, user2, user3, user4} from "./mockup_data/user"

function App() {
  return (
    <TakingQuiz quiz={quiz1} user={user1}/>
  );
}

export default App;
