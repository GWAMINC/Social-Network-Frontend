import Navbar from "@/layouts/Navbar";
import { Outlet } from "react-router-dom";
import { createContext, useState } from "react";

export const GroupIdContext = createContext(null);

function DefaultLayout() {
  const [groupId, setGroupId] = useState(null);

  return (
    <GroupIdContext.Provider value={[groupId, setGroupId]}>
      <div className="wrapper">
        <Navbar />
        <div className="body bg-background">
          <Outlet />
        </div>
      </div>
    </GroupIdContext.Provider>
  );
}

export default DefaultLayout;
