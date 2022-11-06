import { Typography, useTheme } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { Quiz, QuizItem } from "../../mockup_data/quiz";
import { QuizRecord } from "../../mockup_data/quiz_record";
import { User } from "../../mockup_data/user";
import { NavRail } from "../NavRail";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
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
}

const Count = (props: CandidateCountProps) => {
  return (
    <Typography>
      총 응시자 수: {props.candidateUserCount}명<br></br>총 제출 횟수:{" "}
      {props.submitCount}회
    </Typography>
  );
};

interface CandidateListProps {
  candidates: User[];
}

const CandidateList = (props: CandidateListProps) => {
  return (
    <Typography>
      응시자 목록
      {props.candidates.map((user) => (
        <div style={{ marginLeft: "16px" }}>• {user.name}</div>
      ))}
    </Typography>
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
  quizItems: QuizItem[];
  records: QuizRecord[];
}

const LABLE_COUNT = 10;

const ScoreDistributionChart = (props: ScoreDistributionChartProps) => {
  const palette = useTheme().palette;
  const scores: number[] = useMemo(() => {
    return props.records
      .map((record) => getScore(record, props.quizItems))
      .sort((a, b) => a - b);
  }, [props.quizItems, props.records]);

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
        label: "인원",
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
  const candidates = [
    ...new Set(props.records.map((record) => record.candidate)),
  ];

  return (
    <Scaffold navRail={<NavRail items={[]} />}>
      <StaticsTitle quizName={props.quiz.name} />
      <Count
        candidateUserCount={candidates.length}
        submitCount={props.records.length}
      />
      <CandidateList candidates={candidates} />
      <ScoreDistributionChart
        quizItems={props.quiz.items}
        records={props.records}
      />
    </Scaffold>
  );
};

export default QuizStaticsPage;
