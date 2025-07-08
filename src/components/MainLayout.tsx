
import { Outlet } from "react-router-dom";
import BottomNavigation from "./BottomNavigation";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      <main className="pb-20">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};

export default MainLayout;
