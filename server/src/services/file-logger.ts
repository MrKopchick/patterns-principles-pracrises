import { LoggerSubscriber } from "./logger-publisher";
import * as fs from "fs";

// PATTERN:Observer
class FileLogger implements LoggerSubscriber {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  public update(level: "info" | "warning" | "error", message: string): void {
    const logLine = `[${new Date().toISOString}] [${level.toUpperCase()}] ${message}\n`;
    fs.appendFileSync(this.filePath, logLine);
  }
}

export { FileLogger };
