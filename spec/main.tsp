import "@typespec/http";
import "./user.tsp";
import "./tasks.tsp";

using Http;
@service(#{ title: "TgLMSAppBackend" })
@useAuth(ApiKeyAuth<ApiKeyLocation.header, "X-TG-INIT-DATA">)
namespace TgLMSAppBackend;
