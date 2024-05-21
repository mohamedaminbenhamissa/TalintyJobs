import type { NextPage } from "next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { Theme } from "@mui/material/styles/createTheme";
import { useRouter } from "next/router";
import { useLocale } from "next-intl";

const ErrorPage: NextPage = () => {
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const router = useRouter();
  const locale = useLocale();
  const handleNavigate = () => {
    router.push(`/${locale}`);
  };

  return (
    <>
      <Typography title="Error: Not Found" />
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          py: "80px",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 6,
            }}
          >
            <Box
              alt="Not found"
              component="img"
              src="/assets/errors/error-404.png"
              sx={{
                height: "auto",
                maxWidth: "100%",
                width: 400,
              }}
            />
          </Box>
          <Typography align="center" variant={mdUp ? "h1" : "h4"}>
            404: The page you are looking for isn’t here
          </Typography>
          <Typography align="center" color="text.secondary" sx={{ mt: 0.5 }}>
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 6,
            }}
          >
            <Button onClick={handleNavigate}>Back to Home</Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ErrorPage;
