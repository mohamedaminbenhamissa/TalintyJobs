import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Job {
  description: string;
}

const JobBody = () => {
  const t = useTranslations("details");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    const fetchJobDescription = async () => {
      try {
        const response = await axios.get<Job>(
          "https://api.talinty.com/api/v1/jobs"
        );
        setDescription(response.data.description);
      } catch (error) {
        console.error("Error fetching job description:", error);
      }
    };

    fetchJobDescription();
  }, []);

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
        <Box dangerouslySetInnerHTML={{ __html: description }} />
      </Box>
    </Box>
  );
};

export default JobBody;
