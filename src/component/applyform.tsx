import { useCallback, useState, FC } from "react";
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
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormProps {
  jobId: string;
  visible: boolean;
  onClose: () => void;
}

const submitApplication = async (formData: FormData) => {
  const payload = {
    params: {
      active: true,
    },
    fields: ["jobId", "firstName", "lastName", "email", "resume"].join(","),
  };

  try {
    const response = await axios.post(
      "http://localhost:5002/api/v1/evaluation/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        params: {
          params: { payload: payload }
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error submitting application:", error);
    throw error;
  }
};

const ApplyForm: FC<FormProps> = ({ visible, onClose, jobId }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const t = useTranslations("details");

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: any[]) => {
      if (fileRejections.length > 0) {
        setFileError(t("fileError"));
        setFileName("");
        setResumeFile(null);
      } else if (acceptedFiles.length > 0) {
        setFileName(acceptedFiles[0].name);
        setResumeFile(acceptedFiles[0]);
        setFileError("");
      }
    },
    [t],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [] },
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async () => {
    let isValid = true;

    if (!firstName) {
      setFirstNameError(t("firstNameError"));
      isValid = false;
    } else {
      setFirstNameError("");
    }

    if (!lastName) {
      setLastNameError(t("lastNameError"));
      isValid = false;
    } else {
      setLastNameError("");
    }

    if (!email) {
      setEmailError(t("emailError"));
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError(t("emailError2"));
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!resumeFile) {
      setFileError(t("fileError"));
      isValid = false;
    } else {
      setFileError("");
    }

    if (isValid) {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("jobId", jobId);
      formData.append("email", email);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("resume", resumeFile as File);

      try {
        await submitApplication(formData);
        toast.success(
          "Your application has been received. Please check your email.",
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          },
        );
      } catch (error) {
        console.error("Error submitting form:", error);

        toast.error("You already applied to this job.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } finally {
        setSubmitting(false);
      }
    }
  };

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
                    {t("applyFormTitle")}
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
                    <input {...getInputProps()} accept="application/pdf" />
                  </div>
                  {fileName && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {t("selectedFile")}: {fileName}
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
                      color="error"
                    >
                      {t("cancel")}
                    </Button>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleSubmit}
                      color="success"
                      disabled={submitting}
                    >
                      {submitting ? t("submitting") : t("send")}
                    </Button>
                  </Stack>
                </Box>
              </form>
            </Box>
          </CardContent>
        </Card>
      </Container>
      <ToastContainer />
    </Box>
  );
};

export default ApplyForm;
