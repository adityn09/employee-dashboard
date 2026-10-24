# Assignment 2 verification

**Student:** Adithyan P B

**Checked:** 24 October 2026

| Check | Result |
| --- | --- |
| Dependency installation | Passed; npm audit reported 0 vulnerabilities |
| Production build | Passed, Vite 7.3.7 |
| Live API to dashboard | 10 JSONPlaceholder users rendered as employee cards |
| Card data | ID, name and email displayed |
| Table switch | 10 table rows rendered; card view removed |
| Search by name | `leanne` returned 1 card |
| Search by email | `Telly.Hoeger` returned 1 card |
| Search by ID | `10` returned 1 card |
| Unmatched search | Empty state displayed; Clear search restored all employees |
| Navbar | Home and Employee Form routes opened correctly |
| Route focus | Focus moved to main content after navigation |
| Skip link | Main content received focus without changing the route |
| Direct route refresh | Employee Form remained on the correct route after reload |
| Required fields | Empty name reported valueMissing |
| Whitespace rejection | Whitespace-only name reported patternMismatch |
| Negative salary | -100 reported rangeUnderflow |
| Salary decimals | 35000.125 reported stepMismatch |
| Valid form preview | Demo Employee, React Developer, Thrissur, ₹35,000.00 displayed |
| Edit after preview | Preview was removed to avoid displaying stale values |
| Reset | All four inputs returned to empty values |
| No frontend POST | Source has one fetch for GET users; form only updates React state |
| Browser console | No warnings or errors reported during the checks |

The screenshots contain public sample API users and fictional form details.

Responsive breakpoints are implemented in Bootstrap and custom CSS. The available browser ignored its requested 390px viewport override and continued reporting a 1280px viewport. A genuine phone-width visual check therefore remains manual.

The live API was used for browser checks; no mock employee data was substituted. Error handling and timeout logic are implemented; forced network-failure behavior was not simulated in this run.
