import { TgLmsAppBackendClient } from "tg-lms-backend-api";
import { useRawInitData } from "@telegram-apps/sdk-react";
import { useMemo } from "react";

export function useTgLmsAppBackendClient() {
  const initData = useRawInitData();
  return useMemo(() => {
    if (!initData) {
      throw new Error("initData is not set");
    }
    return new TgLmsAppBackendClient(
      "https://n8n.tg.knosorev.ru/webhook/api",
      { key: initData },
    )
  }, [initData]);
}