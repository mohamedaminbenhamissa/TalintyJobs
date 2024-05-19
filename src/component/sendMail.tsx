"use client";
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

interface MailProps {
  visible: boolean;
  onClose: () => void;
}

const SendMail: React.FC<MailProps> = ({ visible, onClose }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
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
      setEmailError(t("emailerror2"));
      setIsEmailValid(false);
    } else {
      setEmailError("");
      setIsEmailValid(true);
    }
  }, [email, t]);

  const handleSubmit = () => {
    if (isEmailValid) {
    } else {
      setEmailError(t("emailerror2"));
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
              disabled={!isEmailValid}
              onClick={handleSubmit}
            >
              {t("send")}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
};

export default SendMail;
