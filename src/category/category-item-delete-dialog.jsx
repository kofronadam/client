import { useContext, useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { CategoryListContext } from "./category-list-provider.jsx";

function CategoryItemDeleteDialog({ data, onClose }) {
  const [errorState, setErrorState] = useState();
  const { state, handlerMap } = useContext(CategoryListContext);

  return (
   
   <Modal show={true} onHide={onClose}>
      <div style={{border:"1px solid black", padding:"10px", margin:"5px", width:"25%", float:"center"}}>
      <Modal.Header>
        <Modal.Title>Delete category</Modal.Title>
      </Modal.Header>
      <br />
      <Modal.Body>
        {!!errorState?.message ? (
          <Alert variant={"danger"}>{errorState.message}</Alert>
        ) : null}
        {`Do you really want to delete category ${data.name}`}
      </Modal.Body>
      <br />
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
          disabled={state === "pending" 
          }
          style={{background:"#F55144", float:"right"}}
          onClick={async () => {
            const result = await handlerMap.handleDelete({ id: data.id });
            if (result.ok) {
              onClose();
            } else {
              setErrorState(result.error);
            }
          }}
        >
          Delete
        </Button>
      </Modal.Footer>
      </div>
    </Modal>
  );
}

export default CategoryItemDeleteDialog;
