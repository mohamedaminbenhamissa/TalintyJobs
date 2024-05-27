import { FC } from "react";

import { useTranslations } from "next-intl";

import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { Box, Dialog, DialogContent, DialogContentText } from "@mui/material";

import { CustomDialogTitle } from "./shareModal.styles";
import { ModalTermsProps } from "./shareModal.types";

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { Stack } from "@mui/system";

const Share: FC<ModalTermsProps> = (props) => {
  const { isOpen, auction_id, title, onClose } = props;
  const t = useTranslations("Home");

  return (
    <Dialog open={isOpen} onClose={onClose} disableScrollLock={true}>
      <CustomDialogTitle>{t("Share")}</CustomDialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
        <Stack direction={"column"} gap={3}>
          <Stack direction={"row"} gap={3}>
            <FacebookShareButton
              title={title}
              url={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/auctions/${auction_id}`}
            >
              <FacebookIcon
                style={{ borderEndStartRadius: 15, borderStartEndRadius: 15 }}
              />
            </FacebookShareButton>

            <TwitterShareButton
              title={title}
              url={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/auctions/${auction_id}`}
            >
              <TwitterIcon
                style={{ borderEndStartRadius: 15, borderStartEndRadius: 15 }}
              />
            </TwitterShareButton>
            <WhatsappShareButton
              title={title}
              url={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/auctions/${auction_id}`}
            >
              <WhatsappIcon
                style={{ borderEndStartRadius: 15, borderStartEndRadius: 15 }}
              />
            </WhatsappShareButton>
          </Stack>
          <Stack direction={"row"} gap={3}>
            <TelegramShareButton
              title={title}
              url={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/auctions/${auction_id}`}
            >
              <TelegramIcon
                style={{ borderEndStartRadius: 15, borderStartEndRadius: 15 }}
              />
            </TelegramShareButton>

            <EmailShareButton
              subject={title}
              url={`${process.env.NEXT_PUBLIC_DOMAIN_URL}/auctions/${auction_id}`}
            >
              <EmailIcon
                style={{ borderEndStartRadius: 15, borderStartEndRadius: 15 }}
              />
            </EmailShareButton>
            <Box
              onClick={() => {
                navigator.clipboard.writeText(
                  `${process.env.NEXT_PUBLIC_DOMAIN_URL}/auctions/${auction_id}`,
                );

                !!onClose && onClose();
              }}
              style={{
                height: 65,
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                flex: 1,
                borderEndStartRadius: 15,
                borderStartEndRadius: 15,
              }}
            >
              <ContentPasteIcon sx={{ fontSize: 30, color: "white" }} />
            </Box>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export { Share };
