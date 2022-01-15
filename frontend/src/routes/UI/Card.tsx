import styled from "styled-components";

function Card(props) {
  const classes = "card " + props.className;
  const StyledCard = styled.div`
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
  `;
  return <StyledCard className={classes}>{props.children}</StyledCard>;
}

export default Card;
