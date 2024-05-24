import { Box, Button, Grid, Stack } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LocalSwitcher from "@/component/localSwitcher";
import axios from "axios";
import { JobDetails } from "@/component/jobDetails";
import { JobBody } from "@/component/jobBody";
import { JobOverview } from "@/component/jobOverview";
import parse from "html-react-parser";
import { Link } from "@/navigation";
import { getTranslations } from "next-intl/server";

export async function generateStaticParams() {
  const payload = {
    params: {
      active: true,
    },
    fields: ["_id", "slug"].join(","),
  };

  try {
    const response = await axios.get("http://localhost:5002/api/v1/job/", {
      params: { payload: payload },
    });

    console.log(response.data);
    const jobs = response.data.jobs;

    if (Array.isArray(jobs)) {
      return jobs.map((job) => ({
        slug: job.slug,
        _id: job._id,
      }));
    } else {
      throw new Error("Expected an array of jobs");
    }
  } catch (error) {
    console.error("Error fetching jobs:", error);
  }
}

const getJob = async (jobId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5002/api/v1/job/${jobId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching job:", error);
  }
};
type Params = {
  slug: string;
};

export default async function Job({ params }: { params: Params }) {
  console.log("🚀 ~ Job ~ Job:", Job);
  const { slug: jobId } = params;
  const jobData = await getJob(jobId);
  const jobsArray = Array.isArray(jobData) ? jobData : [jobData];
  console.log("🚀 ~ Job ~ jobsArray:", jobsArray);
  const t = await getTranslations("details");

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
                {t("backhomebtn")}
              </Button>
            </Link>
            <LocalSwitcher />
          </Grid>

          <Box width={"100%"} marginTop={"10px"}>
            <Grid container spacing={3}>
              {jobsArray.map((job) => (
                <Grid item xs={12} key={job?._id}>
                  <JobDetails
                    icon={`https://astrolab.co/wp-content/uploads/2023/10/astrolab-1.svg`}
                    title={job?.name || t("notavailable")}
                    department={job?.department || t("notavailable")}
                    location={job?.location || t("notavailable")}
                    salary={job?.salary || t("notavailable")}
                    jobType={job?.type || t("notavailable")}
                  
                    experienceLevel={job?.minExperience || t("notavailable")}
                    expire={job?.expire || t("notavailable")}
                    _id={job?._id || t("notavailable")}
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
                    description={parse(job?.description || t("notavailable"))}
                  />
                </Grid>
              ))}
            </Box>
            <Box>
              {jobsArray.map((job) => (
                <Grid item xs={12} key={job?._id}>
                  <JobOverview
                    created={job?.created || t("notavailable")}
                    location={job?.location || t("notavailable")}
                    salary={job?.salary || t("notavailable")}
                    expire={job?.expire || t("notavailable")}
                    minExperience={job?.minExperience || t("notavailable")}
                    remote={job?.remote ||  t("notavailable")}
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
