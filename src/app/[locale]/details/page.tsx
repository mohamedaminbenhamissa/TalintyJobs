import JobBody from "@/component/jobBody";
import { JobDetails } from "@/component/jobDetails";
import JobOverview from "@/component/jobOverview";

import { Box, Button, Grid, Stack, Typography } from "@mui/material";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import { useLocale, useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import LocalSwitcher from "@/component/localSwitcher";

type job = {
  _id: string;
  image: string;
  name: string;
  department: string;
  salary: string;
  experienceLevel: string;
  type: string;
  description: string;
  minExperience: string;
  location: string;
  expireDate: string;
};
async function getData() {
  const res = await fetch("https://api.talinty.com/api/v1/jobs");

  if (!res.ok) {
    throw new Error("Failed to fetch data sorry");
  }

  return res.json();
}
export default async function Details() {
  const t = useTranslations("details");
  const locale = useLocale();
  const jobs = await getData();
  const handleNavigate = () => {
    redirect(`/${locale}`);
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-start justify-between ">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <Box width={"100%"}>
        <Grid spacing={4} direction={"column"}>
          <Grid display={"flex"} gap={1} justifyContent="space-between">
            <Button style={{ color: "black" }} onClick={handleNavigate}>
              <KeyboardBackspaceIcon />
              {t("backhomebtn")}
            </Button>
            <LocalSwitcher />
          </Grid>

          <Box sx={{ mt: 4 }}>
            {jobs.map((job: job) => (
              <Box key={job._id}>
                <JobDetails
                  icon={job.image}
                  title={job.name || "Not available"}
                  department={job.department || "Not available"}
                  location={job.location || "Not available"}
                  salary={job.salary || "Not available"}
                  jobType={job.type || "Not available"}
                  experienceLevel={job.minExperience || "Not available"}
                  expireDate={job.expireDate || "Not available"}
                />
              </Box>
            ))}
          </Box>
          <Stack
            direction={"row"}
            display={"flex"}
            justifyContent="space-between"
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: 4,
                marginRight: 4,
              }}
            >
              <JobBody />
            </Box>
            <Grid item xs={12} md={4} marginRight={4}>
              <JobOverview />
            </Grid>
          </Stack>
        </Grid>
      </Box>
    </main>
  );
}
