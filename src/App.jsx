import { useEffect, useRef } from 'react';
import { Link, NavLink, Route, Routes, useLocation } from 'react-router';
import { ArrowRight, LayoutDashboard, UserRoundPlus } from 'lucide-react';
import Dashboard from './pages/Dashboard.jsx';
import EmployeeForm from './pages/EmployeeForm.jsx';

export default function App() {
  const { pathname } = useLocation();
  const mainRef = useRef(null);
  const previousPath = useRef(pathname);

  useEffect(() => {
    const page = pathname === '/' ? 'Employee Dashboard' : pathname === '/employee-form' ? 'Employee Form' : 'Page not found';
    document.title = `${page} | Teamdesk`;
    if (previousPath.current !== pathname) {
      mainRef.current?.focus();
      window.scrollTo(0, 0);
      previousPath.current = pathname;
    }
  }, [pathname]);

  return (
    <div className="app-layout">
      <a className="skip-link" href="#main" onClick={event => { event.preventDefault(); mainRef.current?.focus(); }}>Skip to content</a>
      <header className="topbar">
        <nav className="container page-container navbar" aria-label="Main navigation">
          <Link to="/" className="brand" aria-label="Teamdesk home"><span className="brand-mark" aria-hidden="true">t<span /></span>teamdesk<span className="brand-period">.</span></Link>
          <div className="main-nav">
            <NavLink to="/" end><LayoutDashboard size={16} aria-hidden="true" />Home</NavLink>
            <NavLink to="/employee-form"><UserRoundPlus size={17} aria-hidden="true" />Employee Form</NavLink>
          </div>
          <div className="student-profile"><span className="profile-initials" aria-hidden="true">AP</span><div><strong>Adithyan P B</strong><span>REACT · ASSIGNMENT 02</span></div></div>
        </nav>
      </header>
      <main id="main" className="container page-container main-content" ref={mainRef} tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employee-form" element={<EmployeeForm />} />
          <Route path="*" element={<section className="state-panel not-found"><span className="section-kicker">404 / WRONG TURN</span><h1>Let’s get you back to the team.</h1><p>This page doesn’t exist.</p><Link className="btn btn-dark" to="/">Back to Home <ArrowRight size={17} /></Link></section>} />
        </Routes>
      </main>
      <footer className="container page-container footer"><span className="footer-brand">teamdesk<span>.</span> <span className="footer-tagline">A place for your people.</span></span><span>Assignment 02 <span className="footer-separator">/</span> Adithyan P B</span></footer>
    </div>
  );
}
