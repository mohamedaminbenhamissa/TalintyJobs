import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import LocalSwitcher from "@/component/localSwitcher";
import axios from "axios";
import { OverviewDoneTasks } from "@/component/overview-done-tasks";
import { getTranslations } from "next-intl/server";
import { SideNav } from "@/component/ui/navbar";
import { useLocale } from "next-intl";
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

export default function Home({ searchParams }: any) {
  console.log(searchParams);
  const { name, type, remote, department, experience } = searchParams;
  const getJobs = async () => {
    const payload = {
      params: {
        active: true,
        ...(name ? { name } : {}),
        ...(type ? { type } : {}),
        ...(remote ? { remote } : {}),
        ...(department ? { department } : {}),
        ...(experience ? { experience } : {}),
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
      const response = await axios.get(`http://localhost:5002/api/v1/job/`, {
        params: { payload: payload },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching jobs:", error);
      throw error;
    }
  };

  const searchThis = async () => {
    "use server";
    console.log("Searched");
  };

  const fetchData = async () => {
    let { jobs } = await getJobs();
    const t = await getTranslations("Home");
    const locale = useLocale();
    const isRTL = locale === "ar";

    return (
      <main
        lang={locale}
        dir={isRTL ? "rtl" : "ltr"}
        className="flex min-h-screen w-full flex-col items-start justify-between"
      >
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Stack direction={"row"}>
          <Stack padding={2}>
            <SideNav />
          </Stack>

          <Stack direction={"column"}>
            <Box>
              <Grid spacing={4} direction={"column"}>
                <Stack
                  direction={"row"}
                  display={"flex"}
                  justifyContent="space-between"
                >
                  <Typography variant="h5">{t("homeTitle")}</Typography>
                  <Stack direction="row" spacing={4}>
                    <LocalSwitcher />
                  </Stack>
                </Stack>

                <Box width={"100%"} marginTop={"10px"}>
                  <Grid container spacing={3}>
                    {jobs?.map((job: Job) => (
                      <Grid width={"100%"} item key={job?._id}>
                        <OverviewDoneTasks
                          icon={
                            "https://astrolab.co/wp-content/uploads/2023/10/astrolab-1.svg"
                          }
                          title={job?.name || t("notAvailable")}
                          department={job?.department || t("notAvailable")}
                          location={job?.location || t("notAvailable")}
                          salary={job?.salary || t("notAvailable")}
                          jobType={t(job?.type) || t("notAvailable")}
                          remote={t(job?.remote) || t("notAvailable")}
                          experienceLevel={
                            job?.minExperience || t("notAvailable")
                          }
                          description={job?.description || t("notAvailable")}
                          slug={job?.slug || t("notAvailable")}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grid>
            </Box>
          </Stack>
        </Stack>
      </main>
    );
  };

  return fetchData();
}
