import { useContext } from 'react';
import { DraggableProvided } from '@hello-pangea/dnd';

import { Card } from '../../common/types/types';
import { CopyButton } from '../primitives/copy-button';
import { DeleteButton } from '../primitives/delete-button';
import { Splitter } from '../primitives/styled/splitter';
import { Text } from '../primitives/text';
import { Title } from '../primitives/title';
import { Container } from './styled/container';
import { Content } from './styled/content';
import { Footer } from './styled/footer';
import { SocketContext } from '../../context/socket';

type Props = {
  card: Card;
  isDragging: boolean;
  provided: DraggableProvided;
  listId: string;
  index: number;
};

export const CardItem = ({
  card,
  isDragging,
  provided,
  listId,
  index,
}: Props) => {
  const socket = useContext(SocketContext);

  const handleRenameCard = (newName: string) => {
    socket.emit('card:rename', { listId, cardId: card.id, newName });
  };

  const handleChangeDescription = (newDescription: string) => {
    socket.emit('card:changeDescription', {
      listId,
      cardId: card.id,
      newDescription,
    });
  };

  const handleDeleteCard = () => {
    socket.emit('card:delete', { listId, cardId: card.id });
  };

  const handleDuplicateCard = () => {
    socket.emit('card:duplicate', { listId, cardIndex: index });
  };

  return (
    <Container
      isDragging={isDragging}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      data-is-dragging={isDragging}
      data-testid={card.id}
      aria-label={card.name}
    >
      <Content>
        <Title
          title={card.name}
          onChange={handleRenameCard}
          fontSize="large"
          isBold
        />
        <Text text={card.description} onChange={handleChangeDescription} />
        <Footer>
          <DeleteButton onClick={handleDeleteCard} />
          <Splitter />
          <CopyButton onClick={handleDuplicateCard} />
        </Footer>
      </Content>
    </Container>
  );
};
