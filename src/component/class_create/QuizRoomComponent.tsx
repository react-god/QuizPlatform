import {
  CardContent,
  Grid,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  // padding: theme.spacing(2),
  height: "100%",
  flexGrow: 0,
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const moveQuizPage = () => {
  console.log(`해당 퀴즈로 이동`);
};

const QuizRoomComponent = ({ room }: any) => {
  return (
    <>
      {room.quizs.map((quiz: any) => {
        return (
          <Grid key={quiz.id as number} item xs={4}>
            <Card
              sx={{
                backgroundColor: "#E6E6E6",
                minWidth: "285px",
                minHeight: "293px",
                maxWidth: "285px",
                maxHeight: "293px",
                borderRadius: "20",
              }}
              onClick={() => moveQuizPage()}
            >
              <CardContent sx={{ margin: "0px" }}>
                <Stack spacing={5}>
                  <Item sx={{}}>
                    <Typography variant="h5">{quiz.name}</Typography>
                    <Typography
                      variant="caption"
                      display={"block"}
                      textAlign="center"
                    >
                      {quiz.items.length}문제
                    </Typography>
                    <Typography
                      variant="caption"
                      display={"block"}
                      textAlign="center"
                    >
                      {room.owner}
                    </Typography>
                  </Item>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </>
  );
};

export default QuizRoomComponent;
//export default observer(ClassRoomPage);
