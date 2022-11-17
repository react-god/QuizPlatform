export const ExpandableImage: React.FC<{
  expanded: boolean;
  onClick: () => void;
  src: String;
  style?: React.CSSProperties;
}> = ({ expanded, onClick, src, style }) => {
  const size = expanded ? "100%" : "54px";
  const borderRadius = expanded ? "3%" : "30%";

  return (
    <img
      alt="퀴즈 이미지"
      src={src as string}
      style={{
        borderRadius: borderRadius,
        maxWidth: size,
        minWidth: size,
        margin: "8px",
        cursor: "pointer",
        ...style,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    />
  );
};
