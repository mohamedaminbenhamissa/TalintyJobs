import React from "react";

import { Box, Grid, Stack, Typography } from "@mui/material";

import LocalSwitcher from "@/component/localSwitcher";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { OverviewDoneTasks } from "@/component/overview-done-tasks";
import JobIcon from "../../../public/assets/JobIcon";

const getJobs = async () => {
  const payload = {
    params: {
      active: true,
    },
    fields: [
      "name",
      "slug",
      "description",
      "remote",
      "location",
      "minExperience",
      "department",
      "type",
      "expire",
      "_id",
    ].join(","),
  };

  try {
    const response = await axios.get("http://localhost:5002/api/v1/job/", {
      params: { payload: payload },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export default async function Home() {
  console.log("🚀 ~ Home ~ Home:");

  const { jobs } = await getJobs();
  console.log("🚀 ~ Home ~ jobs:", jobs);

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
            <Typography variant="h5"> Latest Jobs</Typography>
            <Stack direction="row" spacing={4}>
              <LocalSwitcher />
            </Stack>
          </Stack>

          <Box width={"100%"}>
            <Grid container spacing={3}>
              {jobs?.map((job) => (
                <Grid width={"100%"} item key={job._id}>
                  <OverviewDoneTasks
                    icon={job.image || <JobIcon />}
                    title={job.name || "Not available"}
                    department={job.department || "Not available"}
                    location={job.location || "Not available"}
                    salary={job.salary || "Not available"}
                    jobType={job.type || "Not available"}
                    remote={job.remote || "Not available"}
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
