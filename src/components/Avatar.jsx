export default function Avatar({ name, id }) {
  const words = name.trim().split(/\s+/);
  const initials = words.slice(0, 2).map(word => word[0]).join('').toUpperCase();
  return <span className={`employee-avatar tone-${id % 5}`} aria-hidden="true">{initials}</span>;
}
