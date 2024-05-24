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
import PropTypes from "prop-types";
import JobIcon from "../../public/assets/JobIcon";
import LocatioIcon from "../../public/assets/LocatioIcon";
import MoneyIcon from "../../public/assets/MoneyIcon";
import CalanderIcon from "../../public/assets/calenderIcon";
import ExpirationIcon from "../../public/assets/expirationIcon";
import { useTranslations } from "next-intl";
import AccessTimeIcon from "@mui/icons-material/AccessTime";


interface JobOverviewProps {
  created: string;

  location: string;
  salary: string;

  expire: string;
  minExperience: string;
  remote:string
}

export const JobOverview: FC<JobOverviewProps> = ({
  created,
  location,
  salary,
  expire,
  minExperience,
  remote
}) => {
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
          <Box sx={{ p:1}} >
            <CalanderIcon height={32} width={32}  />
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
                  {created}
                </Typography>
              }
              sx={{ pl: 2 }}
            />
          </List>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box sx={{ p:1}}>
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
                  {location}
                </Typography>
              }
              sx={{ pl: 2 }}
            />
          </List>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box sx={{ p:1}}>
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
                  {salary}
                </Typography>
              }
              sx={{ pl: 2 }}
            />
          </List>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box sx={{ p:1}}>
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
                  {expire}
                </Typography>
              }
              sx={{ pl: 2 }}
            />
          </List>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box sx={{ p:1}}>
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
                  {minExperience}
                </Typography>
              }
              sx={{ pl: 2 }}
            />
          </List>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Box sx={{ p:1}}>
          <AccessTimeIcon height={32} width={32} sx={{ color: "#F3CB05" }} />
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
                  {t("remoteTypes")}
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
                  {remote}
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

JobOverview.propTypes = {
  created: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  salary: PropTypes.string.isRequired,
  expire: PropTypes.string.isRequired,
  minExperience: PropTypes.string.isRequired,
  remote: PropTypes.string.isRequired,

};