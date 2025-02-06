import React, { useState } from 'react';
import Modal from 'react-modal';
import Draggable from 'react-draggable';

import '../styles/Draggable.css';


function DraggableCard({ children, modalContent }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Draggable>
        <div className="card" onClick={handleClick}>
          {children}
        </div>
      </Draggable>
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        {modalContent}
      </Modal>
    </>
  );
}

export default DraggableCard;
