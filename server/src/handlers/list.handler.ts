import type { Socket } from "socket.io";
import { ListEvent } from "../common/enums/enums";
import { List } from "../data/models/list";
import { SocketHandler } from "./socket.handler";

class ListHandler extends SocketHandler {
  public handleConnection(socket: Socket): void {
    socket.on(ListEvent.CREATE, this.createList.bind(this));
    socket.on(ListEvent.GET, this.getLists.bind(this));
    socket.on(ListEvent.REORDER, this.reorderLists.bind(this));
    socket.on(ListEvent.DELETE, this.deleteList.bind(this));
    socket.on(ListEvent.RENAME, this.renameList.bind(this));
  }

  private getLists(callback: (lists: List[]) => void): void {
    callback(this.db.getData());
  }

  private reorderLists(sourceIndex: number, destinationIndex: number): void {
    const allLists = this.db.getData();
    const reorderedLists = this.reorderService.reorder(
      allLists,
      sourceIndex,
      destinationIndex,
    );
    this.db.setData(reorderedLists);
    this.updateLists();
  }

  private createList(name: string): void {
    const allLists = this.db.getData();
    const newList = new List(name);
    this.db.setData(allLists.concat(newList));
    this.updateLists();
  }

  private deleteList(listId: string): void {
    const allLists = this.db.getData();
    const updatedLists = allLists.filter((list) => list.id !== listId);
    this.db.setData(updatedLists);
    this.updateLists();
  }

  private renameList({
    listId,
    newName,
  }: {
    listId: string;
    newName: string;
  }): void {
    const allLists = this.db.getData();
    const updatedLists = allLists.map((list) =>
      list.id === listId
        ? Object.assign(Object.create(Object.getPrototypeOf(list)), {
            ...list,
            name: newName,
          })
        : list,
    );
    this.db.setData(updatedLists);
    this.updateLists();
  }
}

export { ListHandler };
