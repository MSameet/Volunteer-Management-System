import { LogoutOutlined } from "@mui/icons-material";
import Logout from "@mui/icons-material/Logout";
import { CardContent, Grid, Stack, useTheme } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { admin, organizer, volunteer } from "../../data/links";
import { logout } from "../../redux/reducer/userReducer";

const AccountMenu = () => {
  const { name, role, avatar } = useSelector(
    (state) => state?.userReducer?.user
  );
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const theme = useTheme();

  const Links = {
    volunteer,
    admin,
    organizer,
  };
  let AppLinks = Links[role];
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }} src={avatar}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            width: 290,
            minWidth: 240,
            maxWidth: 290,
            "& .MuiAvatar-root": {
              height: 32,
              width: 250,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
            p: 0,
            "& .MuiListItemIcon-root": {
              minWidth: 32,
              color: theme.palette.grey[500],
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <CardContent sx={{ px: 2.5, pt: 3, mb: 2 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Stack direction="row" spacing={1.25} alignItems="center">
                <Stack>
                  <Typography
                    variant="button"
                    sx={{ textTransform: "capitalize", maxWidth: "200px" }}
                    className="text-truncate"
                  >
                    {name}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {role}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid item>
              <ListItemIcon
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                  handleClose();
                }}
              >
                <LogoutOutlined fontSize="small" />
              </ListItemIcon>
            </Grid>
          </Grid>
        </CardContent>
        {AppLinks?.map((link) => {
          const { Icon } = link;
          return (
            <MenuItem onClick={handleClose}>
              <Link
                to={link?.link}
                style={{ color: "#000" }}
                className="flex items-center gap-2 w-100 p-1"
              >
                <ListItemIcon>
                  <Icon fontSize="small" />
                </ListItemIcon>{" "}
                <Typography variant="caption">{link?.title}</Typography>
              </Link>
            </MenuItem>
          );
        })}

        <MenuItem
          onClick={() => {
            dispatch(logout());
            navigate("/");
            handleClose();
          }}
        >
          <Box className="flex items-center gap-2 w-100 p-1">
            <ListItemIcon className="ms-1">
              <Logout fontSize="small" />
            </ListItemIcon>
            <Typography variant="caption">Logout</Typography>
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;
