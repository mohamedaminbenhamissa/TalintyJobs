"use client";
import React, { useState, useEffect, FC } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import SvgIcon from "@mui/material/SvgIcon";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import { Logo } from "@/component/logo";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import axios from "axios";
import type { NavColor } from "@/types/settings";

const SIDE_NAV_WIDTH = 280;

interface SideNavProps {
  color?: NavColor;
}

type Option = {
  text: string;
  value: string;
};
type remoteTypeOption = {
  text: string;
  value: string;
};

export const SideNav: FC<SideNavProps> = () => {
  const pathname = usePathname();
  const t = useTranslations("Home");
  const locale = useLocale();

  const remotetypesOpt: remoteTypeOption[] = [
    { text: t("noRemote"), value: "noRemote " },
    { text: t("halfRemote"), value: "halfRemote" },
    { text: t("fullRemote"), value: "fullRemote" },
  ];

  const [typesOpt, setTypesOpt] = useState<Option[]>([]);
  const [departments, setDepartments] = useState<Option[]>([]);
  const [minExperience, setMinExperience] = useState<Option[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const typesResponse = await axios.get(
          "https://api.talinty.com/api/v1/types"
        );

        const departmentsResponse = await axios.get(
          "https://api.talinty.com/api/v1/departments"
        );
        const minExperienceResponse = await axios.get(
          "https://api.talinty.com/api/v1/minExperience"
        );

        setTypesOpt(typesResponse.data);

        setDepartments(departmentsResponse.data);
        setMinExperience(minExperienceResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const linksList = [`/${locale}/details`];
  if (linksList.includes(pathname)) return null;

  return (
    <Drawer
      anchor="left"
      open
      PaperProps={{
        elevation: 3,
        sx: {
          overflowY: "auto",
          maxHeight: "100vh",
          backgroundColor: "white",
          position: "sticky",
          width: SIDE_NAV_WIDTH,
        },
      }}
      variant="permanent"
    >
      <Stack sx={{ height: "100%", overflowY: "auto" }}>
        <Stack alignItems="center" direction="row" spacing={2} sx={{ p: 2 }}>
          <Logo />
        </Stack>

        <Box sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Typography variant="subtitle2">{t("search")}</Typography>
              <OutlinedInput
                fullWidth
                placeholder={t("search")}
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
                    label={t("type")}
                    name="type"
                  />
                )}
              />
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle2">{t("remoteTypes")}</Typography>
              <Autocomplete
                getOptionLabel={(option: Option) => option.text}
                options={remotetypesOpt}
                renderInput={(params): JSX.Element => (
                  <TextField
                    {...params}
                    variant="outlined"
                    fullWidth
                    style={{ color: "#fff" }}
                    label={t("remoteTypes")}
                    name="type"
                  />
                )}
              />
            </Stack>

            <Stack spacing={1}>
              <Typography variant="subtitle2">{t("department")}</Typography>
              <Autocomplete
                getOptionLabel={(option: Option) => option.text}
                options={departments}
                renderInput={(params): JSX.Element => (
                  <TextField
                    {...params}
                    variant="outlined"
                    fullWidth
                    style={{ color: "#fff" }}
                    label={t("department")}
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
                options={minExperience}
                renderInput={(params): JSX.Element => (
                  <TextField
                    {...params}
                    variant="outlined"
                    fullWidth
                    style={{ color: "#fff" }}
                    label={t("experienceLevel")}
                    name="experienceLevel"
                  />
                )}
              />
            </Stack>

            <Stack spacing={1}>
              <Button
                sx={{
                  bgcolor: "#F3CB05",
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
