"use client";
import { useRef, useState, MouseEvent, type FC } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import RecentActorsOutlinedIcon from "@mui/icons-material/RecentActorsOutlined";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import Image from "next/image";
import JobIcon from "../../public/assets/JobIcon";
import LocatioIcon from "../../public/assets/LocatioIcon";
import MoneyIcon from "../../public/assets/MoneyIcon";
import SendMail from "./sendMail";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { styled } from "@mui/system";

import { Share } from "./shareModal";
import ShareIcon from "@mui/icons-material/Share";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const HtmlToPlainText = ({ html }) => {
  const dummyElement = document.createElement("div");
  dummyElement.innerHTML = html;
  const plainText = dummyElement.innerText;

  return <p>{plainText}</p>;
};

export default HtmlToPlainText;

interface OverviewDoneTasksProps {
  icon: string;
  title: string;
  department: string;
  location: string;
  salary: string;
  experienceLevel: string;
  jobType: string;
  description: string;
  remote: string;
}

const Paragraph = styled("p")({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  WebkitLineClamp: 2,
  maxHeight: "3em",
});

export const OverviewDoneTasks: FC<OverviewDoneTasksProps> = ({
  icon,
  title,
  department,
  location,
  salary,
  jobType,
  experienceLevel,
  description,
  remote,
}) => {
  const [showMail, setShowMail] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const router = useRouter();
  const bookMarkRef = useRef<HTMLButtonElement>(null);
  const handleClose = () => {
    setShowMail(false);
    setShowShare(false);
  };
  const locale = useLocale();

  const handleNavigate = (event: MouseEvent<HTMLDivElement>) => {
    if (
      bookMarkRef.current &&
      bookMarkRef.current.contains(event.target as Node)
    ) {
      event.stopPropagation();
      return;
    }
    router.push(`/${locale}/details`);
  };
  const handleBookmark = () => {
    setShowMail(true);
  };

  const t = useTranslations("Home");
  return (
    <>
      <div>
        <Card
          sx={{
            backgroundColor: "white",
            p: 1,
            borderRadius: 3,
            cursor: "pointer",
          }}
        >
          <Stack spacing={2} direction="column">
            <Box onClick={handleNavigate}>
              <Stack spacing={5} direction={{ xs: "column", md: "row" }}>
                <Image src={icon} alt="icon" width={60} height={60} />

                <Box flex={1}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography
                      color="text.secondary"
                      variant="subtitle1"
                      fontWeight="bold"
                      fontSize={26}
                    >
                      {title}
                    </Typography>
                    <Box>
                      <Button
                        ref={bookMarkRef}
                        onClick={() => handleBookmark()}
                        sx={{
                          bgcolor: "#fff",
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
                      >
                        <BookmarkBorderIcon />
                      </Button>
                      <Button
                        sx={{
                          bgcolor: "#fff",
                          pt: 1,
                          pb: 1,
                          pl: 1,
                          pr: 1,
                          color: "#000",
                          "&:hover": {
                            bgcolor: "#F3CB05",
                            color: "#fff",
                          },
                        }}
                        onClick={() => setShowShare(true)}
                      >
                        <ShareIcon />
                      </Button>
                    </Box>
                  </Box>
                  <Box position="relative">
                    {showMail && (
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
                        <SendMail onClose={handleClose} visible={showMail} />
                      </Box>
                    )}
                  </Box>
                  <Box
                    display="flex"
                    gap={3}
                    flexDirection={{ xs: "column", sm: "row" }}
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
                    <Box display="flex" alignItems="center" gap={1}>
                      <SvgIcon>
                        <AccessTimeIcon sx={{ color: "#F3CB05" }} />
                      </SvgIcon>
                      <Typography color="text.secondary" variant="body2">
                        {remote}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Box>
                    <Paragraph>
                      <HtmlToPlainText html={description} />
                    </Paragraph>
                  </Box>
                </Box>
              </Stack>
            </Box>

            <Stack display={"flex"} alignItems={"flex-end"}>
              <Box position="relative">
                {showShare && (
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
                    <Share onClose={handleClose} isOpen={showShare} />
                  </Box>
                )}
              </Box>
            </Stack>
          </Stack>
        </Card>
      </div>
    </>
  );
};

OverviewDoneTasks.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  salary: PropTypes.string.isRequired,
  jobType: PropTypes.string.isRequired,
  experienceLevel: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
