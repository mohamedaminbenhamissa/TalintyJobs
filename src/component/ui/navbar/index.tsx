"use client";
import type { FC } from "react";
import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";

import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";

import type { NavColor } from "@/types/settings";

import {
  Autocomplete,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";

import { Logo } from "@/component/logo";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

const SIDE_NAV_WIDTH = 280;

interface SideNavProps {
  color?: NavColor;
}

type Option = {
  text: string;
  value: string;
};

const categorys: Option[] = [
  { text: "Accounting / Finance", value: "JE" },
  { text: "Automative Jobs", value: "JO" },
  { text: "Customer", value: "KZ" },
  { text: "Design", value: "KE" },
  { text: "Development", value: "KP" },
  { text: "Health and Care", value: "KR" },
  { text: "Human Resource", value: "KW" },
  { text: "Marketing", value: "KG" },
  { text: "Project Managment", value: "LA" },
];

type typeOption = {
  text: string;
  value: string;
};

const typesOpt: typeOption[] = [
  { text: "Internship", value: "JE" },
  { text: "CDI", value: "JO" },
  { text: "CDD", value: "KZ" },
];

type SwitchOptions = {
  text: string;
  value: string;
};

const switches: SwitchOptions[] = [
  { text: "Fresh", value: "ferash" },
  { text: "1 Year", value: "1year" },
  { text: "2 Years", value: "2years" },
  { text: "3 Years", value: "3years" },
  { text: "4 Years", value: "4years" },
  { text: "> 5 Years", value: "5years" },
];

export const SideNav: FC<SideNavProps> = () => {
  const pathname = usePathname();
  const t = useTranslations("Home");
  const locale = useLocale();

  const linksList = [`/${locale}/details`];
  if (linksList.includes(pathname)) return;
  return (
    <Drawer
      anchor="left"
      open
      PaperProps={{
        elevation: 3,
        sx: {
          overflowY: "hidden",
          maxHeight: "100vh",
          backgroundColor: "white",
          position: "sticky",
          width: SIDE_NAV_WIDTH,
        },
      }}
      variant="permanent"
    >
      <Stack sx={{ height: "100%" }}>
        <Stack alignItems="center" direction="row" spacing={2} sx={{ p: 2 }}>
          <Logo />
        </Stack>

        <Box sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Typography variant="subtitle2">{t("search")}</Typography>
              <OutlinedInput
                fullWidth
                placeholder="Job title, keywords..."
                sx={{ color: "#000" }}
                startAdornment={
                  <InputAdornment position="start">
                    <SvgIcon>
                      <SearchMdIcon />
                    </SvgIcon>
                  </InputAdornment>
                }
              />
            </Stack>
            <Stack spacing={1}>
              <Typography variant="subtitle2">{t("type")}</Typography>
              <Autocomplete
                getOptionLabel={(option: Option) => option.text}
                options={typesOpt}
                renderInput={(params): JSX.Element => (
                  <TextField
                    {...params}
                    variant="outlined"
                    fullWidth
                    style={{ color: "#fff" }}
                    label="Type"
                    name="type"
                  />
                )}
              />
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle2">{t("department")}</Typography>
              <Autocomplete
                getOptionLabel={(option: Option) => option.text}
                options={categorys}
                renderInput={(params): JSX.Element => (
                  <TextField
                    {...params}
                    variant="outlined"
                    fullWidth
                    style={{ color: "#fff" }}
                    label="Department"
                    name="department"
                  />
                )}
              />
            </Stack>
            <Stack spacing={1}>
              <Typography variant="subtitle2">
                {t("experienceLevel")}
              </Typography>
              <Autocomplete
                getOptionLabel={(option: Option) => option.text}
                options={switches}
                renderInput={(params): JSX.Element => (
                  <TextField
                    {...params}
                    variant="outlined"
                    fullWidth
                    style={{ color: "#fff" }}
                    label="Experience Level"
                    name="experienceLevel"
                  />
                )}
              />
            </Stack>

            <Stack spacing={1}>
              <Button
                sx={{
                  bgcolor: "#f1e719",
                  color: "#fff",
                  "&:hover": {
                    bgcolor: "black",
                  },
                }}
              >
                {t("findJobsbtn")}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Drawer>
  );
};
