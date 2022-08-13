import { Card, styled } from "@mui/material";

export const NoteCard = styled(Card)({
  width: "20rem",
  height: "22rem",
  overflowWrap: "break-word",
});

export const AuthCard = styled(Card)({
  padding: 25,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)",
  borderRadius: 25,
  width: "80%",
  maxWidth: "30rem",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
});

export const DialogCard = styled(Card)({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  transition: "all 0.3s ease-in-out",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  width: "90%",
  minWidth: "18rem",
  maxWidth: "38rem",
  borderRadius: "0.8rem",
});
