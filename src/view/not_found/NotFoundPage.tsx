import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import Scaffold from "../../component/Scaffold";

const NotFoundPage = () => {
  const locations = useLocation();
  return (
    <Scaffold>
      <Typography
        variant="h1"
        align="center"
        color="secondary"
        style={{ fontFamily: "LuckiestGuy" }}
      >
        404
      </Typography>
      <Typography variant="h6" align="center">
        {locations.pathname} 경로의 페이지를 찾을 수 없습니다.
      </Typography>
    </Scaffold>
  );
};

export default NotFoundPage;
