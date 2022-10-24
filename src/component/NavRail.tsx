import { Add } from "@mui/icons-material";
import { Button, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { QuizItem } from "../mockup_data/quiz";

interface SubmitButtonProps {
  enabled: boolean;
  onClick: () => void;
}

const SubmitButton = (props: SubmitButtonProps) => {
  return (
    <Button
      variant="contained"
      style={{ margin: "8px" }}
      disableElevation={true}
      onClick={() => props.onClick()}
      disabled={!props.enabled}
    >
      <Typography variant="button">제출</Typography>
    </Button>
  );
};

interface NavRailItemProps {
  number: number;
  highlighted: boolean;
  isCurrentItem: boolean;
  onClick: () => void;
}

const NavRailItem = (props: NavRailItemProps) => {
  return (
    <Button
      variant="contained"
      style={{
        marginTop: "4px",
        marginBottom: "4px",
        marginLeft: "12px",
        marginRight: "12px",
      }}
      disableElevation={true}
      color={props.highlighted ? "secondary" : "inherit"}
      onClick={() => props.onClick()}
    >
      <Typography
        variant="button"
        fontWeight={props.isCurrentItem ? "900" : "400"}
      >
        {props.number}
      </Typography>
    </Button>
  );
};

interface NavRailProps {
  items: Array<QuizItem>;
  enableSubmitButton: boolean;
  currentItemIndex: number;
  isItemCompleted: (item: QuizItem) => boolean;
  onItemClick: (index: number) => void;
  onAddClick: () => void;
  onSubmitClick: () => void;
}

const NavRail = (props: NavRailProps) => {
  const theme = useTheme();

  return (
    <Stack
      style={{
        backgroundColor: theme.palette.grey[100],
      }}
    >
      <Stack
        direction="column"
        justifyContent="space-between"
        style={{ height: "100%" }}
      >
        {/* TODO(민성): 뒤로가기 버튼 만들기 */}
        <Stack
          id="noneScrollBar"
          direction="column"
          alignItems="center"
          style={{ overflowY: "scroll", paddingTop: "8px" }}
        >
          {props.items.map((item, index) => {
            return (
              <NavRailItem
                key={item.uuid as string}
                number={index + 1}
                highlighted={props.isItemCompleted(item)}
                isCurrentItem={props.currentItemIndex === index}
                onClick={() => props.onItemClick(index)}
              />
            );
          })}
          <IconButton onClick={() => props.onAddClick()}>
            <Add />
          </IconButton>
        </Stack>
        <SubmitButton
          enabled={props.enableSubmitButton}
          onClick={() => props.onSubmitClick()}
        />
      </Stack>
    </Stack>
  );
};

export default NavRail;
