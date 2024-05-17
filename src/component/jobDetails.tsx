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

export const JobDetails: FC = () => {
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
        p: 1,
        marginLeft: 4,
        marginRight: 4,
        borderRadius: 3,
      }}
    >
      <Stack spacing={2} direction="column" padding={3}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Stack spacing={5} direction="row">
            <Image
              src="/assets/iconly/iconly-glass-tick.svg"
              alt="icon"
              width={60}
              height={60}
            />

            <Box flex={1}>
              <Box display="flex" justifyContent="space-between">
                <Typography
                  color="text.secondary"
                  variant="subtitle1"
                  fontWeight="bold"
                  fontSize={26}
                >
                  Junior Graphic Designer (Web)
                </Typography>
              </Box>
              <Box display="flex" gap={3}>
                <Box display="flex" alignItems="center" gap={1}>
                  <SvgIcon>
                    <JobIcon />
                  </SvgIcon>
                  <Typography color="text.secondary" variant="body2">
                    Design,Development
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <SvgIcon>
                    <LocatioIcon />
                  </SvgIcon>
                  <Typography color="text.secondary" variant="body2">
                    New York
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <SvgIcon>
                    <MoneyIcon />
                  </SvgIcon>
                  <Typography color="text.secondary" variant="body2">
                    $150 -$180 /week
                  </Typography>
                </Box>
              </Box>
              <Stack direction={"row"} gap={2} sx={{ marginTop: "6px" }}>
                <Typography
                  color="white"
                  border={1}
                  borderRadius={3}
                  bgcolor={"#73cdf2"}
                  variant="body2"
                  px={4}
                  py={1}
                >
                  Full-Time
                </Typography>
              </Stack>
            </Box>

            <Divider />
          </Stack>
          <Stack direction={"column"} alignItems="end">
            <Typography
              color="text.secondary"
              variant="subtitle1"
              fontSize={12}
            >
              Application Ends: 15/05/2024
            </Typography>
            <Stack direction={"row"} alignItems="center" gap={2}>
              <Button
                sx={{
                  bgcolor: "#f1e719",
                  px: 4,
                  borderRadius: 5,
                  color: "#fff",
                  "&:hover": {
                    bgcolor: "#f1e719",
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
              <IconButton onClick={() => setShowMail(true)}>
                <BookmarkBorderIcon />
              </IconButton>
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
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};
