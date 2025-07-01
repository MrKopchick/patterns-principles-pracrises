import type { DraggableLocation } from '@hello-pangea/dnd';
import { type Card, type List } from '../common/types/types';

export function reorderLists(
  items: List[],
  startIndex: number,
  endIndex: number,
): List[] {
  const result = Array.from(items);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export function removeCardFromList(cards: Card[], index: number): Card[] {
  return cards.slice(0, index).concat(cards.slice(index + 1));
}

export function addCardToList(
  cards: Card[],
  index: number,
  card: Card,
): Card[] {
  return cards.slice(0, index).concat(card).concat(cards.slice(index));
}

export function reorderCards(
  lists: List[],
  source: DraggableLocation,
  destination: DraggableLocation,
): List[] {
  const currentCards: Card[] =
    lists.find((list) => list.id === source.droppableId)?.cards || [];
  const nextCards: Card[] =
    lists.find((list) => list.id === destination.droppableId)?.cards || [];
  const targetCard: Card = currentCards[source.index];

  const isMovingInSameList = source.droppableId === destination.droppableId;

  if (isMovingInSameList) {
    const updatedCards = Array.from(currentCards);
    const [removed] = updatedCards.splice(source.index, 1);
    updatedCards.splice(destination.index, 0, removed);

    return lists.map((list) =>
      list.id === source.droppableId ? { ...list, cards: updatedCards } : list,
    );
  }

  return lists.map((list) => {
    if (list.id === source.droppableId) {
      return { ...list, cards: removeCardFromList(currentCards, source.index) };
    }
    if (list.id === destination.droppableId) {
      return {
        ...list,
        cards: addCardToList(nextCards, destination.index, targetCard),
      };
    }
    return list;
  });
}
