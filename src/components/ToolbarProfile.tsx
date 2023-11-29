import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Link from "next/link";

function ToolbarProfile() {
  const { user } = useUser();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const loggedUserOptions = [
    {
      text: "Profile",
      href: "",
    },
    {
      text: "Logout",
      href: "/api/auth/logout",
    },
  ];
  const anonymUserOption = [
    {
      text: "Login",
      href: "/api/auth/login",
    },
  ];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Tooltip title="Open profile">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          {user ? (
            <Avatar alt="User" src={user.picture!} sx={{ color: "white" }} />
          ) : (
            <AccountCircleIcon sx={{ color: "white" }} />
          )}
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {user
          ? loggedUserOptions.map((option) => (
              <MenuItem onClick={handleCloseUserMenu} key={option.text}>
                <Typography
                  textAlign="center"
                  sx={{ textDecoration: "none", color: "inherit" }}
                  href={option.href}
                  component="a"
                >
                  {option.text}
                </Typography>
              </MenuItem>
            ))
          : anonymUserOption.map((option) => (
              <MenuItem onClick={handleCloseUserMenu} key={option.text}>
                <Typography
                  textAlign="center"
                  sx={{ textDecoration: "none", color: "inherit" }}
                  href={option.href}
                  component="a"
                >
                  {option.text}
                </Typography>
              </MenuItem>
            ))}
      </Menu>
    </>
  );
}

export default ToolbarProfile;
