import { useContext, useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { TrackerListContext } from "./tracker-list-provider.jsx";

function TrackerItemDeleteDialog({ item, onClose }) {
  const [errorState, setErrorState] = useState();
  const { state, handlerMap } = useContext(TrackerListContext);

  return (
    <Modal show={true} onHide={onClose}>
      <div style={{border:"1px solid black", padding:"10px", margin:"5px", width:"25%", float:"center"}}>
      <Modal.Header>
        <Modal.Title>Delete tracker</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!!errorState?.message ? (
          <Alert variant={"danger"}>{errorState.message}</Alert>
        ) : null}
        {`Do you really want to delete tracker ${
          item.skiresort
        } (${item.amount.toLocaleString("cs")})`}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onClose}
          disabled={state === "pending"}
          style={{background:"lightgrey"}}
        >
          Close
        </Button>
        <Button
          variant="danger"
          disabled={state === "pending"}
          style={{background:"#F55144", float:"right"}}
          onClick={async () => {
            const result = await handlerMap.handleDelete({ id: item.id });
            if (result.ok) {
              onClose();
            } else {
              setErrorState(result.error);
            }
          }}
        >
          Delete
        </Button>
      </Modal.Footer></div>
    </Modal>
  );
}

export default TrackerItemDeleteDialog;
