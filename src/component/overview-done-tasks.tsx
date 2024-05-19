"use client";
import { useRef, useState, MouseEvent, type FC } from "react";
import PropTypes from "prop-types";
import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
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
import Link from "next/link";
import { IconButton } from "@mui/material";
import SendMail from "./sendMail";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

interface OverviewDoneTasksProps {
  icon: string;
  title: string;
  categories: string;
  location: string;
  salary: string;
  experienceLevel: string;
  jobType: string;
}

export const OverviewDoneTasks: FC<OverviewDoneTasksProps> = ({
  icon,
  title,
  categories,
  location,
  salary,
  jobType,
  experienceLevel,
}) => {
  const [showMail, setShowMail] = useState(false);
  const router = useRouter();
  const bookMarkRef = useRef<HTMLButtonElement>(null);
  const handleClose = () => {
    setShowMail(false);
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
      <div onClick={handleNavigate}>
        <Card
          sx={{
            backgroundColor: "white",
            p: 1,
            borderRadius: 3,
            cursor: "pointer",
          }}
        >
          <Stack spacing={2} direction="column">
            <Stack spacing={5} direction="row">
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

                  <IconButton
                    ref={bookMarkRef}
                    onClick={() => handleBookmark()}
                    sx={{ zIndex: 2 }}
                  >
                    <BookmarkBorderIcon />
                  </IconButton>
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
                <Box display="flex" gap={3}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <SvgIcon>
                      <RecentActorsOutlinedIcon sx={{ color: "#F3CB05" }} />
                    </SvgIcon>
                    <Typography color="text.secondary" variant="body2">
                      {categories}
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

              <Divider />
            </Stack>
            <Box>ss</Box>
          </Stack>
        </Card>
      </div>
    </>
  );
};

OverviewDoneTasks.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  categories: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  salary: PropTypes.string.isRequired,
  jobType: PropTypes.string.isRequired,
  experienceLevel: PropTypes.string.isRequired,
};
