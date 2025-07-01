import { List } from "../data/models/list";

interface ReorderServiceContract {
  reorder<T>(items: T[], startIndex: number, endIndex: number): T[];

  reorderCards(params: {
    lists: List[];
    sourceIndex: number;
    destinationIndex: number;
    sourceListId: string;
    destinationListId: string;
  }): List[];
}

export { ReorderServiceContract };
