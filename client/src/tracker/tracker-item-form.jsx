import { useContext } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { TrackerListContext } from "./tracker-list-provider.jsx";

function TrackerItemForm({ item, onClose }) {
  const { state, data, error, handlerMap } = useContext(TrackerListContext);

  return (                                  //TODO
    <Modal show={true} onHide={onClose}>          
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          const formData = new FormData(e.target);
          const values = Object.fromEntries(formData);
          values.amount = Number(values.amount);

          let result;
          if (item?.id) {
            result = await handlerMap.handleUpdate({
              id: item.id,
              ...values,
            });
          } else {
            result = await handlerMap.handleCreate({ ...values });
          }
          if (result.ok) {
            onClose();
          }
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{item?.id ? "Update" : "Add"} tracker</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {state === "error" ? (
            <Alert variant={"danger"}>{error.message}</Alert>
          ) : null}
          <Form.Label>Skiresort</Form.Label>
          <Form.Control
            type="text"
            name="skiresort"
            defaultValue={item?.skiresort}
            disabled={state === "pending"}
            required
          />
          <Form.Label>Note</Form.Label>
          <Form.Control
            type="text"
            name="note"
            defaultValue={item?.note}
            disabled={state === "pending"}
          />
          <Form.Label>Activity</Form.Label>
          <Form.Control
            type="number"
            name="activity"
            defaultValue={item?.activity}
            disabled={state === "pending"}
            required
          />
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            defaultValue={
              item?.date
                ? new Date(item?.date).toISOString().slice(0, 10)
                : new Date().toISOString().slice(0, 10)
            }
            disabled={state === "pending"}
            required
          />
          <Form.Label>Category</Form.Label>
          <Form.Select
            type="select"
            name="categoryId"
            defaultValue={item?.categoryId}
            disabled={state === "pending"}
            required
          >
            {data?.categoryMap
              ? Object.keys(data.categoryMap).map((categoryId) => {
                  return (
                    <option key={categoryId} value={categoryId}>
                      {data.categoryMap[categoryId].name}
                    </option>
                  );
                })
              : null}
          </Form.Select>

        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={state === "pending"}
          >
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={state === "pending"}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default TrackerItemForm;
