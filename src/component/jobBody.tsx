import { Fullscreen } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";

const JobBody = () => {
  const t = useTranslations("details");

  return (
    <Box sx={{ p: 2, maxWidth: 1000 }}>
      <Box>
        <Typography
          sx={{
            gap: "1",
            marginBottom: 2,
            color: "#f1e719",
          }}
          variant="subtitle1"
        >
          {t("jobDescription")}
        </Typography>
        <Typography variant="caption">
          As a Product Designer, you will work within a Product Delivery Team
          fused with UX, engineering, product and data talent. You will help the
          team design beautiful interfaces that solve business challenges for
          our clients. We work with a number of Tier 1 banks on building
          web-based applications for AML, KYC and Sanctions List management
          workflows. This role is ideal if you are looking to segue your career
          into the FinTech or Big Data arenas.
        </Typography>
        <Typography
          sx={{
            gap: "1",
            marginTop: 2,
            color: "#f1e719",
          }}
          variant="subtitle1"
        >
          {t("KeyResponsibilities")}
        </Typography>
        <Box
          sx={{
            marginTop: 2,
            listStyleType: "disc",
          }}
        >
          <ul style={{ gap: 2 }}>
            <li>
              <Typography variant="caption">
                - Be involved in every step of the product design cycle from
                discovery to developer handoff and user acceptance testing.
              </Typography>
            </li>
            <li>
              <Typography variant="caption">
                - Work with BAs, product managers and tech teams to lead the
                Product Design
              </Typography>
            </li>
            <li>
              <Typography variant="caption">
                - Maintain quality of the design process and ensure that when
                designs are translated into code they accurately reflect the
                design specifications.
              </Typography>
            </li>
            <li>
              <Typography variant="caption">
                - Accurately estimate design tickets during planning sessions.
              </Typography>
            </li>
            <li>
              <Typography variant="caption">
                - Contribute to sketching sessions involving
                non-designersCreate, iterate and maintain UI deliverables
                including sketch files, style guides, high fidelity prototypes,
                micro interaction specifications and pattern libraries.
              </Typography>
            </li>
            <li>
              <Typography variant="caption">
                - Present your work to the wider business at Show & Tell
                sessions.
              </Typography>
            </li>
          </ul>
        </Box>
        <Typography
          sx={{
            gap: "1",
            marginTop: 2,
            color: "#f1e719",
          }}
          variant="subtitle1"
        >
          {t("SkillExperience")}
        </Typography>
        <Box
          sx={{
            marginTop: 2,
            listStyleType: "disc",
          }}
        >
          <ul style={{ gap: 2 }}>
            <li>
              <Typography variant="caption">
                - You have at least 3 years’ experience working as a Product
                Designer.
              </Typography>
            </li>
            <li>
              <Typography variant="caption">
                - You have experience using Sketch and InVision or Framer X.
              </Typography>
            </li>
            <li>
              <Typography variant="caption">
                - You have some previous experience working in an agile
                environment – Think two-week sprints.
              </Typography>
            </li>
            <li>
              <Typography variant="caption">
                - You are familiar using Jira and Confluence in your workflow.
              </Typography>
            </li>
          </ul>
        </Box>
      </Box>
    </Box>
  );
};

export default JobBody;
