import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ListItemIcon } from "@mui/material";

type Props = {
  anchorEl: null | HTMLElement;
  setAnchorEl: (anchorEl: null | HTMLElement) => void;
  setOpenEditDialog: (value: boolean) => void;
  setOpenDeleteDialog: (value: boolean) => void;
};

export default function LongMenu({
  anchorEl,
  setAnchorEl,
  setOpenEditDialog,
  setOpenDeleteDialog,
}: Props) {
  const options = [
    {
      name: "Edit",
      icon: <EditIcon />,
      handleClick: () => {
        setOpenEditDialog(true);
        setAnchorEl(null);
      },
    },
    {
      name: "Delete post",
      icon: <DeleteOutlineIcon />,
      handleClick: () => {
        setOpenDeleteDialog(true);
        setAnchorEl(null);
      },
    },
  ];
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {options.map((option) => (
          <MenuItem key={option.name} onClick={option.handleClick}>
            <ListItemIcon> {option.icon}</ListItemIcon>
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
