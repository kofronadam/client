import { useContext } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { CategoryListContext } from "./category-list-provider.jsx";

function CategoryItemForm({ data, onClose }) {
  const { state, handlerMap } = useContext(CategoryListContext);

  return (
    <Modal show={true} onHide={onClose}>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          const formData = new FormData(e.target);
          const values = Object.fromEntries(formData);
          if (data.id) {
            await handlerMap.handleUpdate({ id: data.id, name: values.name });
          } else {
            await handlerMap.handleCreate({ name: values.name });
          }
          onClose();
        }}
      >
        <div style={{border:"1px solid black", padding:"10px", margin:"5px", width:"25%", float:"center"}}>
        <Modal.Header>
          <Modal.Title>{data?.id ? "Update" : "Add"} category</Modal.Title>
        </Modal.Header>
        <br />
        <Modal.Body>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            defaultValue={data?.name}
            disabled={state === "pending"}
            required
          />
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
            variant="primary"
            type="submit"
            disabled={state === "pending"}
            style={{background:"lightgreen", float:"right"}}
          >
            Save Changes
          </Button>
        </Modal.Footer>
        </div>
      </Form>
    </Modal>
  );
}

export default CategoryItemForm;
