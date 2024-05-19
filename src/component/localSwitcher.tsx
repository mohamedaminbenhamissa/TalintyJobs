"use client";

import React, { useTransition } from "react";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import EnglishIcon from "../../public/assets/englishIcon";
import ArabIcon from "../../public/assets/arabIcon";
export default function LocalSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  const onSelectChange = (e: SelectChangeEvent) => {
    const nextLocale = e.target.value;

    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  };
  return (
    <Select
      defaultValue={localActive}
      disabled={isPending}
      variant="outlined"
      size="small"
      onChange={onSelectChange}
      sx={{ display: "flex", alignItems: "center" }}
    >
      <MenuItem
        value="en"
        sx={{ zIndex: 9, display: "flex", justifyContent: "center" }}
      >
        <EnglishIcon />
      </MenuItem>
      <MenuItem
        value="ar"
        sx={{ zIndex: 9, display: "flex", justifyContent: "center" }}
      >
        <ArabIcon />
      </MenuItem>
    </Select>
  );
}
