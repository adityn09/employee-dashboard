import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, ArrowRight, CheckCircle2, ClipboardList, Info, RotateCcw } from 'lucide-react';

const initialValues = { name: '', designation: '', location: '', salary: '' };
const currency = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' });

export default function EmployeeForm() {
  const [values, setValues] = useState(initialValues);
  const [preview, setPreview] = useState(null);

  function update(event) {
    const { name, value } = event.target;
    setValues(current => ({ ...current, [name]: value }));
    setPreview(null);
  }

  function submit(event) {
    event.preventDefault();
    setPreview({ name: values.name.trim(), designation: values.designation.trim(), location: values.location.trim(), salary: Number(values.salary) });
  }

  return (
    <>
      <section className="form-page-heading"><Link className="back-link" to="/"><ArrowLeft size={15} aria-hidden="true" />Back to Home</Link><p className="section-kicker">THE NEXT INTRODUCTION</p><h1>Every person has a story<span className="coral-dot">.</span></h1><p className="hero-description">Start with the essentials. Fill in the employee details below.</p></section>
      <div className="form-page-grid">
        <section className="form-card" aria-labelledby="employee-form-title"><div className="form-card-heading"><div><span className="section-kicker">01 / THE BASICS</span><h2 id="employee-form-title">Employee Form</h2></div><span className="required-note">All fields required</span></div>
          <form onSubmit={submit} onReset={() => { setValues(initialValues); setPreview(null); }}>
            <div className="row g-4">
              <div className="col-12"><label htmlFor="name" className="form-label">Name <span aria-hidden="true">*</span></label><input id="name" name="name" className="form-control" autoComplete="name" placeholder="Enter full name" required pattern=".*\S.*" title="Enter a name with at least one non-space character." maxLength={100} value={values.name} onChange={update} /></div>
              <div className="col-12"><label htmlFor="designation" className="form-label">Designation <span aria-hidden="true">*</span></label><input id="designation" name="designation" className="form-control" autoComplete="organization-title" placeholder="e.g. Software Developer" required pattern=".*\S.*" title="Enter a designation with at least one non-space character." maxLength={100} value={values.designation} onChange={update} /></div>
              <div className="col-sm-6"><label htmlFor="location" className="form-label">Location <span aria-hidden="true">*</span></label><input id="location" name="location" className="form-control" autoComplete="address-level2" placeholder="e.g. Thrissur" required pattern=".*\S.*" title="Enter a location with at least one non-space character." maxLength={100} value={values.location} onChange={update} /></div>
              <div className="col-sm-6"><label htmlFor="salary" className="form-label">Salary <span aria-hidden="true">*</span></label><div className="input-group"><span className="input-group-text">₹</span><input id="salary" name="salary" type="number" className="form-control" required min="0" max="9999999999" step="0.01" placeholder="e.g. 35000" aria-describedby="salary-description" value={values.salary} onChange={update} /></div><div className="form-text" id="salary-description">Monthly salary in INR</div></div>
            </div>
            <div className="form-action-row"><button className="btn btn-reset" type="reset"><RotateCcw size={15} aria-hidden="true" />Reset form</button><button className="btn btn-dark" type="submit">Preview details <ArrowRight size={17} aria-hidden="true" /></button></div>
          </form>
          {preview ? <section className="employee-preview" role="status" aria-label="Employee details preview"><h3><CheckCircle2 size={19} aria-hidden="true" />Ready for a closer look.</h3><dl><div><dt>Name</dt><dd>{preview.name}</dd></div><div><dt>Designation</dt><dd>{preview.designation}</dd></div><div><dt>Location</dt><dd>{preview.location}</dd></div><div><dt>Monthly salary</dt><dd>{currency.format(preview.salary)}</dd></div></dl><p>This is a preview only. No details have been saved or sent.</p></section> : null}
        </section>
        <aside className="form-side-note"><div className="note-illustration" aria-hidden="true"><div className="note-paper"><ClipboardList size={47} strokeWidth={1.2} /><span /><span /></div><span className="note-accent">+</span></div><span className="section-kicker">A GOOD PLACE TO START</span><h2>Small details.<br />Better connections.</h2><p>A name, a role, a place. The essentials that make a team feel a little more familiar.</p><div className="demo-notice"><Info size={18} aria-hidden="true" /><p>For this assignment, the form runs entirely in your browser. Preview your details here; the API directory stays unchanged.</p></div></aside>
      </div>
    </>
  );
}
