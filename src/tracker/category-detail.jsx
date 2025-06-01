import { useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/esm/Stack";

import { TrackerListContext } from "./tracker-list-provider";
import TrackerItem from "./tracker-item";

function CategoryDetail({
  categoryId,
  activity,
  itemList,
  setTrackerItemFormData,
  setTrackerItemDeleteDialog,
}) {
  const { data } = useContext(TrackerListContext);

  return (
    <Accordion.Item eventKey={categoryId} style={{ width: "100%" }}>
      <Accordion.Header className="p-0">
        <Stack direction="horizontal" gap={2}>
          <div>{data?.categoryMap[categoryId].name}</div>
          <div>{activity.toLocaleString("cs")}</div>
        </Stack>
      </Accordion.Header>
      <Accordion.Body>
        <Row>
          {itemList?.map((item) => {
            return (
              <TrackerItem
                item={item}
                setTrackerItemFormData={setTrackerItemFormData}
                setTrackerItemDeleteDialog={setTrackerItemDeleteDialog}
              />
            );
          })}
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  );
}

export default CategoryDetail;
