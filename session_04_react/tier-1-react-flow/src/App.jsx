import LifecycleDemo from "./LifecycleDemo";
import BadCounter from "./BadCounter";
import GoodCounter from "./GoodCounter";
import FlowDemo from "./FlowDemo";

function App() {
  return (
    <div>
      <h1>Tier 1 — Hiểu luồng hoạt động của React</h1>

      <LifecycleDemo />
      <BadCounter />
      <GoodCounter />
      <FlowDemo />
    </div>
  );
}

export default App;
