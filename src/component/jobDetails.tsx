"use client";

import { useCallback, useState, type FC } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Image from "next/image";
import JobIcon from "../../public/assets/JobIcon";
import LocatioIcon from "../../public/assets/LocatioIcon";
import MoneyIcon from "../../public/assets/MoneyIcon";
import { IconButton } from "@mui/material";
import ApplyForm from "./applyform";
import SendMail from "./sendMail";
import { useTranslations } from "next-intl";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import RecentActorsOutlinedIcon from "@mui/icons-material/RecentActorsOutlined";

interface JobDetailsProps {
  icon: string;
  title: string;
  department: string;
  location: string;
  salary: string;
  experienceLevel: string;
  jobType: string;
}

export const JobDetails: FC<JobDetailsProps> = ({
  icon,
  title,
  department,
  location,
  salary,
  jobType,
  experienceLevel,
}) => {
  const [showform, setShowForm] = useState(false);
  const [showmail, setShowMail] = useState(false);

  const handleClose = () => {
    setShowForm(false);
    setShowMail(false);
  };
  const t = useTranslations("details");

  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: "#F9F9F9",
        p: 2,
        mx: { xs: 1, sm: 2, md: 4 },
        borderRadius: 3,
      }}
    >
      <Stack spacing={2} direction="column" padding={3}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
        >
          <Stack spacing={2} direction={{ xs: "column", md: "row" }} flex={1}>
            <Image
              src="/assets/iconly/iconly-glass-tick.svg"
              alt="icon"
              width={60}
              height={60}
            />

            <Box flex={1}>
              <Box
                display="flex"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <Typography
                  color="text.secondary"
                  variant="subtitle1"
                  fontWeight="bold"
                  fontSize={{ xs: 20, md: 26 }}
                >
                  {title}
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection={{ xs: "column", sm: "row" }}
                gap={3}
                flexWrap="wrap"
              >
                <Box display="flex" alignItems="center" gap={1}>
                  <SvgIcon>
                    <RecentActorsOutlinedIcon sx={{ color: "#F3CB05" }} />
                  </SvgIcon>
                  <Typography color="text.secondary" variant="body2">
                    {department}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <SvgIcon>
                    <JobIcon />
                  </SvgIcon>
                  <Typography color="text.secondary" variant="body2">
                    {jobType}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <SvgIcon>
                    <LocatioIcon />
                  </SvgIcon>
                  <Typography color="text.secondary" variant="body2">
                    {location}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <SvgIcon>
                    <MoneyIcon />
                  </SvgIcon>
                  <Typography color="text.secondary" variant="body2">
                    {salary}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <SvgIcon>
                    <WorkHistoryOutlinedIcon sx={{ color: "#F3CB05" }} />
                  </SvgIcon>
                  <Typography color="text.secondary" variant="body2">
                    {experienceLevel}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Stack>
          <Divider flexItem sx={{ my: { xs: 2, md: 0 }, mx: { md: 2 } }} />
          <Stack direction="column" alignItems="flex-start">
            <Stack direction="row" alignItems="center" gap={2}>
              <Button
                sx={{
                  bgcolor: "#F3CB05",
                  pt: 2,
                  pb: 2,
                  pl: 8,
                  pr: 8,
                  color: "#fff",
                  "&:hover": {
                    bgcolor: "#000",
                    color: "#F3CB05",
                  },
                }}
                onClick={() => setShowForm(true)}
              >
                {t("applybtn")}
              </Button>
              <Box position="relative">
                {showform && (
                  <Box
                    position="fixed"
                    top={0}
                    left={0}
                    width="100%"
                    height="100%"
                    zIndex={999}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <ApplyForm onClose={handleClose} visible={showform} />
                  </Box>
                )}
              </Box>
              <Button
                sx={{
                  bgcolor: "#F9F9F9",
                  pt: 2,
                  pb: 2,
                  pl: 2,
                  pr: 2,
                  color: "#000",
                  "&:hover": {
                    bgcolor: "#F3CB05",
                    color: "#fff",
                  },
                }}
                onClick={() => setShowMail(true)}
              >
                <BookmarkBorderIcon />
              </Button>
              <Box position="relative">
                {showmail && (
                  <Box
                    position="fixed"
                    top={0}
                    left={0}
                    width="100%"
                    height="100%"
                    zIndex={999}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <SendMail onClose={handleClose} visible={showmail} />
                  </Box>
                )}
              </Box>
            </Stack>
            <Stack direction="row">
              <Typography
                color="text.secondary"
                variant="subtitle1"
                fontSize={12}
                textAlign={{ xs: "center", md: "right" }}
              >
                Application Ends:
              </Typography>
              <Typography
                color="error"
                variant="subtitle1"
                fontSize={12}
                sx={{ xs: "center", md: "right", fontWeight: "bolder" }}
              >
                15/05/2024
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};
