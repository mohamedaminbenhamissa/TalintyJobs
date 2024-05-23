import React from "react";

import { Box, Grid, Stack, Typography } from "@mui/material";

import LocalSwitcher from "@/component/localSwitcher";
import axios from "axios";
import { OverviewDoneTasks } from "@/component/overview-done-tasks";
import parse from "html-react-parser";

type Job = {
  department?: string;
  name?: string;
  description?: string;
  remote?: string;
  location?: string;
  minExperience?: string;
  salary?: string;
  image?: string;
  type?: string;
  _id?: string;
  slug?: string;
};

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
      "slug",
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
              {jobs?.map((job: Job) => (
                <Grid width={"100%"} item key={job?._id}>
                  <OverviewDoneTasks
                    icon={`https://astrolab.co/wp-content/uploads/2023/10/astrolab-1.svg`}
                    title={job?.name || "Not available"}
                    department={job?.department || "Not available"}
                    location={job?.location || "Not available"}
                    salary={job?.salary || "Not available"}
                    jobType={job?.type || "Not available"}
                    remote={job?.remote || "Not available"}
                    experienceLevel={job?.minExperience || "Not available"}
                    description={job?.description || "Not available"}
                    slug={job?.slug || "not"}
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
