"use client";
import JobBody from "@/component/jobBody";
import { JobDetails } from "@/component/jobDetails";
import JobOverview from "@/component/jobOverview";

import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import PriviousIcon from "../../../../public/assets/priviousIcon";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import LocalSwitcher from "@/component/localSwitcher";
import { useEffect, useState } from "react";

export default function Details() {
  const t = useTranslations("details");
  const locale = useLocale();

  const router = useRouter();
  const handleNavigate = () => {
    router.push(`/${locale}`);
  };

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await axios.get("https://api.talinty.com/api/v1/jobs");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    }

    fetchJobs();
  }, []);

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
            {jobs.map((job) => (
              <Box key={job._id}>
                <JobDetails
                  icon={job.image}
                  title={job.name || "Not available"}
                  department={job.department || "Not available"}
                  location={job.location || "Not available"}
                  salary={job.salary || "Not available"}
                  jobType={job.type || "Not available"}
                  experienceLevel={job.minExperience || "Not available"}
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
