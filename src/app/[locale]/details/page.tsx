"use client";
import JobBody from "@/component/jobBody";
import { JobDetails } from "@/component/jobDetails";
import JobOverview from "@/component/jobOverview";

import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import PriviousIcon from "../../../../public/assets/priviousIcon";
import Link from "next/link";
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
    <main className="flex min-h-screen w-full flex-col items-start justify-between ">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <Box width={"100%"}>
        <Grid spacing={4} direction={"column"}>
          <Grid display={"flex"} gap={1}>
            <Button style={{ color: "black" }} onClick={handleNavigate}>
              <PriviousIcon />
              {t("backhomebtn")}
            </Button>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <JobDetails />
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
