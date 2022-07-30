import { Box, Collapse, Link as MUILink, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

export default function InvalidUrl({ correctUrl }) {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      textAlign={"center"}
      overflow={"hidden"}
      mt={"25vh"}
    >
      <Typography variant={"h2"} mb={"1rem"}>
        Invalid URL 😞
      </Typography>
      <Typography variant={"h6"}>
        Make sure you are accessing Jotfox from:
      </Typography>
      <Collapse in>
        <Link href={correctUrl} passHref>
          <MUILink variant="h6">{correctUrl}</MUILink>
        </Link>
      </Collapse>
    </Box>
  );
}
