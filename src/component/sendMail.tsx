"use client";
import {
  Box,
  Button,
  Divider,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

interface mailProps {
  visible: boolean;
  onClose: () => void;
}

const SendMail: React.FC<mailProps> = ({ visible, onClose }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = () => {
    let isValid = true;
    if (!email) {
      setEmailError(t("emailerror"));
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError(t("emailerror2"));
      isValid = false;
    } else {
      setEmailError("");
    }

    if (isValid) {
      console.log({ email });
    }
  };
  const t = useTranslations("details");
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
        <Box sx={{ mt: 2 }}>
          <MenuItem>
            <TextField
              fullWidth
              type="email"
              label={t("email")}
              name="email"
              value={email}
              error={!!emailError}
              helperText={emailError}
              InputProps={{ sx: { borderRadius: 4 } }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </MenuItem>
        </Box>
        <Box sx={{ p: 2 }}>
          <Stack direction={"row"} gap={2}>
            <Button
              fullWidth
              variant="outlined"
              onClick={onClose}
              sx={{ borderRadius: 4 }}
            >
              {t("cancel")}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{ borderRadius: 4 }}
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
