import ListGroup from "react-bootstrap/ListGroup";
import Stack from "react-bootstrap/esm/Stack";
import Button from "react-bootstrap/Button";

import Icon from "@mdi/react";
import { mdiPencilOutline, mdiClose } from "@mdi/js";

function CategoryItem({
  data,
  setCategoryItemFormData,
  setCategoryItemDeleteDialog,
}) {
  return (
    <ListGroup.Item variant="primary">
      <div style={{border:"1px solid black", padding:"10px", margin:"5px", width:"auto"}}>
      <Stack direction="horizontal" gap={1} >
        {data.name}
        
          <Button
            className="border-0 p-1"
            variant="outline-primary"
            size="sm"
            style={{float:"right"}}
            onClick={() => setCategoryItemFormData(data)}
          >
            <Icon path={mdiPencilOutline} size={0.8} />
          </Button>
          <Button
            className="border-0 p-1"
            variant="outline-danger"
            size="sm"
            style={{float:"right"}}
            onClick={() => setCategoryItemDeleteDialog(data)}
          >
            <Icon path={mdiClose} size={0.8} />
          </Button>
        
      </Stack>
      </div>
    </ListGroup.Item>
  );
}

export default CategoryItem;
