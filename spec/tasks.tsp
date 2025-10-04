import "@typespec/http";
import "./errors.tsp";

using Http;
namespace TgLMSAppBackend;

model SolveTaskRequest {
    lessonId: string;
    taskId: string;
    answer: string;
}

@route("/tasks")
@tag("Tasks")
interface Tasks {
    @post
    @route("/solve")
    solveTask(@body task: SolveTaskRequest): CreatedResponse | Error;
}
