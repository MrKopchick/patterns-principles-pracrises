import type { Socket } from "socket.io";

import { CardEvent } from "../common/enums/enums";
import { Card } from "../data/models/card";
import { SocketHandler } from "./socket.handler";

class CardHandler extends SocketHandler {
  public handleConnection(socket: Socket): void {
    socket.on(CardEvent.CREATE, this.createCard.bind(this));
    socket.on(CardEvent.REORDER, this.reorderCards.bind(this));
    socket.on(CardEvent.DUPLICATE, this.duplicateCard.bind(this));
  }

  public createCard(listId: string, cardName: string): void {
    const newCard = new Card(cardName, "");
    const allLists = this.db.getData();

    const updatedLists = allLists.map((list) =>
      list.id === listId ? list.setCards(list.cards.concat(newCard)) : list,
    );

    this.db.setData(updatedLists);
    this.updateLists();

    // PATTERN:Observer
    this.logger.log("info", `Created card '${cardName}' in list ${listId}`);
  }

  private reorderCards({
    sourceIndex,
    destinationIndex,
    sourceListId,
    destinationListId,
  }: {
    sourceIndex: number;
    destinationIndex: number;
    sourceListId: string;
    destinationListId: string;
  }): void {
    const allLists = this.db.getData();
    const reordered = this.reorderService.reorderCards({
      lists: allLists,
      sourceIndex,
      destinationIndex,
      sourceListId,
      destinationListId,
    });
    this.db.setData(reordered);
    this.updateLists();

    this.logger.log(
      "info",
      `Reordered card with ${sourceIndex} index from list '${sourceListId}' to '${destinationListId}' with ${destinationIndex} index`,
    );
  }

  // PATTERN:Prototype
  private duplicateCard({
    listId,
    cardIndex,
  }: {
    listId: string;
    cardIndex: number;
  }): void {
    const allLists = this.db.getData();

    const updatedLists = allLists.map((list) => {
      if (list.id === listId) {
        const originalCard = list.cards[cardIndex];
        if (!originalCard) return list;

        const duplicatedCard = originalCard.clone();

        const newCards = [
          ...list.cards.slice(0, cardIndex + 1),
          duplicatedCard,
          ...list.cards.slice(cardIndex + 1),
        ];

        this.logger.log(
          "info",
          `Duplicated card '${originalCard.name}' in list '${listId}'`,
        );

        return list.setCards(newCards);
      }

      return list;
    });

    this.db.setData(updatedLists);
    this.updateLists();
  }
}

export { CardHandler };
