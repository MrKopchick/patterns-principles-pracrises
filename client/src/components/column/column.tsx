import { Draggable } from '@hello-pangea/dnd';
import { useContext } from 'react';

import { Card } from '../../common/types/types';
import { CardsList } from '../card-list/card-list';
import { DeleteButton } from '../primitives/delete-button';
import { Splitter } from '../primitives/styled/splitter';
import { Title } from '../primitives/title';
import { Footer } from './components/footer';
import { Container } from './styled/container';
import { Header } from './styled/header';
import { SocketContext } from '../../context/socket';

type Props = {
  listId: string;
  listName: string;
  cards: Card[];
  index: number;
};

export const Column = ({ listId, listName, cards, index }: Props) => {
  const socket = useContext(SocketContext);

  const handleDeleteList = () => {
    socket.emit('list:delete', listId);
  };

  const handleRenameList = (newName: string) => {
    socket.emit('list:rename', { listId, newName });
  };

  return (
    <Draggable draggableId={listId} index={index}>
      {(provided, snapshot) => (
        <Container ref={provided.innerRef} {...provided.draggableProps}>
          <Header
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
          >
            <Title
              aria-label={listName}
              title={listName}
              onChange={handleRenameList}
              fontSize="large"
              width={200}
              isBold
            />
            <Splitter />
            <DeleteButton color="#FFF0" onClick={handleDeleteList} />
          </Header>
          <CardsList listId={listId} listType="CARD" cards={cards} />
          <Footer
            onCreateCard={(name) => socket.emit('card:create', listId, name)}
          />
        </Container>
      )}
    </Draggable>
  );
};
