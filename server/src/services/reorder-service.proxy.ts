import { ReorderServiceContract } from "./reorder-service.contract";

import { ReorderService } from "./reorder.service";
import { List } from "../data/models/list";

// PATTERN:Proxy
class ReorderServiceProxy implements ReorderServiceContract {
  private reorderService: ReorderService;

  constructor(reorderService: ReorderService) {
    this.reorderService = reorderService;
  }

  public reorder<T>(items: T[], startIndex: number, endIndex: number): T[] {
    console.log(`[Proxy] Calling reorder with items.length=${items.length}`);
    return this.reorderService.reorder(items, startIndex, endIndex);
  }

  public reorderCards({
    lists,
    sourceIndex,
    destinationIndex,
    sourceListId,
    destinationListId,
  }: {
    lists: List[];
    sourceIndex: number;
    destinationIndex: number;
    sourceListId: string;
    destinationListId: string;
  }): List[] {
    console.log(
      `[Proxy] Calling reorderCards with sourceIndex=${sourceIndex}, destinationIndex=${destinationIndex}, sourceListId=${sourceIndex}, destinationListId=${destinationListId}`,
    );

    return this.reorderService.reorderCards({
      lists,
      sourceIndex,
      destinationIndex,
      sourceListId,
      destinationListId,
    });
  }
}

export { ReorderServiceProxy };
