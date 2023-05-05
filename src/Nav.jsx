import React, { useEffect } from "react";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FaUserAlt } from "react-icons/fa";
import { fontSize } from "@mui/system";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  var emailLogin = localStorage.getItem("Email");
  var Department = localStorage.getItem("Department");

  // console.log(emailLogin);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    try {
      localStorage.clear();
      navigate("/login");
      window.location.reload();
    } catch {
      console.error("");
    }
  };

  return (
    <div style={{ backgroundColor: "red !important" }}>
      <nav
        className=" "
        style={{
          marginBottom: "20px",
          height: "57px",
          backgroundColor: "#f2f2f2",
          // position: "absolute",

          width: "100% !important",
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#ffff",
          borderBottom: " 1px solid #e2e5ed",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <a
            className="navbar-brand"
            href="#"
            style={{ position: "absolute", left: 0 }}
          >
            <img
              src="https://www.enggenv.com/img/NEW%20EE-LOGO_FULL_black.png"
              alt=""
              style={{ width: "70px", marginLeft: "17px", color: "white" }}
            />
          </a>
          {Department === "Production" ? (
            <span
              style={{
                displayL: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#6b7397",
                fontWeight: 700,
                fontSize: "20px",
              }}
            >
              Production
            </span>
          ) : (
            <></>
          )}
          {emailLogin === "admin@enggenv.com" ? (
            <span
              style={{
                displayL: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#6b7397",
                fontWeight: 700,
                fontSize: "20px",
              }}
            >
              Admin Panel
            </span>
          ) : (
            <></>
          )}

          {Department === "IT Department" ? (
            <span
              style={{
                displayL: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#6b7397",
                fontWeight: 700,
                fontSize: "20px",
              }}
            >
              IT Department
            </span>
          ) : (
            <></>
          )}

          <div style={{ display: "flex", position: "absolute", right: 0 }}>
            <Button
              id="demo-positioned-button"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <FaUserAlt />
            </Button>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
              <MenuItem onClick={handleClose}>
                {" "}
                Welcome,{" "}
                <span
                  style={{
                    marginLeft: "10px",
                    fontWeight: "800",
                    color: "#56799a",
                  }}
                >
                  {emailLogin}
                </span>{" "}
              </MenuItem>
              <MenuItem
                onClick={logout}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </nav>
    </div>
  );
}
