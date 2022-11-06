import { User, user1 } from "./user";

// --------------- INTERFACE ---------------

export enum QuizType {
  choice,
  essay,
}

export interface Quiz {
  id: string;
  owner: User;
  name: string;
  items: Array<QuizItem>;
}

export interface QuizItem {
  uuid: String;
  question: String;
  type: QuizType;
  options: Array<QuizOption>;
  reason?: String;
  essayAnswer?: String;
  imageUrl?: String;
  score: number;
}

export interface QuizOption {
  uuid: String;
  title: String;
  isAnswer: boolean;
  imageUrl?: String;
}

// --------------- INSTANCE ---------------

// 첫번째 퀴즈의 첫번째 질문
const quizItem1_1: QuizItem = {
  uuid: "fio8fown3",
  question: "세상에서 제일 잘생긴 사람은?",
  type: QuizType.essay,
  essayAnswer: "권대현",
  options: [],
  score: 10,
};

// 첫번째 퀴즈의 두번째 질문의 첫번째 보기
const quizOption1_2_1: QuizOption = {
  uuid: "dijfw2310",
  isAnswer: false,
  title: "1",
};

const quizOption1_2_2: QuizOption = {
  uuid: "dijfw2311",
  isAnswer: true,
  title: "2",
};

const quizOption1_2_3: QuizOption = {
  uuid: "dijfw2312",
  isAnswer: false,
  title: "3",
};

const quizOption1_2_4: QuizOption = {
  uuid: "dijfw2313",
  isAnswer: false,
  title: "4",
};

// 첫번째 퀴즈의 두번째 질문
const quizItem1_2: QuizItem = {
  uuid: "fio8f2wn3",
  question: "1 + 1 = ?",
  reason: "수학적으로 1 + 1은 답이 2입니다.",
  type: QuizType.choice,
  options: [quizOption1_2_1, quizOption1_2_2, quizOption1_2_3, quizOption1_2_4],
  score: 5,
};

// 세번 어저구 저저구 보기

const quizOption1_3_1: QuizOption = {
  uuid: "dijfw2314",
  isAnswer: true,
  title: "1",
};

const quizOption1_3_2: QuizOption = {
  uuid: "dijfw2315",
  isAnswer: false,
  title: "2",
};

const quizOption1_3_3: QuizOption = {
  uuid: "dijfw2317",
  isAnswer: true,
  title: "3",
};

const quizOption1_3_4: QuizOption = {
  uuid: "dijfw2319",
  isAnswer: false,
  title: "4",
};

// 첫번째 퀴즈의 세번째 질문
const quizItem1_3: QuizItem = {
  uuid: "fio8fow43",
  question: "다음 중 홀수인 것은?",
  type: QuizType.choice,
  options: [quizOption1_3_1, quizOption1_3_2, quizOption1_3_3, quizOption1_3_4],
  score: 5,
};

// 첫번째 퀴즈
const quiz1: Quiz = {
  id: "b17c80f1",
  owner: user1,
  name: "네트워크 이론1",
  items: [quizItem1_1, quizItem1_2, quizItem1_3],
};

const quiz2: Quiz = {
  id: "40761e64-9a73-454e-b30d-36bf451ed025",
  owner: user1,
  name: "재밌는 퀴즈",
  items: [
    {
      uuid: "b76f242e-234c-467f-9071-e880275e2414",
      question: "2조 조장 킹갓정시현이 일하는 카페는?",
      type: 0,
      score: 25,
      options: [
        {
          uuid: "1748e5b6-a06b-40d5-b978-80df5d6f1f06",
          title: "카페베네",
          isAnswer: false,
        },
        {
          uuid: "1439b23e-eae5-45ef-bef3-ebf86faad876",
          title: "스타벅스",
          isAnswer: false,
        },
        {
          uuid: "f83b1a56-dd47-4b9f-acb5-30a628cc5be7",
          title: "카페드리옹",
          isAnswer: true,
        },
        {
          uuid: "84a7fd6f-af20-4de1-a3fe-1d8c3c954ace",
          title: "사실 백수",
          isAnswer: false,
        },
      ],
    },
    {
      uuid: "fb6f80c1-8b73-4abc-9fb2-ccb92ceb8e2e",
      question: "환승연애2에 나오지 않는 등장인물은?",
      type: 0,
      score: 20,
      options: [
        {
          uuid: "1748e5b6-a06b-40d5-b978-80df5d6f1f06",
          title: "권대현",
          isAnswer: true,
        },
        {
          uuid: "1439b23e-eae5-45ef-bef3-ebf86faad876",
          title: "김태이",
          isAnswer: false,
        },
        {
          uuid: "55b7d206-7d9d-4c70-89c6-715ac16ea7d9",
          title: "성해은",
          isAnswer: false,
        },
        {
          uuid: "e3e3629f-dc08-4310-bf4d-4f9d04d65dca",
          title: "김민성",
          isAnswer: true,
        },
      ],
    },
    {
      uuid: "b32bb9e0-29bc-4964-b76b-fb77c5d0c516",
      question: "꾸미지 않은 듯 꾸민 것을 줄여서 말하면?",
      score: 15,
      type: 1,
      options: [],
      essayAnswer: "꾸안꾸",
    },
  ],
};

const quiz3: Quiz = {
  id: "4b3a2ed0-db45-4181-a8b4-557c2952070b",
  owner: user1,
  name: "재밌는 퀴즈2",
  items: [
    {
      uuid: "46926e97-ed81-44ac-8f08-afc07f8006db",
      question:
        "BTS 봉준호 손흥민 ooo Let’s go 벌스에서 ooo 안에 들어갈 인물은?",
      type: 0,
      score: 30,
      options: [
        {
          uuid: "1748e5b6-a06b-40d5-b978-80df5d6f1f06",
          title: "JAY Z",
          isAnswer: false,
        },
        {
          uuid: "1439b23e-eae5-45ef-bef3-ebf86faad876",
          title: "JAY PARK",
          isAnswer: true,
        },
        {
          uuid: "d6102238-118f-4d0a-bf3f-035da2aa625a",
          title: "JAMIE",
          isAnswer: false,
        },
        {
          uuid: "11422bd4-565e-4714-80ce-73f2f522bbd9",
          title: "HONEY JAY",
          isAnswer: false,
        },
      ],
    },
    {
      uuid: "dsi29gj3f",
      question: "술을 많이 먹고 다음날 하는 국룰 멘트는?",
      score: 20,
      type: 0,
      options: [
        {
          uuid: "ab16dad4-5f0f-4b3b-93bd-71373b9513b1",
          title: "내가 술 다시 마시면 개다",
          isAnswer: true,
        },
        {
          uuid: "ad9f7106-25ec-4e62-a1b0-1a5dc7d75981",
          title: "이제 술 다시는 안 마신다",
          isAnswer: true,
        },
        {
          uuid: "5b04ed9c-686f-4ad5-85b9-54a7ede216f5",
          title: "소주에 삼겹살 먹고 싶다",
          isAnswer: false,
        },
        {
          uuid: "858b21a5-f64f-4152-85c3-697830e951d4",
          title: "한강에서 피자에 맥주마시고 싶다",
          isAnswer: false,
        },
      ],
    },
    {
      uuid: "01c412f7-7c0e-4997-bd75-8797ff3c0512",
      question: "한성대입구역은 몇호선에 있는 역인가? 숫자만 입력하세요.",
      type: 1,
      score: 20,
      options: [],
      reason: "한성대입구역은 4호선에 위치해있다.",
      essayAnswer: "4",
    },
  ],
};

const quiz4: Quiz = {
  id: "efbf8a40-2d45-4d15-93d7-ffa11dec74dc",
  owner: user1,
  name: "상식 퀴즈1",
  items: [
    {
      uuid: "dsi29gj3f",
      question:
        "범죄 신고 번호는 112, 재난 신고 번호는 119입니다. 그렇다면 간첩 신고 번호는 무엇일까요?",
      type: 1,
      score: 30,
      options: [],
      essayAnswer: "111",
    },
    {
      uuid: "1518f47c-bf92-48e3-bf69-7ccdd2e29f37",
      question: "다음 중 화력 발전에서 가장 많이 사용되는 원료는 무엇일까요?",
      type: 0,
      score: 30,
      options: [
        {
          uuid: "5b866166-f56b-497b-9c56-91ffebf87280",
          title: "석유",
          isAnswer: false,
        },
        {
          uuid: "c3a25825-40b7-47e4-8b3e-d2072012bf6e",
          title: "석탄",
          isAnswer: true,
        },
        {
          uuid: "be43309a-7abd-46cd-b882-ac92efe2679b",
          title: "LPG",
          isAnswer: false,
        },
        {
          uuid: "976bdb0b-38be-45c7-a5be-db8906a7e4ca",
          title: "원전 원료",
          isAnswer: false,
        },
      ],
    },
    {
      uuid: "0cff9fb6-ea4b-49d1-8bc0-69259291e803",
      question: "소가 웃는 소리를 세글자로 하면?",
      score: 40,
      type: 1,
      options: [],
      essayAnswer: "우하하",
    },
  ],
};

const quiz5: Quiz = {
  id: "efbf8a40-2d45-4d15-93d7-ffa11dec74asd",
  owner: user1,
  name: "상식퀴즈2",
  items: [
    {
      uuid: "cf8c5709-cc53-4fda-9c7e-e3b58a5f2937",
      question: "1 + 2 x 3 = ?",
      type: 0,
      reason: "곱셈의 우선순위가 높기 때문에 답은 7이다.",
      score: 30,
      options: [
        {
          uuid: "5b866166-f56b-497b-9c56-91ffebf87280",
          title: "6",
          isAnswer: false,
        },
        {
          uuid: "c3a25825-40b7-47e4-8b3e-d2072012bf6e",
          title: "7",
          isAnswer: true,
        },
        {
          uuid: "be43309a-7abd-46cd-b882-ac92efe2679b",
          title: "8",
          isAnswer: false,
        },
        {
          uuid: "976bdb0b-38be-45c7-a5be-db8906a7e4ca",
          title: "9",
          isAnswer: false,
        },
      ],
    },
    {
      uuid: "ba85b260-ac24-45c0-86b7-0b4a289f37dd",
      question:
        "18세기 중엽 영국에서 시작된 기술 혁신과 이에 수반하여 일어난 사회, 경제 구조의 변혁을 무엇이라 할까요?",
      type: 0,
      score: 30,
      options: [
        {
          uuid: "5b866166-f56b-497b-9c56-91ffebf87280",
          title: "기술혁명",
          isAnswer: false,
        },
        {
          uuid: "c3a25825-40b7-47e4-8b3e-d2072012bf6e",
          title: "산업혁명",
          isAnswer: true,
        },
        {
          uuid: "be43309a-7abd-46cd-b882-ac92efe2679b",
          title: "노동혁명",
          isAnswer: false,
        },
        {
          uuid: "976bdb0b-38be-45c7-a5be-db8906a7e4ca",
          title: "시민혁명",
          isAnswer: false,
        },
      ],
    },
    {
      uuid: "6809a869-4f98-46e0-992d-00b2542547b4",
      question:
        "다음 중 프로세스가 메모리에 적재될때 프로세스를 구성하는 영역인 것을 모두 고르세요.",
      type: 0,
      score: 40,
      options: [
        {
          uuid: "5b866166-f56b-497b-9c56-91ffebf87280",
          title: "스택 영역",
          isAnswer: true,
        },
        {
          uuid: "c3a25825-40b7-47e4-8b3e-d2072012bf6e",
          title: "힙 영역",
          isAnswer: true,
        },
        {
          uuid: "be43309a-7abd-46cd-b882-ac92efe2679b",
          title: "큐 영역",
          isAnswer: false,
        },
        {
          uuid: "976bdb0b-38be-45c7-a5be-db8906a7e4ca",
          title: "트리 영역",
          isAnswer: false,
        },
      ],
    },
  ],
};

const quiz6: Quiz = {
  id: "6be24156-b061-4657-b678-9956d5ba97c6",
  owner: user1,
  name: "프로그래밍 기초1",
  items: [
    {
      uuid: "dsi29gj3f",
      question: "API의 약어를 소문자로 풀어 쓰시오.",
      type: 1,
      score: 40,
      options: [
        {
          uuid: "9df01185-7528-4987-97f3-187120b1165f",
          title: "",
          isAnswer: true,
        },
        {
          uuid: "a49de503-85c3-431e-a98d-07f1ea07e0f6",
          title: "",
          isAnswer: false,
        },
      ],
      essayAnswer: "application programming interface",
    },
    {
      uuid: "99abd8dd-aaca-48bf-8149-03a9a36d96e4",
      question: "모든 경우에 퀵정렬이 항상 빠르다.",
      type: 0,
      score: 30,
      options: [
        {
          uuid: "9df01185-7528-4987-97f3-187120b1165f",
          title: "O",
          isAnswer: false,
        },
        {
          uuid: "a49de503-85c3-431e-a98d-07f1ea07e0f6",
          title: "X",
          isAnswer: true,
        },
      ],
    },
    {
      uuid: "d6672bda-5f78-4e72-9f2d-94960c4444bf",
      question: "js에서 배열 순회 함수를 모두 고르시오",
      type: 0,
      score: 30,
      options: [
        {
          uuid: "9df01185-7528-4987-97f3-187120b1165f",
          title: "map",
          isAnswer: true,
        },
        {
          uuid: "a49de503-85c3-431e-a98d-07f1ea07e0f6",
          title: "forEach",
          isAnswer: true,
        },
        {
          uuid: "96e29859-c7d8-434c-a268-52534d895adf",
          title: "bind",
          isAnswer: false,
        },
        {
          uuid: "0f0db663-5f5c-447b-be77-77f5b709a5c6",
          title: "eval",
          isAnswer: false,
        },
      ],
    },
  ],
};

const quiz7: Quiz = {
  id: "f9648289-1281-4b44-b944-1c00b747939e",
  owner: user1,
  name: "상식퀴즈2",
  items: [
    {
      uuid: "dsi29gj3f",
      question: "한성대학교에 살던 동물의 이름이 아닌 것을 모두 고르시오.",
      type: 0,
      score: 30,
      options: [
        {
          uuid: "982a7167-8216-4328-bae8-83815d38fd10",
          title: "뀨뀨",
          isAnswer: true,
        },
        {
          uuid: "cbffdaa2-a840-4180-959f-54953b895418",
          title: "꽉까",
          isAnswer: false,
        },
        {
          uuid: "afea9bae-b6e5-4c48-b782-d1da16c19839",
          title: "꼬꼬",
          isAnswer: false,
        },
        {
          uuid: "3136e051-fb3e-471d-96bb-a83a6442cf98",
          title: "꾸꾸",
          isAnswer: false,
        },
        {
          uuid: "728956f0-2769-43eb-aca7-fa9d766261c7",
          title: "까까",
          isAnswer: true,
        },
      ],
    },
    {
      uuid: "c8647a98-a7aa-44ba-8962-5781129d0010",
      question: "시카고는 미시간 주에 속해있다.",
      type: 0,
      score: 30,
      options: [
        {
          uuid: "982a7167-8216-4328-bae8-83815d38fd10",
          title: "O",
          isAnswer: false,
        },
        {
          uuid: "cbffdaa2-a840-4180-959f-54953b895418",
          title: "X ",
          isAnswer: true,
        },
      ],
    },
    {
      uuid: "7c210a46-c3ff-42c9-9239-19757ba70714",
      question: "은(Silver)의 원소기호를 적으시오.",
      type: 1,
      score: 30,
      options: [],
      essayAnswer: "Ag",
    },
  ],
};

const quiz8: Quiz = {
  id: "a2f2989e-9579-42e9-a90a-639a44775938",
  owner: user1,
  name: "상식퀴즈3",
  items: [
    {
      uuid: "dsi29gj3f",
      question: "검은색의 색상값은 ? #______ (#을 제외한 6자리만 적으시오)",
      type: 1,
      score: 30,
      options: [],
      essayAnswer: "000000",
    },
    {
      uuid: "6ac7049e-5afd-4c47-ada6-9d99d325bd1a",
      question: "Black Friday는 어떤 기념일 다음 날인가?",
      type: 0,
      score: 30,
      options: [
        {
          uuid: "1908294b-a863-463e-8def-3e601f681cd1",
          title: "Fall back",
          isAnswer: false,
        },
        {
          uuid: "f5290a1c-210d-4335-980b-128735e9e2e4",
          title: "Labor day",
          isAnswer: false,
        },
        {
          uuid: "348816b0-76cc-42c6-8966-dcd2354055ac",
          title: "ThanksGiving",
          isAnswer: true,
        },
      ],
    },
    {
      uuid: "ff78c84e-144e-43a5-8c43-f25bb130d756",
      question: "다음 중 찻잎이 들어가지 않은 차를 고르시오",
      type: 0,
      score: 30,
      options: [
        {
          uuid: "1908294b-a863-463e-8def-3e601f681cd1",
          title: "아쌈",
          isAnswer: false,
        },
        {
          uuid: "f5290a1c-210d-4335-980b-128735e9e2e4",
          title: "실론",
          isAnswer: false,
        },
        {
          uuid: "c67d9ced-9232-49d3-ae1d-5c10c39de476",
          title: "카모마일",
          isAnswer: true,
        },
        {
          uuid: "bec82956-1b16-41f8-92d7-a3867a2ba0b8",
          title: "다즐링",
          isAnswer: false,
        },
      ],
    },
  ],
};

const quiz9: Quiz = {
  id: "a56dd92b-4c17-4849-9b96-9be4ad9878e6",
  owner: user1,
  name: "문화1",
  items: [
    {
      uuid: "dsi29gj3f",
      question: "윤도현 밴드 노래가 아닌 것은?",
      type: 0,
      score: 50,
      reason: "Next Level은 에스파, 사랑했나봐는 윤도현 개인의 곡이다.",
      options: [
        {
          uuid: "2e33abc3-7c76-4a6f-9380-1e726b7cb95b",
          title: "Next Level",
          isAnswer: true,
        },
        {
          uuid: "66d305ec-03e8-49f0-94cd-c69f73138417",
          title: "사랑했나봐",
          isAnswer: true,
        },
        {
          uuid: "0f2538fe-c4aa-466a-8500-9d1cb4afde1f",
          title: "나는 나비",
          isAnswer: false,
        },
        {
          uuid: "20955e42-17d7-4886-9965-af3d7a138a20",
          title: "박하사탕",
          isAnswer: false,
        },
      ],
    },
    {
      uuid: "ac3d34f8-7518-492d-b1e6-3009337d1696",
      question: "한성대학교를 대표하는 동물을 쓰시오.",
      type: 1,
      score: 30,
      options: [],
      essayAnswer: "거북이",
    },
    {
      uuid: "1d533756-6fda-4132-8c09-126616f9272f",
      question: "손흥민이 뛰었던 팀을 모두 고르시오.",
      type: 0,
      score: 20,
      options: [
        {
          uuid: "2e33abc3-7c76-4a6f-9380-1e726b7cb95b",
          title: "레버쿠젠",
          isAnswer: true,
        },
        {
          uuid: "66d305ec-03e8-49f0-94cd-c69f73138417",
          title: "토트넘 핫스퍼",
          isAnswer: true,
        },
        {
          uuid: "59a671f4-2046-49c8-a439-6bd5a0778748",
          title: "나폴리",
          isAnswer: false,
        },
        {
          uuid: "f1e91d2d-7ff7-4155-81de-c8253e6848d3",
          title: "함부르크",
          isAnswer: true,
        },
      ],
    },
  ],
};

export { quiz1, quiz2, quiz3, quiz4, quiz5, quiz6, quiz7, quiz8, quiz9 };
