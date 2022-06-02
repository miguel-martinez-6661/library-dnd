import React, { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier } from 'dnd-core';
import { Card, Divider, Grid, Text } from '@nextui-org/react';
import { DragItem, ItemTypes } from '../types/DragAndDrop';

interface BookProps {
    id: number,
    text: string,
    photoUrl: string,
    index: number,
    moveBook: (dragIndex: number, hoverIndex: number) => void,
    onClose: (id:number) => void;
}

const Book: FC<BookProps> = ({ id, text, photoUrl, index, moveBook, onClose }) => {
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.BOOK,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveBook(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  // eslint-disable-next-line no-unused-vars
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BOOK,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  });

  drag(drop(ref));

  return (
    <Grid ref={ref} key={id} xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card hoverable clickable bordered data-handler-id={handlerId}>
        <Card.Body css={{ padding: 0 }}>
        <a onClick={() => onClose(id)} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <img src="x.png" alt="none" style={{ width: 27 }} />
          </a>
          <img src={photoUrl} style={{ height: '100%' }} alt="Book" />
        </Card.Body>
        <Divider />
        <Card.Footer css={{ textAlign: 'left', padding: 20 }}>
          <div style={{ marginRight: 15 }}>
            <Text h3>
              {text}
            </Text>
          </div>
        </Card.Footer>
      </Card>
    </Grid>
  );
};

export default Book;
