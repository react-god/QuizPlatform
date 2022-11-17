import { List, Typography, useTheme } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { QuizItem } from "../../model/quiz";
import { QuizRecord } from "../../model/quiz_record";
import { User } from "../../model/user";
import { NavRail } from "../../component/NavRail";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { isCorrect } from "../quiz_review/QuizReviewPage";
import Scaffold from "../../component/Scaffold";
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { classRoomStore } from "../../store/ClassRoomStore";
import quizRecordStore from "../../store/QuizRecordStore";
import userStore from "../../store/UserStore";

interface TitleProps {
  quizName: String;
}

const StaticsTitle = (props: TitleProps) => {
  return (
    <Typography variant="h4" style={{ marginBottom: "24px" }}>
      <span style={{ fontWeight: "bold" }}>{props.quizName}</span> 퀴즈의
      통계입니다.
    </Typography>
  );
};

interface CandidateCountProps {
  candidateUserCount: number;
  submitCount: number;
  average: number;
}

const QuizRecordSummary = (props: CandidateCountProps) => {
  return (
    <Typography>
      총 응시자 수: {props.candidateUserCount}명<br></br>총 제출 횟수:{" "}
      {props.submitCount}회<br></br>평균 점수: {props.average}점
    </Typography>
  );
};

interface CandidateListProps {
  candidates: User[];
}

const CandidateList = (props: CandidateListProps) => {
  return (
    <List
      style={{
        minHeight: "100px",
        overflowY: "scroll",
        border: "0.5px solid #888888",
        marginTop: "16px",
        marginBottom: "16px",
        padding: "8px",
      }}
    >
      <Typography>
        응시자 목록
        {props.candidates.map((user) => (
          <div style={{ marginLeft: "16px" }}>• {user.name}</div>
        ))}
      </Typography>
    </List>
  );
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "점수 분포표",
    },
  },
  scales: {
    y: {
      ticks: {
        stepSize: 10,
      },
    },
    x: {
      title: {
        display: true,
        text: "점수",
      },
    },
  },
};

export function getScore(record: QuizRecord, quizItems: QuizItem[]): number {
  let score: number = 0;
  record.items.forEach((recordItem) => {
    const quizItem = quizItems[recordItem.index];
    if (isCorrect(recordItem, quizItem)) {
      score += quizItem.score;
    }
  });
  return score;
}

interface ScoreDistributionChartProps {
  scores: number[];
}

const LABLE_COUNT = 10;

const ScoreDistributionChart = (props: ScoreDistributionChartProps) => {
  const palette = useTheme().palette;
  const scores = props.scores;

  const maxScore: number = useMemo(
    () => scores.reduce((prev, curr) => (prev > curr ? prev : curr)),
    [scores]
  );

  const gap: number = maxScore / LABLE_COUNT;
  const labels: string[] = useMemo(() => {
    let result: string[] = [];
    let i;
    for (i = 0; i < LABLE_COUNT - 1; ++i) {
      let lo = i * gap;
      result = [...result, `${lo}~${lo + gap - 0.1}점`];
    }
    let lo = i * gap;
    result = [...result, `${lo}~${lo + gap}점`];
    return result;
  }, [gap]);

  const scoreDistribution: number[] = useMemo(() => {
    let result: number[] = [...Array(LABLE_COUNT)].fill(0);
    let labelIndex;
    let scoreIndex = 0;
    for (labelIndex = 0; labelIndex < LABLE_COUNT; ++labelIndex) {
      while (scoreIndex < scores.length) {
        const score = scores[scoreIndex];
        const currentLabelMaxScore =
          gap * (labelIndex + 1) + (labelIndex === LABLE_COUNT - 1 ? 1 : 0);
        if (score >= currentLabelMaxScore) {
          break;
        }
        result[labelIndex]++;
        scoreIndex++;
      }
    }
    return result;
  }, [scores, gap]);

  const data = {
    labels,
    datasets: [
      {
        label: "제출",
        data: scoreDistribution,
        backgroundColor: palette.primary.light,
      },
    ],
  };

  return <Bar options={chartOptions} data={data} />;
};

const QuizStaticsPage = () => {
  const navigate = useNavigate();
  const { quizId } = useParams();
  if (quizId === undefined) {
    throw Error("URL에 quizId parameter가 누락되었습니다.");
  }
  const quiz = useMemo(() => {
    return classRoomStore.requireQuizById(quizId);
  }, [quizId]);
  const records = useMemo(() => {
    return quizRecordStore.getRecordsByQuizId(quizId);
  }, [quizId]);

  const candidateIds = useMemo(
    () => [...new Set(records.map((record) => record.candidateId))],
    [records]
  );
  const candidateUsers = useMemo(() => {
    return userStore.getUserList(candidateIds);
  }, [candidateIds]);

  const scores: number[] = useMemo(() => {
    return records
      .map((record) => getScore(record, quiz.items))
      .sort((a, b) => a - b);
  }, [quiz.items, records]);

  const average: number = useMemo(() => {
    if (scores.length === 0) {
      return 0;
    }
    const sum = scores.reduce((prev, curr) => prev + curr);
    return sum / scores.length;
  }, [scores]);

  return (
    <Scaffold navRail={<NavRail items={[]} onBackClick={() => navigate(-1)} />}>
      {records.length === 0 ? (
        <Typography variant="h4">아직 퀴즈를 푼 사람이 없어요.</Typography>
      ) : (
        <>
          <StaticsTitle quizName={quiz.name} />
          <QuizRecordSummary
            candidateUserCount={candidateUsers.length}
            submitCount={records.length}
            average={average}
          />
          <CandidateList candidates={candidateUsers} />
          <ScoreDistributionChart scores={scores} />
        </>
      )}
    </Scaffold>
  );
};

export default QuizStaticsPage;
