"use client";
import { OverviewDoneTasks } from "@/component/overview-done-tasks";
import { useTranslations } from "next-intl";
import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import LocalSwitcher from "@/component/localSwitcher";

export default function Home() {
  const t = useTranslations("Home");

  return (
    <main className="flex min-h-screen w-full flex-col items-start justify-between ">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <Box width={"100%"}>
        <Grid spacing={4} direction={"column"}>
          <Stack
            direction={"row"}
            display={"flex"}
            justifyContent="space-between"
          >
            <Typography variant="h5">{t("hometitle")}</Typography>
            <Stack direction="row" spacing={4}>
              <LocalSwitcher />
            </Stack>
          </Stack>

          <Box
            sx={{
              mt: 4,
              display: "flex",
              gap: "15px",
              flexDirection: "column",
            }}
          >
            <OverviewDoneTasks
              icon="/assets/iconly/iconly-glass-tick.svg"
              title="Junior Graphic Designer (Web)"
              categories="Design,Development"
              location="New York"
              salary="$150 - $180 /week"
              jobType="CDI"
              experienceLevel="Entry level"
            />

            <OverviewDoneTasks
              icon="/assets/iconly/iconly-glass-info.svg"
              title="FrontEnd Developer"
              categories="Development"
              location="Tunisia"
              salary="$250 /week"
              jobType="CDI"
              experienceLevel="Entry level"
            />
            <OverviewDoneTasks
              icon="/assets/iconly/iconly-glass-paper.svg"
              title="BackEnd Developer"
              categories="Development"
              location="France"
              salary="$200 /week"
              jobType="CDD"
              experienceLevel="Entry level"
            />
            <OverviewDoneTasks
              icon="/assets/iconly/iconly-glass-paper.svg"
              title="BackEnd Developer"
              categories="Development"
              location="France"
              salary="$200 /week"
              jobType="CDD"
              experienceLevel="Entry level"
            />
            <OverviewDoneTasks
              icon="/assets/iconly/iconly-glass-paper.svg"
              title="BackEnd Developer"
              categories="Development"
              location="France"
              salary="$200 /week"
              jobType="CDD"
              experienceLevel="Entry level"
            />
            <OverviewDoneTasks
              icon="/assets/iconly/iconly-glass-paper.svg"
              title="BackEnd Developer"
              categories="Development"
              location="France"
              salary="$200 /week"
              jobType="Internship"
              experienceLevel="Entry level"
            />
            <OverviewDoneTasks
              icon="/assets/iconly/iconly-glass-paper.svg"
              title="BackEnd Developer"
              categories="Development"
              location="France"
              salary="$200 /week"
              jobType="Internship"
              experienceLevel="Entry level"
            />
          </Box>
        </Grid>
      </Box>
    </main>
  );
}
