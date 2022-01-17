import { styled } from "@mui/styles";
import Button from "@mui/material/Button";

const StyledButton = styled(({ color, ...props }) => <Button {...props} />)({
  background: (props) =>
    props.color === "primary"
      ? "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)"
      : "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  border: 0,
  borderRadius: 20,
  boxShadow: (props) =>
    props.color === "primary"
      ? "0 3px 5px 2px rgba(33, 203, 243, .3)"
      : "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
});

export default function GradientButton(props: any) {
  return <StyledButton color={props.color} {...props}></StyledButton>;
}
