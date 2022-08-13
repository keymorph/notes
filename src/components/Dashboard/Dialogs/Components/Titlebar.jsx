import {
  CloseOutlined,
  EditOutlined,
  RestoreOutlined,
} from "@mui/icons-material";
import { Box, IconButton, Typography, Zoom } from "@mui/material";
import React from "react";
import { MODAL_ACTIONS } from "../../../../models/dialogs";
import CustomTooltip from "../../../Shared/CustomTooltip";

export default function Titlebar({
  title,
  action,
  onClose,
  onRevert,
  onActionChange = null,
  disableRevert,
}) {
  return (
    <Box display={"flex"}>
      <Typography
        display={"flex"}
        alignSelf={"center"}
        variant="h5"
        color={"primary"}
      >
        {title}
      </Typography>

      <Box display={"flex"} flexDirection={"row"} ml={"auto"}>
        <CustomTooltip title={"Edit note"} disableableButton>
          <Zoom in={action === MODAL_ACTIONS.VIEW} appear={false}>
            <IconButton
              color={"neutral"}
              size={"small"}
              onClick={() => onActionChange(MODAL_ACTIONS.EDIT)}
              sx={{ mr: "-2.2rem" }}
            >
              <EditOutlined />
            </IconButton>
          </Zoom>
        </CustomTooltip>
        <CustomTooltip title={"Revert changes"} disableableButton>
          <Zoom in={action !== MODAL_ACTIONS.VIEW} appear={false}>
            <div>
              <IconButton
                color={"neutral"}
                size={"small"}
                disabled={disableRevert}
                onClick={() => onRevert(true)}
                sx={{ transition: "all 0.2s ease-in-out" }}
              >
                <RestoreOutlined />
              </IconButton>
            </div>
          </Zoom>
        </CustomTooltip>

        <CustomTooltip title={"Close dialog"}>
          <IconButton
            color={"neutral"}
            size={"small"}
            onClick={(event) => onClose(event, "closeModal")}
          >
            <CloseOutlined />
          </IconButton>
        </CustomTooltip>
      </Box>
    </Box>
  );
}
