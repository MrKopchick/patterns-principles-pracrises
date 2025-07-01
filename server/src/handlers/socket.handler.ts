import { Server, Socket } from "socket.io";

import { ListEvent } from "../common/enums/enums";
import { Database } from "../data/database";
import { ReorderServiceContract } from "../services/reorder-service.contract";
import { LoggerPublisher } from "../services/logger-publisher";
import { FileLogger } from "../services/file-logger";
import { ConsoleErrorLogger } from "../services/console-error-logger";

abstract class SocketHandler {
  protected db: Database;

  protected reorderService: ReorderServiceContract;

  protected io: Server;

  protected logger: LoggerPublisher;

  public constructor(
    io: Server,
    db: Database,
    reorderService: ReorderServiceContract,
  ) {
    this.io = io;
    this.db = db;
    this.reorderService = reorderService;

    // PATTERN:Observer

    this.logger = new LoggerPublisher();
    this.logger.subscribe(new FileLogger("./app.log"));
    this.logger.subscribe(new ConsoleErrorLogger());
  }

  public abstract handleConnection(socket: Socket): void;

  protected updateLists(): void {
    this.io.emit(ListEvent.UPDATE, this.db.getData());
  }
}

export { SocketHandler };
