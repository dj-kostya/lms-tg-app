import { TgLmsAppBackendClient } from "tg-lms-backend-api";
import { retrieveRawInitData } from "@telegram-apps/sdk-react";


export function getClient() {
  const initData = retrieveRawInitData();
  if (!initData) {
    console.error('Init data is not set');
    throw new Error("Init data is not set");
  }
  console.log('🚀 TG LMS APP BACKEND CLIENT', initData);
  return new TgLmsAppBackendClient(
    "https://n8n.tg.knosorev.ru/webhook/api",
    { key: initData },
  )

}