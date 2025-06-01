import Container from "react-bootstrap/esm/Container";
import TrackerListProvider from "./tracker-list-provider";
import DashboardContent from "./dashboard-content";

function Dashboard() {
  return (
    <Container>
      <TrackerListProvider>
        <DashboardContent />
      </TrackerListProvider>
    </Container>
  );
}

export default Dashboard;
