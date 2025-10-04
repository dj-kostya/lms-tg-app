import "@typespec/http";
import "./errors.tsp";

using Http;
namespace TgLMSAppBackend;

model LoginResponse {
    @example("uuid-v4")
    userId: string;

    @example(1234567890)
    tgUserId: integer;

    @example("test_username")
    tgUsername: string;
}

@route("/user")
@tag("User")
interface User {
    @post
    @route("/login")
    login(): LoginResponse | Error;
}
