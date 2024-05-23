import { Box, Button, Grid, Stack } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import LocalSwitcher from "@/component/localSwitcher";
import axios from "axios";
import { JobDetails } from "@/component/jobDetails";
import { JobBody } from "@/component/jobBody";
import { JobOverview } from "@/component/jobOverview";

import parse from "html-react-parser";

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
            <Button style={{ color: "black" }}>
              <KeyboardBackspaceIcon />
              {"backhomebtn"}
            </Button>
            <LocalSwitcher />
          </Grid>

          <Box width={"100%"}>
            
            <Grid container spacing={3}>
              {jobsArray.map((job) => (
                <Grid item xs={12} key={job?._id}>
                  <JobDetails
                    icon={job?.image}
                    title={job?.name || "Not available"}
                    department={job?.department || "Not available"}
                    location={job?.location || "Not available"}
                    salary={job?.salary || "Not available"}
                    jobType={job?.type || "Not available"}
                    experienceLevel={job?.minExperience || "Not available"}
                    expireDate={job?.expireDate || "Not available"}
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
            <Box >
       
                {jobsArray.map((job) => (
                  <Grid item xs={12} key={job?._id}>
                    <JobBody
                     description={parse(job?.description || "Not available")}
                    />
                  </Grid>
                ))}
         
            </Box>
            <Box>
             
                {jobsArray.map((job) => (
                  <Grid item xs={12} key={job?._id}>
                    <JobOverview
                      created={job?.created || "Not available"}
                      location={job?.location || "Not available"}
                      salary={job?.salary || "Not available"}
                      expire={job?.expire || "Not available"}
                      minExperience={job?.minExperience || "Not available"}
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
