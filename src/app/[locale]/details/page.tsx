"use client";
import JobBody from "@/component/jobBody";
import { JobDetails } from "@/component/jobDetails";
import JobOverview from "@/component/jobOverview";

import { Box, Button, Grid, Typography } from "@mui/material";
import PriviousIcon from "../../../../public/assets/priviousIcon";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export default function Details() {
  const t = useTranslations("details");
  const locale = useLocale();

  const router = useRouter();
  const handleNavigate = () => {
    router.push(`/${locale}`);
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-start justify-between">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <Box width={"100%"} sx={{ p: 2 }}>
        <Grid container spacing={4} direction="column">
          <Grid item>
            <Button style={{ color: "black" }} onClick={handleNavigate}>
              <PriviousIcon />
              {t("backhomebtn")}
            </Button>
          </Grid>

          <Grid item>
            <JobDetails />
          </Grid>

          <Grid item container spacing={2} sx={{ mt: 4 }}>
            <Grid item xs={12} md={8}>
              <JobBody />
            </Grid>
            <Grid item xs={12} md={4}>
              <JobOverview />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}
