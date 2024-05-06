import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex h-screen w-screen flex-col items-center gap-8 antialiased">
      <div className="flex w-full justify-center bg-gray-100 p-4 py-8 text-gray-800">
        <h1 className="text-center text-5xl">Li-Fi İletişimli Akıllı Sera Sistemi</h1>
      </div>
      <div className="px-4">
        <Outlet />
      </div>
    </div>
  );
}
