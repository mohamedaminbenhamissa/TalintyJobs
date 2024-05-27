import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface MailProps {
  visible: boolean;
  onClose: () => void;
}

const SendMail: React.FC<MailProps> = ({ visible, onClose }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const t = useTranslations("details");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (!email) {
      setEmailError("");
      setIsEmailValid(false);
    } else if (!validateEmail(email)) {
      setEmailError(t("emailError2"));
      setIsEmailValid(false);
    } else {
      setEmailError("");
      setIsEmailValid(true);
    }
  }, [email, t]);

  const handleSubmit = async () => {
    if (isEmailValid) {
      setSubmitting(true);
      try {
        const response = await axios.post("/api/sendMail", { email });
        console.log("Email sent successfully:", response.data);

        alert("Email sent successfully!");
      } catch (error) {
        console.error("Error sending email:", error);

        alert("Failed to send email. Please try again later.");
      } finally {
        setSubmitting(false);
      }
    } else {
      setEmailError(t("emailError2"));
    }
  };

  if (!visible) return null;
  return (
    <Box
      sx={{
        p: 3,
        width: 380,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          maxWidth: 320,
          mx: "auto",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2">{t("emailremind")}</Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" mb={2}>
            {t("emailCTA")}
          </Typography>
          <TextField
            fullWidth
            type="email"
            label={t("email")}
            name="email"
            required
            value={email}
            error={!!emailError}
            helperText={emailError}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box sx={{ p: 2 }}>
          <Stack direction={"row"} gap={2}>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={onClose}
            >
              {t("cancel")}
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="success"
              disabled={!isEmailValid || submitting}
              onClick={handleSubmit}
            >
              {submitting ? t("sending") : t("send")}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default SendMail;
