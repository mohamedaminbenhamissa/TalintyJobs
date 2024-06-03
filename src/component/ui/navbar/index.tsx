"use client";
import React, { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import SvgIcon from "@mui/material/SvgIcon";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import { Logo } from "@/component/logo";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import axios from "axios";
import Cookies from "js-cookie";
import { useMediaQuery, useTheme } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { SearchFilters, handleSearch } from "@/component/search";
import { useRouter } from "@/navigation";

const SIDE_NAV_WIDTH = 280;

type Option = {
  text: string;
  value: string;
};

export function SideNav() {
  const t = useTranslations("Home");
  const theme = useTheme();
  const [mobileTopBarOpen, setMobileTopBarOpen] = useState(false);
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("sm"));
  const [typesOpt, setTypesOpt] = useState<Option[]>([]);
  const [departments, setDepartments] = useState<Option[]>([]);
  const [minExperience, setMinExperience] = useState<Option[]>([]);
  const [remoteTypes, setRemoteTypes] = useState<Option[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedRemoteType, setSelectedRemoteType] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedExperience, setSelectedExperience] = useState<string>("");
  const [name, setName] = useState<string>("");

  const router = useRouter();
  const fetchData = async () => {
    const payload = {
      params: {
        active: true,
      },
      fields: [
        "name",
        "image",
        "description",
        "remote",
        "location",
        "minExperience",
        "department",
        "type",
        "expire",
        "_id",
        "slug",
      ].join(","),
    };

    try {
      const response = await axios.get(`http://localhost:5002/api/v1/job/`, {
        params: { payload: payload },
      });
      console.log("🚀 ~ fetchData------ ~ response:", response);
      const { jobTypes, remoteTypes } = response.data;
      setTypesOpt(
        jobTypes.map((type: string) => ({ text: t(type), value: type }))
      );
      setRemoteTypes(
        remoteTypes.map((type: string) => ({ text: t(type), value: type }))
      );
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSearch = () => {
    const searchFilters = {
      name: name,
      type: selectedType,
      remote: selectedRemoteType,
      department: selectedDepartment,
      experience: selectedExperience,
    };

    const queryString = new URLSearchParams(searchFilters).toString();

    console.log("----", queryString);
    router.push(`/?${queryString}`);
  };

  const toggleMobileTopBar = () => {
    setMobileTopBarOpen(!mobileTopBarOpen);
  };
  const openMobileTopBar = () => {
    setMobileTopBarOpen(true);
  };

  return (
    <>
      {isMobileOrTablet ? (
        <Box>
          <IconButton
            onClick={openMobileTopBar}
            color="primary"
            sx={{
              position: "fixed",
              zIndex: 999,
              top: 10,
              left: 10,
            }}
          >
            <MenuIcon sx={{ color: "#000" }} />
          </IconButton>
          <Drawer
            anchor="top"
            open={mobileTopBarOpen}
            onClose={() => setMobileTopBarOpen(false)}
            PaperProps={{
              elevation: 3,
              sx: {
                overflowY: "auto",
                backgroundColor: "white",
                position: "relative",
                minHeight: 64,
                borderRadius: "8px",

                "@media (max-width: 600px)": {
                  minWidth: "100%",
                },
              },
            }}
            variant="temporary"
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{ p: 2 }}
            >
              <IconButton
                onClick={toggleMobileTopBar}
                color="primary"
                sx={{
                  position: "fixed",
                  zIndex: 999,
                  top: 10,
                  left: 10,
                }}
              >
                <MenuIcon sx={{ color: "#000" }} />
              </IconButton>
              <Logo />
            </Stack>

            <Box sx={{ p: 2 }}>
              <Stack spacing={2}>
                <Stack spacing={1}>
                  <Typography variant="subtitle2">{t("search")}</Typography>
                  <OutlinedInput
                    fullWidth
                    placeholder={t("search")}
                    startAdornment={
                      <InputAdornment position="start">
                        <SvgIcon>
                          <SearchMdIcon />
                        </SvgIcon>
                      </InputAdornment>
                    }
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Stack>
                <Stack spacing={1}>
                  <Typography variant="subtitle2">{t("type")}</Typography>
                  <Autocomplete
                    getOptionLabel={(option: Option) => option.text}
                    options={typesOpt}
                    onChange={(event, value) =>
                      setSelectedType(value ? value.value : "")
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        fullWidth
                        label={t("type")}
                        name="type"
                      />
                    )}
                  />
                </Stack>

                <Stack spacing={1}>
                  <Typography variant="subtitle2">
                    {t("remoteTypes")}
                  </Typography>
                  <Autocomplete
                    getOptionLabel={(option: Option) => option.text}
                    options={remoteTypes}
                    onChange={(event, value) =>
                      setSelectedRemoteType(value ? value.value : "")
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        fullWidth
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
                    onChange={(event, value) =>
                      setSelectedDepartment(value ? value.value : "")
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        fullWidth
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
                    onChange={(event, value) =>
                      setSelectedExperience(value ? value.value : "")
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        fullWidth
                        label={t("experienceLevel")}
                        name="experienceLevel"
                      />
                    )}
                  />
                </Stack>

                <Stack spacing={1}>
                  <Button
                    onClick={onSearch}
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
          </Drawer>
        </Box>
      ) : (
        <Drawer
          anchor="left"
          open
          PaperProps={{
            elevation: 3,
            sx: {
              overflowY: "auto",
              backgroundColor: "white",
              position: "relative",
              minWidth: 280,
              borderRadius: "8px",

              "@media (max-width: 600px)": {
                minWidth: "100%",
              },
            },
          }}
          variant="permanent"
        >
          <Stack sx={{ height: "100%", overflowY: "auto" }}>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{ p: 2 }}
            >
              <Logo />
            </Stack>

            <Box sx={{ p: 2 }}>
              <Stack spacing={2}>
                <Stack spacing={1}>
                  <Typography variant="subtitle2">{t("search")}</Typography>
                  <OutlinedInput
                    fullWidth
                    placeholder={t("search")}
                    startAdornment={
                      <InputAdornment position="start">
                        <SvgIcon>
                          <SearchMdIcon />
                        </SvgIcon>
                      </InputAdornment>
                    }
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Stack>
                <Stack spacing={1}>
                  <Typography variant="subtitle2">{t("type")}</Typography>
                  <Autocomplete
                    getOptionLabel={(option: Option) => option.text}
                    options={typesOpt}
                    onChange={(event, value) =>
                      setSelectedType(value ? value.value : "")
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        fullWidth
                        label={t("type")}
                        name="type"
                      />
                    )}
                  />
                </Stack>

                <Stack spacing={1}>
                  <Typography variant="subtitle2">
                    {t("remoteTypes")}
                  </Typography>
                  <Autocomplete
                    getOptionLabel={(option: Option) => option.text}
                    options={remoteTypes}
                    onChange={(event, value) =>
                      setSelectedRemoteType(value ? value.value : "")
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        fullWidth
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
                    onChange={(event, value) =>
                      setSelectedDepartment(value ? value.value : "")
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        fullWidth
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
                    onChange={(event, value) =>
                      setSelectedExperience(value ? value.value : "")
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        fullWidth
                        label={t("experienceLevel")}
                        name="experienceLevel"
                      />
                    )}
                  />
                </Stack>

                <Stack spacing={1}>
                  <Button
                    onClick={onSearch}
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
      )}
    </>
  );
}
