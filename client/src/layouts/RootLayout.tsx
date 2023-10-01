import { Outlet } from "react-router-dom";

export function RootLayout() {
  return <div className="mx-auto max-w-7xl py-16"><Outlet /></div>
}
