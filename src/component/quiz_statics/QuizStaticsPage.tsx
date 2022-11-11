import { List, Typography, useTheme } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Quiz, QuizItem } from "../../mockup_data/quiz";
import { QuizRecord } from "../../mockup_data/quiz_record";
import { User, user1 } from "../../mockup_data/user";
import { NavRail } from "../NavRail";
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
import Scaffold from "../Scaffold";
import { useMemo } from "react";

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

function getScore(record: QuizRecord, quizItems: QuizItem[]): number {
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
  }, [maxScore]);

  const scoreDistribution: number[] = useMemo(() => {
    let result: number[] = [...Array(LABLE_COUNT)].fill(0);
    let labelIndex;
    let scoreIndex = 0;
    for (labelIndex = 0; labelIndex < LABLE_COUNT; ++labelIndex) {
      while (scoreIndex < scores.length) {
        const score = scores[scoreIndex];
        const currentLabelMaxScore =
          gap * (labelIndex + 1) + (labelIndex == LABLE_COUNT - 1 ? 1 : 0);
        if (score >= currentLabelMaxScore) {
          break;
        }
        result[labelIndex]++;
        scoreIndex++;
      }
    }
    return result;
  }, [scores]);

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

interface QuizStaticsPageProps {
  quiz: Quiz;
  records: QuizRecord[];
}

const QuizStaticsPage = (props: QuizStaticsPageProps) => {
  const candidateIds = [
    ...new Set(props.records.map((record) => record.candidateId)),
  ];

  // TODO: 임시로 넣은 값임 실제 기록에서 불러오도록 수정하기
  const candidates = [user1];

  const scores: number[] = useMemo(() => {
    return props.records
      .map((record) => getScore(record, props.quiz.items))
      .sort((a, b) => a - b);
  }, [props.quiz.items, props.records]);

  const average: number = useMemo(() => {
    const sum = scores.reduce((prev, curr) => prev + curr);
    return sum / scores.length;
  }, [scores]);

  return (
    <Scaffold navRail={<NavRail items={[]} />}>
      <StaticsTitle quizName={props.quiz.name} />
      <QuizRecordSummary
        candidateUserCount={candidates.length}
        submitCount={props.records.length}
        average={average}
      />
      <CandidateList candidates={candidates} />
      <ScoreDistributionChart scores={scores} />
    </Scaffold>
  );
};

export default QuizStaticsPage;
