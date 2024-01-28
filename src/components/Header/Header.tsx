import { Switch } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ReactElement, useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContextProvider";
import HeaderStyled from "./HeaderStyled";

const Header = (): ReactElement => {
  const { toggleTheme, theme } = useContext(ThemeContext);

  return (
    <HeaderStyled position="fixed">
      <div className="header__container">
        <h1 className="header__title">BrewQuest</h1>
        <div className="header__dark-mode">
          <DarkModeIcon />
          <Switch onChange={toggleTheme} checked={theme === "dark"} />
        </div>
      </div>
    </HeaderStyled>
  );
};

export default Header;
