import { getActiveSpan, getIsolationScope } from "@sentry/nextjs";
import { format } from "node:util";

const levels = ["info", "warn", "error"] as const;
type LogLevelName = (typeof levels)[number];

function write(level: LogLevelName, fields: Record<string, unknown>) {
  const span_context = getActiveSpan()?.spanContext();
  const line = JSON.stringify({
    level,
    ...fields,
    span_id: span_context?.spanId,
    timestamp: new Date().toISOString(),
    trace_id: span_context?.traceId,
  });
  if (levels.indexOf(level) < levels.indexOf("warn")) console.log(line);
  else console.error(line);
}

function exception_fields(exception: Error) {
  const causes = [];
  for (
    let cause: unknown = exception.cause;
    cause !== undefined && causes.length < 10;
    cause = cause instanceof Error ? cause.cause : undefined
  ) {
    causes.push(
      cause instanceof Error
        ? { message: cause.message, type: cause.name }
        : { message: String(cause) },
    );
  }
  return {
    ...(causes.length > 0 ? { "exception.causes": causes } : {}),
    "exception.message": exception.message,
    "exception.stacktrace": exception.stack,
    "exception.type": exception.name,
  };
}

const writeMessage =
  (level: LogLevelName) =>
  (...args: unknown[]) => {
    const exception = args.find((arg) => arg instanceof Error);
    write(level, {
      ...(exception ? exception_fields(exception) : {}),
      msg: format(...args),
    });
  };

export const logger = {
  error: writeMessage("error"),
  warn: writeMessage("warn"),
};

type TrackDetails = Record<
  string,
  boolean | Error | null | number | readonly string[] | string | undefined
>;

function detail_value(value: TrackDetails[string]) {
  if (value instanceof Error) return `${value.name}: ${value.message}`;
  return value === undefined ? "undefined" : value;
}

export function track(name: string, details: TrackDetails) {
  write("info", {
    "event.name": name,
    "http.route": getIsolationScope().getScopeData().transactionName,
    ...Object.fromEntries(
      Object.entries(details).map(([key, value]) => [key, detail_value(value)]),
    ),
  });
}
