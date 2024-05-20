"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Grid, Stack, Typography } from "@mui/material";

import LocalSwitcher from "@/component/localSwitcher";
import { OverviewDoneTasks } from "@/component/overview-done-tasks";

export default function Home() {
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
    <main className="flex min-h-screen w-full flex-col items-start justify-between">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <Box width={"100%"}>
        <Grid spacing={4} direction={"column"}>
          <Stack
            direction={"row"}
            display={"flex"}
            justifyContent="space-between"
          >
            <Typography variant="h5">Latest Jobs</Typography>
            <Stack direction="row" spacing={4}>
              <LocalSwitcher />
            </Stack>
          </Stack>

          <Box width={"100%"}>
            <Grid container spacing={4}>
              {jobs.map((job) => (
                <Grid item xs={12} md={6} lg={4} key={job._id}>
                  <OverviewDoneTasks
                    icon={job.image}
                    title={job.name || "Not available"}
                    categories={job.department || "Not available"}
                    location={job.location || "Not available"}
                    salary={job.salary || "Not available"}
                    jobType={job.type || "Not available"}
                    experienceLevel={job.minExperience || "Not available"}
                    description={job.description || "Not available"}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Box>
    </main>
  );
}
