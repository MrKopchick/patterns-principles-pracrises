import { useContext } from 'react';
import { ColumnCreatorInput } from './components/column-creator-input';
import { Container } from './styled/container';
import { SocketContext } from '../../context/socket';

export const ColumnCreator = () => {
  const socket = useContext(SocketContext);

  return (
    <Container>
      <ColumnCreatorInput
        onCreateList={(name) => socket.emit('list:create', name)}
      />
    </Container>
  );
};
