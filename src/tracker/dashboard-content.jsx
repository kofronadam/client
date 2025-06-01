import { useContext, useMemo, useState } from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";

import Icon from "@mdi/react";
import { mdiSki, mdiSigma } from "@mdi/js";

import { TrackerListContext } from "./tracker-list-provider";
import PendingItem from "./pending-item";
import TrackerItemForm from "./tracker-item-form";
import TrackerItemDeleteDialog from "./tracker-item-delete-dialog";
import CategoryDetail from "./category-detail";

function DashboardContent() {
  const [trackerItemFormData, setTrackerItemFormData] = useState();
  const [trackerItemDeleteDialog, setTrackerItemDeleteDialog] =
    useState();
  const { state, data, selectedMonth, setSelectedMonth } = useContext(
    TrackerListContext
  );

  const dashboardData = useMemo(() => {
    const result = {
      sum: 0,
      activity: 0,
      activityMap: {},
    };

    data?.itemList?.forEach((item) => {
      result.sum += item.activity;
      if (item.amount > 0) {
        result.activity += item.amount;
        if (!result.activityMap[item.categoryId]) {
          result.activityMap[item.categoryId] = { sum: 0, activityList: [] };
        }
        result.activityMap[item.categoryId].sum += item.amount;
        result.activityMap[item.categoryId].activityList.push(item);
      }
    });

    return result;
  }, [data]);

  return (
    <Card className="border-0 ">
      {!!trackerItemFormData ? (
        <TrackerItemForm
          item={trackerItemFormData}
          onClose={() => setTrackerItemFormData()}
        />
      ) : null}
      {!!trackerItemDeleteDialog ? (
        <TrackerItemDeleteDialog
          item={trackerItemDeleteDialog}
          onClose={() => setTrackerItemDeleteDialog()}
        />
      ) : null}
      <Card.Header
        className="sticky-top "
        bsPrefix="bg-white"
        style={{ top: "56px", padding: "8px" }}
      >
        <Stack direction="horizontal" gap={3}>
          <div style={{fontSize:"26px", padding:"8px"}}>Activity</div>
          <div>
            <Form.Control
              size="lg"
              type="month"
              placeholder="Small text"
              style={{float: "left", fontSize: "26px"}}
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            />
          
            <Button
              id="myButton"
              variant="success"
              size="sm"
              style={{float: "right", background: "lightblue", fontSize: "26px"}}
              disable={state === "pending"}
              p={2}
              onClick={() => setTrackerItemFormData({})}
            >
              <Icon path={mdiSki} size={0.9} /> Add tracker
            </Button>
          </div>
          <br />
          
          <br />
          <div style={{margin:"8px"}}>Na této stránce máte přehled všech svých zaznamenaných aktivit</div>
        </Stack>
      </Card.Header>
      <Card.Body className="px-0" style={{ position: "relative", top: "40px" }}>
        {state === "pending" && !data
          ? [0, 1, 2, 3].map((item) => <PendingItem key={item} />)
          : null}
        {data ? (
          <div>
            <Stack className={"px-1 py-2"}>
              <div
                className={`ms-auto ${
                  dashboardData.sum < 0 ? "text-danger" : "text-success"}`}
                style={{
                  fontSize: "24px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Icon path={mdiSigma} size={1.1} />
                &nbsp;
                {`${dashboardData.sum.toLocaleString("cs")} km`}
              </div>
            </Stack>
            
            <Card className="border-0">
              <Card.Body>
                <Card.Title>
                  <Stack direction="horizontal" gap={1}>
                    Activity
                    <div
                      className="ms-auto"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {`${dashboardData.activity.toLocaleString("cs")} km`}
                    </div>
                  </Stack>
                </Card.Title>
                <Card.Text>
                  <Accordion>
                    {Object.keys(dashboardData.activityMap).map((categoryId) => {
                      return (
                        <CategoryDetail
                          key={categoryId}
                          categoryId={categoryId}
                          sum={dashboardData.activityMap[categoryId].sum}
                          itemList={
                            dashboardData.activityMap[categoryId].activityList
                          }
                          setTrackerItemFormData={
                            setTrackerItemFormData
                          }
                          setTrackerItemDeleteDialog={
                            setTrackerItemDeleteDialog
                          }
                        />
                      );
                    })}
                  </Accordion>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ) : null}
      </Card.Body>
    </Card>
  );
}

export default DashboardContent;
