import { createQueryKeys } from "@lukemorales/query-key-factory";
import { useTgLmsAppBackendClient } from "@/api/client"


export const userQueryKey = createQueryKeys('user', {
    login: () => ({
        queryKey: ['login'],
        queryFn: async () => useTgLmsAppBackendClient().userClient.login(),
    }),
});