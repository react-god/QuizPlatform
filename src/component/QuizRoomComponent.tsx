import { CardContent, Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import { Key } from "react";

const QuizRoomComponent = ({ room }: any) => {
  return (
    <>
      {room.quizs.map((quiz: any) => {
        return (
          <Grid key={room.id as Key} item xs={4}>
            <Card
              sx={{
                backgroundColor: "#E6E6E6",
                minWidth: "285px",
                minHeight: "293px",
                maxWidth: "285px",
                maxHeight: "293px",
                borderRadius: "20",
              }}
            >
              <CardContent sx={{ margin: "0px" }}>
                <Typography variant="h5" textAlign="center">
                  {quiz.name}
                </Typography>
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
