import type { Socket } from "socket.io";
import { CardEvent } from "../common/enums/enums";
import { Card } from "../data/models/card";
import { SocketHandler } from "./socket.handler";

class CardHandler extends SocketHandler {
  public handleConnection(socket: Socket): void {
    socket.on(CardEvent.CREATE, this.createCard.bind(this));
    socket.on(CardEvent.REORDER, this.reorderCards.bind(this));
    socket.on(CardEvent.DELETE, this.deleteCard.bind(this));
    socket.on(CardEvent.RENAME, this.renameCard.bind(this));
    socket.on(CardEvent.CHANGE_DESCRIPTION, this.changeDescription.bind(this));
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
  }

  private deleteCard({
    listId,
    cardId,
  }: {
    listId: string;
    cardId: string;
  }): void {
    const allLists = this.db.getData();
    const updatedLists = allLists.map((list) =>
      list.id === listId
        ? list.setCards(list.cards.filter((card) => card.id !== cardId))
        : list,
    );

    this.db.setData(updatedLists);
    this.updateLists();
  }

  private renameCard({
    listId,
    cardId,
    newName,
  }: {
    listId: string;
    cardId: string;
    newName: string;
  }): void {
    const allLists = this.db.getData();
    const updatedLists = allLists.map((list) => {
      if (list.id === listId) {
        const updatedCards = list.cards.map((card) =>
          card.id === cardId ? new Card(newName, card.description) : card,
        );
        return list.setCards(updatedCards);
      }
      return list;
    });

    this.db.setData(updatedLists);
    this.updateLists();
  }

  private changeDescription({
    listId,
    cardId,
    newDescription,
  }: {
    listId: string;
    cardId: string;
    newDescription: string;
  }): void {
    const allLists = this.db.getData();
    const updatedLists = allLists.map((list) => {
      if (list.id === listId) {
        const updatedCards = list.cards.map((card) =>
          card.id === cardId ? new Card(card.name, newDescription) : card,
        );
        return list.setCards(updatedCards);
      }
      return list;
    });

    this.db.setData(updatedLists);
    this.updateLists();
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
        const cardToDuplicate = list.cards[cardIndex];
        if (!cardToDuplicate) return list;
        const duplicatedCard = cardToDuplicate.clone();
        const newCards = [
          ...list.cards.slice(0, cardIndex + 1),
          duplicatedCard,
          ...list.cards.slice(cardIndex + 1),
        ];
        return list.setCards(newCards);
      }
      return list;
    });

    this.db.setData(updatedLists);
    this.updateLists();
  }
}

export { CardHandler };
