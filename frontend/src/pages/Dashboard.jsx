import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";

const Dashboard = () => {
  return (
    <div className="bg-slate-300 flex flex-col h-screen">
      {/* Appbar fixed at the top */}
      <Appbar className="fixed top-0 left-0 right-0 z-10" />

      <Balance balance={5000} />
    </div>
  );
};

export default Dashboard;
