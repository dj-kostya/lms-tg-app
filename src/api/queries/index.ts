import { mergeQueryKeys } from "@lukemorales/query-key-factory";
import { userQueryKey } from "./user";

export const queries = mergeQueryKeys(userQueryKey);