import { LoggerSubscriber } from "./logger-publisher";

// PATTERN:Observer
class ConsoleErrorLogger implements LoggerSubscriber {
  public update(level: "info" | "warning" | "error", message: string): void {
    if (level === "error") {
      console.error(`[${new Date().toISOString()}] [ERROR] ${message}`);
    }
  }
}

export { ConsoleErrorLogger };
