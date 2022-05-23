import React, { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import type { Identifier, XYCoord } from 'dnd-core';
import { Card, Divider, Grid, Text } from '@nextui-org/react';
import { DragItem, ItemTypes } from '../types/DragAndDrop';

interface BookProps {
    id: number,
    text: string,
    photoUrl: string,
    index: number,
    moveBook: (dragIndex: number, hoverIndex: number) => void;
}

const Book: FC<BookProps> = ({ id, text, photoUrl, index, moveBook }) => {
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
      // @ts-ignore
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveBook(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BOOK,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging()
    })
  });
  console.log(isDragging);

  drag(drop(ref));

  return (
    <Grid ref={ref} key={id} xs={12} sm={6} md={4} lg={1} data-handler-id={handlerId}>
      <Card hoverable clickable bordered>
        <Card.Body css={{ padding: 0 }}>
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
