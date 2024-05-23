import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import React, { FC } from "react";
import PropTypes from "prop-types";

import parse from "html-react-parser"

// const HtmlToPlainText = ({ html }) => {
//   const dummyElement = document.createElement("div");
//   dummyElement.innerHTML = html;
//   const plainText = dummyElement.innerText;

//   return <p>{plainText}</p>;
// };

// export default HtmlToPlainText;

type JobProps ={
  description: string;
}

export const JobBody: FC<JobProps> = ({ description }) => {
     const t = useTranslations("details");
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

       {description}
      </Box>
    </Box>
  );
};
JobBody.propTypes = {
  description: PropTypes.string.isRequired,
};
