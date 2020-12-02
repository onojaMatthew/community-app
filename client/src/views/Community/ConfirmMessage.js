import React from "react";
import { Modal, ModalBody, Col, Row, ModalHeader, Button, Spinner } from "reactstrap";

const ConfirmMessage = ({
    modal, 
    setModal,
    message,
    onDelete,
    community,
  }) => {
  return (
    <div>
      <Modal isOpen={modal} toggle={setModal}>
        <ModalHeader
          toggle={() => setModal(true)}
          style={{
            background: "linear-gradient(to right, #0e6b0e 0%, #0e6b0e 100%)",
            color: "#fff"
          }}
        >
          Confirm Message
        </ModalHeader>
        <ModalBody>
          <p>{message}</p>
          <Row className="mt-4">
            <Col xs="6" xl="6">
              <Button color="warning" onClick={() => setModal(true)}>Cancil</Button>
            </Col>
            <Col xs="6" xl="6">
              {community.deleteLoading === true ? (
                <div className="text-center">
                  <Spinner color="primary" />
                </div>
              ) : <Button onClick={() => onDelete()} color="danger">Delete</Button>}
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ConfirmMessage;
