interface LoggerSubscriber {
  update(level: "info" | "warning" | "error", message: string): void;
}

// PATTERN:Observer
class LoggerPublisher {
  private subscribers: LoggerSubscriber[] = [];

  public subscribe(subscriber: LoggerSubscriber): void {
    this.subscribers.push(subscriber);
  }

  public log(level: "info" | "warning" | "error", message: string): void {
    for (const sub of this.subscribers) {
      sub.update(level, message);
    }
  }
}

export { LoggerPublisher, LoggerSubscriber };
