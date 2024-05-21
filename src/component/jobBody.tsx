import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import axios from "axios";

type job = {
  _id: string;
  description: string;
};
async function getData() {
  const res = await fetch("https://api.talinty.com/api/v1/jobs");

  if (!res.ok) {
    throw new Error("Failed to fetch data sorry");
  }

  return res.json();
}

export default async function JobBody() {
  const t = useTranslations("details");

  const jobs = await getData();

  return (
    <Box sx={{ p: 2, maxWidth: 1000 }}>
      <Box>
        <Typography
          sx={{
            gap: "1",
            marginBottom: 2,
            color: "#F3CB05",
          }}
          variant="subtitle1"
        >
          {t("jobDescription")}
        </Typography>
        {jobs.map((job: job) => (
          <Box
            key={job._id}
            dangerouslySetInnerHTML={{ __html: job.description }}
          />
        ))}
      </Box>
    </Box>
  );
}
