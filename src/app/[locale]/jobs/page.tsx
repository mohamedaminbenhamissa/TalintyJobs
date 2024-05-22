import JobBody from "@/component/jobBody";
import { JobDetails } from "@/component/jobDetails";
import JobOverview from "@/component/jobOverview";

import { Box, Button, Grid, Stack, Typography } from "@mui/material";

import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import { useLocale, useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import LocalSwitcher from "@/component/localSwitcher";
import axios from "axios";


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
  expireDate: string;
};

export default async function Details() {
  const t = useTranslations("details");
  const locale = useLocale();
  const jobs = await getJobs();
  const handleNavigate = () => {
    redirect(`/${locale}`);
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-start justify-between ">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <Box width={"100%"}>
        <Grid spacing={4} direction={"column"}>
          <Grid display={"flex"} gap={1} justifyContent="space-between">
            <Button style={{ color: "black" }} onClick={handleNavigate}>
              <KeyboardBackspaceIcon />
              {t("backhomebtn")}
            </Button>
            <LocalSwitcher />
          </Grid>

          <Box width={"100%"}>
            <Grid container spacing={3}>
              {jobs?.map((job) => (
                <Grid width={"100%"} item key={job._id}>
                <JobDetails
                  icon={job.image}
                  title={job.name || "Not available"}
                  department={job.department || "Not available"}
                  location={job.location || "Not available"}
                  salary={job.salary || "Not available"}
                  jobType={job.type || "Not available"}
                  experienceLevel={job.minExperience || "Not available"}
                  expireDate={job.expireDate || "Not available"}
                />
                   </Grid>
              ))}
            </Grid>
            
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
