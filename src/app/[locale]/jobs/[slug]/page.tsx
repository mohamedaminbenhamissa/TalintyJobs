import { Box, Button, Grid, Stack } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LocalSwitcher from "@/component/localSwitcher";
import axios from "axios";
import { JobDetails } from "@/component/jobDetails";
import { JobBody } from "@/component/jobBody";
import { JobOverview } from "@/component/jobOverview";
import parse from "html-react-parser";
import { Link } from "@/navigation";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

const getJob = async (jobId: string) => {
  try {
    const response = await axios.get(`${process.env.BACKEND_URL}job/${jobId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching job:", error);
    return null;
  }
};
type Params = {
  slug: string;
};

export default async function Job({ params }: { params: Params }) {
  const { slug: jobId } = params;
  const jobData = await getJob(jobId);
  const jobsArray = Array.isArray(jobData) ? jobData : [jobData];

  const t = await getTranslations("details");

  // @ts-ignore
  return (
    <main className="flex min-h-screen w-full flex-col items-start justify-between">
      <Box width={"100%"}>
        <Grid container spacing={4} direction={"column"}>
          <Grid
            item
            xs={12}
            display={"flex"}
            gap={1}
            justifyContent="space-between"
          >
            <Link href="/">
              <Button style={{ color: "black" }}>
                <KeyboardBackspaceIcon />
                {t("btnBackToHome")}
              </Button>
            </Link>
            <LocalSwitcher />
          </Grid>

          <Box width={"100%"} marginTop={"10px"}>
            <Grid container spacing={3}>
              {jobsArray.map((job) => (
                <Grid item xs={12} key={job?._id}>
                  <JobDetails
                    icon={job?.image}
                    title={job?.name || t("notAvailable")}
                    department={job?.department || t("notAvailable")}
                    location={job?.location || t("notAvailable")}
                    salary={job?.salary || t("notAvailable")}
                    jobType={t(job?.type) || t("notAvailable")}
                    experienceLevel={job?.minExperience || t("notAvailable")}
                    expire={job?.expire || t("notAvailable")}
                    _id={job?._id || t("notAvailable")}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>

          <Stack
            direction={"row"}
            display={"flex"}
            justifyContent="space-between"
            marginLeft={4}
            marginRight={2}
          >
            <Box>
              {jobsArray.map((job) => (
                <Grid item xs={12} key={job?._id}>
                  <JobBody
                    description={parse(job?.description || t("notAvailable"))}
                  />
                </Grid>
              ))}
            </Box>
            <Box>
              {jobsArray.map((job) => (
                <Grid item xs={12} key={job?._id}>
                  <JobOverview
                    created={job?.created || t("notAvailable")}
                    location={job?.location || t("notAvailable")}
                    salary={job?.salary || t("notAvailable")}
                    expire={job?.expire || t("notAvailable")}
                    minExperience={job?.minExperience || t("notAvailable")}
                    remote={t(job?.remote) || t("notAvailable")}
                  />
                </Grid>
              ))}
            </Box>
          </Stack>
        </Grid>
      </Box>
    </main>
  );
}
