"use client";

import React, { ChangeEvent, useTransition } from "react";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import EnglishIcon from "../../public/assets/englishIcon";
import ArabIocn from "../../public/assets/arabIcon";
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
    <>
      <FormControl>
        <Select
          defaultValue={localActive}
          disabled={isPending}
          variant="outlined"
          size="small"
          onChange={onSelectChange}
          sx={{ padding: 0 }}
        >
          <MenuItem value="en">
            <EnglishIcon />
          </MenuItem>
          <MenuItem value="ar">
            <ArabIocn />
          </MenuItem>
        </Select>
      </FormControl>
    </>
  );
}
