import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="dark flex h-screen w-screen flex-col items-center antialiased">
      <div className="flex w-full justify-center bg-card p-4 py-8 text-card-foreground">
        <h1 className="text-center font-display text-5xl">Li-Fi İletişimli Akıllı Sera Sistemi</h1>
      </div>
      <div className="w-full grow px-4">
        <Outlet />
      </div>
    </div>
  );
}
