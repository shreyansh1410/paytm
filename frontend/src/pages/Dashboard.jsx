import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

const Dashboard = () => {
  return (
    <div className="bg-slate-300 flex flex-col h-screen font-roboto">
      {/* Appbar fixed at the top */}
      <Appbar className="fixed top-0 left-0 right-0 z-10" firstName="John" />

      <Balance balance={5000} />
      <Users />
    </div>
  );
};

export default Dashboard;
