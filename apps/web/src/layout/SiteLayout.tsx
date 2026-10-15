import { Outlet } from 'react-router';
import { Footer } from './Footer';
import { Header } from './Header';

export function SiteLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
