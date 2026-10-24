import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { ArrowRight, CircleAlert, ExternalLink, LayoutGrid, List, Mail, RefreshCw, Search, UsersRound } from 'lucide-react';
import Avatar from '../components/Avatar.jsx';

export const USERS_API = 'https://jsonplaceholder.typicode.com/users';

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [status, setStatus] = useState('loading');
  const [query, setQuery] = useState('');
  const [view, setView] = useState('cards');
  const [request, setRequest] = useState(0);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    setStatus('loading');
    async function load() {
      try {
        const response = await fetch(USERS_API, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const users = await response.json();
        if (!Array.isArray(users) || !users.every(user => Number.isInteger(user.id) && typeof user.name === 'string' && typeof user.email === 'string')) {
          throw new Error('Unexpected API response');
        }
        if (active) { setEmployees(users); setStatus('ready'); }
      } catch {
        if (active) setStatus('error');
      } finally {
        clearTimeout(timer);
      }
    }
    load();
    return () => { active = false; clearTimeout(timer); controller.abort(); };
  }, [request]);

  const search = query.trim().toLowerCase();
  const visibleEmployees = employees.filter(employee => `${employee.id} ${employee.name} ${employee.email}`.toLowerCase().includes(search));
  const count = status === 'ready' ? employees.length : '—';

  return (
    <>
      <section className="dashboard-hero">
        <div className="hero-copy"><p className="section-kicker"><span className="kicker-line" />THE EMPLOYEE WORKSPACE</p><h1>Your people,<br />in one place<span className="coral-dot">.</span></h1><p className="hero-description">A simple way to find your team and get to know<br className="desktop-break" /> the people behind the work.</p><Link to="/employee-form" className="btn btn-dark">Open employee form <ArrowRight size={17} aria-hidden="true" /></Link></div>
        <div className="hero-summary"><div className="summary-top"><span className="summary-icon"><UsersRound size={24} aria-hidden="true" /></span><span className="summary-label">THE DIRECTORY</span></div><div className="summary-number">{count}<span>people to connect with</span></div><div className="summary-bottom"><span className="api-dot" />Public sample directory<ArrowRight size={17} aria-hidden="true" /></div><span className="summary-orbit orbit-one" aria-hidden="true" /><span className="summary-orbit orbit-two" aria-hidden="true" /></div>
      </section>

      <section className="directory" aria-labelledby="directory-heading">
        <div className="directory-heading"><div><span className="section-kicker">MEET THE TEAM</span><div className="heading-with-count"><h2 id="directory-heading">Employee directory</h2><span className="directory-count">{count}</span></div></div><button className="btn refresh-control" disabled={status === 'loading'} onClick={() => setRequest(value => value + 1)}><RefreshCw size={15} aria-hidden="true" />Refresh</button></div>
        <div className="directory-tools"><label className="search-box"><Search size={18} aria-hidden="true" /><span className="visually-hidden">Search employees</span><input className="form-control" type="search" placeholder="Search by name, email or ID" value={query} onChange={event => setQuery(event.target.value)} /></label><div className="view-controls" role="group" aria-label="Directory view"><button type="button" aria-label="Card view" aria-pressed={view === 'cards'} onClick={() => setView('cards')}><LayoutGrid size={18} aria-hidden="true" /></button><button type="button" aria-label="Table view" aria-pressed={view === 'table'} onClick={() => setView('table')}><List size={19} aria-hidden="true" /></button></div></div>

        <div aria-busy={status === 'loading'}>
          {status === 'loading' ? <div className="state-panel" role="status"><span className="spinner-border" aria-hidden="true" /><h3>Getting everyone together…</h3><p>Loading employees from the directory.</p></div> : status === 'error' ? <div className="state-panel" role="alert"><CircleAlert size={32} aria-hidden="true" /><h3>The directory is taking a break.</h3><p>We couldn’t reach the employee API. Check your connection and try again.</p><button className="btn btn-dark" onClick={() => setRequest(value => value + 1)}>Try again <RefreshCw size={15} aria-hidden="true" /></button></div> : visibleEmployees.length === 0 ? <div className="state-panel" role="status"><Search size={30} aria-hidden="true" /><h3>{employees.length ? 'No one by that name. Yet.' : 'The directory is empty.'}</h3><p>{employees.length ? 'Try another name, email address or employee ID.' : 'The API returned no employees.'}</p>{query ? <button className="btn btn-outline-dark" onClick={() => setQuery('')}>Clear search</button> : null}</div> : view === 'cards' ?
            <div className="row g-3 employee-grid">{visibleEmployees.map(employee => <div className="col-12 col-md-6 col-xl-4" key={employee.id}><article className="employee-card"><div className="employee-card-top"><Avatar name={employee.name} id={employee.id} /><span className="employee-id">ID / {String(employee.id).padStart(2, '0')}</span></div><h3>{employee.name}</h3><a className="employee-email" href={`mailto:${employee.email}`}><Mail size={14} aria-hidden="true" /><span>{employee.email}</span><ArrowRight className="email-arrow" size={14} aria-hidden="true" /></a></article></div>)}</div> :
            <div className="table-responsive table-shell"><table className="table align-middle mb-0"><caption className="visually-hidden">Employee ID, name and email address</caption><thead><tr><th scope="col">EMPLOYEE ID</th><th scope="col">NAME</th><th scope="col">EMAIL ADDRESS</th></tr></thead><tbody>{visibleEmployees.map(employee => <tr key={employee.id}><td className="employee-id">{String(employee.id).padStart(2, '0')}</td><td><span className="table-name"><Avatar name={employee.name} id={employee.id} />{employee.name}</span></td><td><a href={`mailto:${employee.email}`}>{employee.email}</a></td></tr>)}</tbody></table></div>
          }
        </div>
        <div className="directory-footnote"><span role="status">{status === 'ready' ? `Showing ${visibleEmployees.length} of ${employees.length} employees` : status === 'loading' ? 'Connecting to directory…' : 'Directory unavailable'}</span><a href={USERS_API} target="_blank" rel="noreferrer">Data from JSONPlaceholder <ExternalLink size={12} aria-hidden="true" /></a></div>
      </section>
    </>
  );
}
