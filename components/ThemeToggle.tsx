import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { theme, setTheme, systemTheme } = useTheme();

  const renderThemeButton = () => {
    if (theme === "system") {
      return systemTheme === "dark" ? (
        <>
          <Moon className="mr-2 size-5" /> Dark
        </>
      ) : (
        <>
          <Sun className="mr-2 size-5" /> Light
        </>
      );
    }
    return theme === "dark" ? (
      <>
        <Moon className="mr-2 size-5" /> Dark
      </>
    ) : (
      <>
        <Sun className="mr-2 size-5" /> Light
      </>
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          {renderThemeButton()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
