import {
  Box,
  Card,
  CardHeader,
  List,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { FC } from "react";
import JobIcon from "../../public/assets/JobIcon";
import LocatioIcon from "../../public/assets/LocatioIcon";
import MoneyIcon from "../../public/assets/MoneyIcon";
import CalanderIcon from "../../public/assets/calenderIcon";
import ExpirationIcon from "../../public/assets/expirationIcon";
import { useTranslations } from "next-intl";

const JobOverview: FC = () => {
  const t = useTranslations("details");

  return (
    <Card
      elevation={0}
      sx={{
        backgroundColor: "#F9F9F9",
        p: 1,
        borderRadius: 3,
        width: { xs: "100%", sm: 320 },
        marginTop: 2,
      }}
    >
      <CardHeader title={t("jobOverview")} sx={{ color: "#F3CB05" }} />
      <Stack direction="column" padding={1}>
        <Stack direction="row" alignItems="center">
          <Box>
            <CalanderIcon height={32} width={32} />
          </Box>
          <List>
            <ListItemText
              disableTypography
              primary={
                <Typography
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  variant="subtitle2"
                >
                  {t("JobPosted")}
                </Typography>
              }
              secondary={
                <Typography
                  color="text.secondary"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  variant="body2"
                >
                  June 20, 2021
                </Typography>
              }
              sx={{ pl: 2 }}
            />
          </List>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box>
            <LocatioIcon height={32} width={32} />
          </Box>
          <List>
            <ListItemText
              disableTypography
              primary={
                <Typography
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  variant="subtitle2"
                >
                  {t("location")}
                </Typography>
              }
              secondary={
                <Typography
                  color="text.secondary"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  variant="body2"
                >
                  New York
                </Typography>
              }
              sx={{ pl: 2 }}
            />
          </List>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box>
            <MoneyIcon height={32} width={32} />
          </Box>
          <List>
            <ListItemText
              disableTypography
              primary={
                <Typography
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  variant="subtitle2"
                >
                  {t("offeredSalary")}
                </Typography>
              }
              secondary={
                <Typography
                  color="text.secondary"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  variant="body2"
                >
                  $150 - $180 / week
                </Typography>
              }
              sx={{ pl: 2 }}
            />
          </List>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box>
            <ExpirationIcon height={32} width={32} />
          </Box>
          <List>
            <ListItemText
              disableTypography
              primary={
                <Typography
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  variant="subtitle2"
                >
                  {t("expirationDate")}
                </Typography>
              }
              secondary={
                <Typography
                  color="text.secondary"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  variant="body2"
                >
                  May 6, 2026
                </Typography>
              }
              sx={{ pl: 2 }}
            />
          </List>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box>
            <JobIcon height={32} width={32} />
          </Box>
          <List>
            <ListItemText
              disableTypography
              primary={
                <Typography
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  variant="subtitle2"
                >
                  {t("experience")}
                </Typography>
              }
              secondary={
                <Typography
                  color="text.secondary"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  variant="body2"
                >
                  4 Year
                </Typography>
              }
              sx={{ pl: 2 }}
            />
          </List>
        </Stack>
      </Stack>
    </Card>
  );
};

export default JobOverview;
