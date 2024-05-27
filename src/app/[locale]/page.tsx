import React from "react";

import { Box, Grid, Stack, Typography } from "@mui/material";

import LocalSwitcher from "@/component/localSwitcher";
import axios from "axios";
import { OverviewDoneTasks } from "@/component/overview-done-tasks";
import { getTranslations } from "next-intl/server";

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
      "image",
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
    const response = await axios.get(`${process.env.BACKEND_URL}job/`, {
      params: { payload: payload }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export default async function Home() {
  const { jobs } = await getJobs();
  const t = await getTranslations("Home");

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
            <Typography variant="h5"> {t("homeTitle")}</Typography>
            <Stack direction="row" spacing={4}>
              <LocalSwitcher />
            </Stack>
          </Stack>

          <Box width={"100%"} marginTop={"10px"}>
            <Grid container spacing={3}>
              {jobs?.map((job: Job) => (
                <Grid width={"100%"} item key={job?._id}>
                  <OverviewDoneTasks
                    icon={job?.image || ""}
                    title={job?.name || t("notAvailable")}
                    department={job?.department || t("notAvailable")}
                    location={job?.location || t("notAvailable")}
                    salary={job?.salary || t("notAvailable")}
                    jobType={t(job?.type) || t("notAvailable")}
                    remote={t(job?.remote) || t("notAvailable")}
                    experienceLevel={job?.minExperience || t("notAvailable")}
                    description={job?.description || t("notAvailable")}
                    slug={job?.slug || t("notAvailable")}
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
