import { useCallback, useState, type FC } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useDropzone } from "react-dropzone";
import { useTranslations } from "next-intl";

interface FormProps {
  visible: boolean;
  onClose: () => void;
}

const ApplyForm: FC<FormProps> = ({ visible, onClose }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [fileName, setFileName] = useState(""); // New state for file name
  const [fileError, setFileError] = useState(""); // New state for file error

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    if (fileRejections.length > 0) {
      setFileError("Only PDF or TXT files are allowed.");
      setFileName("");
    } else if (acceptedFiles.length > 0) {
      setFileName(acceptedFiles[0].name);
      setFileError("");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [], "text/plain": [] },
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = () => {
    let isValid = true;

    if (!firstName) {
      setFirstNameError("First Name cannot be empty.");
      isValid = false;
    } else {
      setFirstNameError("");
    }

    if (!lastName) {
      setLastNameError("Last Name cannot be empty.");
      isValid = false;
    } else {
      setLastNameError("");
    }

    if (!email) {
      setEmailError("Email cannot be empty.");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (isValid) {
      console.log({ firstName, lastName, email });
    }
  };

  const t = useTranslations("details");
  if (!visible) return null;

  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "neutral.800" : "neutral.100",
        p: 3,
      }}
    >
      <Container maxWidth="sm">
        <Card>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: 400,
              p: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Box sx={{ p: 2 }}>
                  <Typography sx={{ fontSize: 40 }}>
                    {t("titreapplyform")}
                  </Typography>
                </Box>
              </div>
            </Box>
            <Box
              gap={2}
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              <form onSubmit={(event) => event.preventDefault()}>
                <TextField
                  fullWidth
                  label={t("firstname")}
                  margin="normal"
                  name="firstname"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  error={!!firstNameError}
                  helperText={firstNameError}
                  InputProps={{ sx: { borderRadius: 4 } }}
                />
                <TextField
                  fullWidth
                  label={t("lastname")}
                  margin="normal"
                  name="lastname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  error={!!lastNameError}
                  helperText={lastNameError}
                  InputProps={{ sx: { borderRadius: 4 } }}
                />
                <TextField
                  fullWidth
                  label={t("email")}
                  margin="normal"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!emailError}
                  helperText={emailError}
                  InputProps={{ sx: { borderRadius: 4 } }}
                />
                <Box sx={{ marginTop: 2 }}>
                  <div {...getRootProps()}>
                    {isDragActive ? (
                      <p>Drop the files here ...</p>
                    ) : (
                      <p>
                        <AttachFileIcon />
                        {t("cv")}
                      </p>
                    )}
                    <input {...getInputProps()} />
                  </div>
                  {fileName && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {t("selectedfile")}: {fileName}
                    </Typography>
                  )}
                  {fileError && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                      {fileError}
                    </Typography>
                  )}
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
              </form>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default ApplyForm;
