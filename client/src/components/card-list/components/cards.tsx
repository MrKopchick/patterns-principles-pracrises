import { Draggable } from '@hello-pangea/dnd';
import React from 'react';

import { Card } from '../../../common/types/types';
import { CardItem } from '../../card-item/card-item';

type Props = {
  cards: Card[];
  listId: string;
};

const Cards = ({ cards, listId }: Props) => (
  <React.Fragment>
    {cards.map((card, index) => (
      <Draggable key={card.id} draggableId={card.id} index={index}>
        {(provided, snapshot) => (
          <CardItem
            key={card.id}
            card={card}
            listId={listId}
            index={index}
            isDragging={snapshot.isDragging}
            provided={provided}
          />
        )}
      </Draggable>
    ))}
  </React.Fragment>
);

export { Cards };
