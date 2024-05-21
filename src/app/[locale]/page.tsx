import React from "react";

import { Box, Grid, Stack, Typography } from "@mui/material";

import LocalSwitcher from "@/component/localSwitcher";
import axiosInstance from "@/app/_utlis/axios";

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
};

const getJobs = async () => {
  const payload = {
    params: {
      active: true,
    },
    fields: ["name", "remote", "location", "type", "expire", "_id"],
  };
  return new Promise((resolve, reject) => {
    axiosInstance
      .get("/api/v1/job/admin", { params: { payload } })
      .then((jobs) => {
        console.log("🚀 ~ .then ~ jbs:", jobs);

        resolve(jobs.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// const fetchJobs = async () => {
//   try {
//     const payload = {
//       params: {
//         active: true,
//       },
//       fields: ["name", "remote", "location", "type", "expire", "_id"],
//     };

//     // const queryString = new URLSearchParams({
//     //   payload: JSON.stringify(payload),
//     // }).toString();

//     const url = `api/v1/job/admin/`;

//     const response = await axiosInstance.get(url, { params: { payload } });
//     console.log("🚀 ~ fetchJobs ~ response:", response);

//     const data = response.data;

//     return Array.isArray(data) ? data : [];
//   } catch (error) {
//     // console.error("Fetch error:", error);
//     return [];
//   }
// };

// fetchJobs().then((data) => {
//   // console.log(data);
// });

export default async function Home() {
  console.log("🚀 ~ Home ~ Home:");

  const jobs = await getJobs();

  // console.log(jobs);

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

          {/* <Box width={"100%"}>
            <Grid container spacing={4}>
              {jobs.map((job: job) => (
                <Grid item xs={12} md={6} lg={4} key={job._id}>
                  <OverviewDoneTasks
                    icon={job.image}
                    title={job.name || "Not available"}
                    department={job.department || "Not available"}
                    location={job.location || "Not available"}
                    salary={job.salary || "Not available"}
                    jobType={job.type || "Not available"}
                    experienceLevel={job.minExperience || "Not available"}
                    description={job.description || "Not available"}
                  />
                </Grid>
              ))}
            </Grid>
          </Box> */}
        </Grid>
      </Box>
    </main>
  );
}
