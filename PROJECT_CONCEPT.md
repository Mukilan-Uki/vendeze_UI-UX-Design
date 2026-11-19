# Vendeze: Project Overview and Product Direction

**Status:** Discussion draft, 17 November 2026. Proposed capabilities are ideas for review, not approved requirements or completed features.

## 1. Project overview

Vendeze is an event services platform initially focused on Batticaloa, Sri Lanka. The current sample helps customers discover vendors for photography, catering, venues, makeup, sound/music, and decoration. It includes event details, packages, vendor holds, checkout, booking views, and customer/vendor/admin/developer interfaces.

The supplied implementation uses HTML/CSS/JavaScript, a Java Spring Boot REST API, and MySQL. Integration is incomplete: several customer and vendor workflows still operate in browser storage. A working sample screen should therefore not be described as a completed server-backed capability.

The immediate internship assignment is to improve the UI. This document proposes a product direction that can guide that UI work while identifying the server and operational work needed later.

## 2. Problem to investigate

Finding individual vendors is only one part of planning an event. A proposed problem worth validating is that customers also struggle to keep the whole plan consistent as people, prices, venues, and timings change.

Examples to investigate with customers and vendors:

- A customer's guest count increases, but the venue capacity and catering quote are not reconsidered.
- A decorator needs access before the venue permits setup.
- A customer sees a starting price but cannot tell what the full quote excludes.
- One vendor accepts an updated date while another is still working from the old date.
- A vendor declines and the customer cannot see which parts of the plan are affected.

These are product hypotheses, not findings from user interviews conducted for this document.

## 3. Proposed product vision

> Vendeze helps people assemble and coordinate an event plan, understand its costs, and resolve changes before they become event-day problems.

The proposed distinction is the relationship between services: whether selected providers fit the event requirements, which information remains unconfirmed, and how a change affects the rest of the plan.

This is not a claim that the idea is globally new. Its value must be established through local user needs, accurate provider data, and reliable execution.

## 4. What should not be presented as unique by itself

Checklists, budgets, reviews, messaging, vendor portfolios, invitations, and planning dashboards are useful supporting features. They are already offered by established platforms.

[WeddingWire](https://www.weddingwire.com/wedding-planning.html) advertises checklists, budgeting, vendor management, and guest-related planning tools. [Plan a Wedding](https://planawedding.lk/) describes Sri Lankan wedding planning tools including budgets, guest lists, seating, and crew coordination.

These examples are a limited market scan of public product descriptions. They are not a complete competitive audit, and an unlisted capability should not be assumed absent. Local focus and coordination alone are therefore insufficient evidence of uniqueness.

## 5. Proposed defining feature: check whether the event plan works together

Customers enter an event brief once: date, location, guest count, budget, required services, schedule, and any optional preferences or service requirements.

Vendeze then compares that brief with structured information supplied by the selected vendors.

Examples of useful checks:

| Check | Example output |
| --- | --- |
| Guest count against venue capacity | Your selected layout supports 200 guests; the event now has 250. Ask the venue about another layout or choose another venue. |
| Setup timing | Decoration requires access at 2 p.m.; venue access currently begins at 4 p.m. |
| Service coverage | Photography ends at 8 p.m.; your reception schedule runs until 10 p.m. |
| Quote coverage | Transport is not included in this quote. Request the additional charge before approving it. |
| Confirmation completeness | The caterer has not yet acknowledged the latest guest count. |

Results should distinguish a known conflict, missing information, and a confirmed match. Missing data must not be treated as proof that everything is ready. Users should be able to see the information behind a warning and who supplied it.

**First implementation:** explicit rules for guest capacity and setup timing. This can start without AI. Other checks can be added after vendors can supply dependable structured data.

## 6. Proposed feature: show the impact of a change

The customer can preview a change before committing it.

Example:

```text
Proposed change: guest count 200 -> 250

Catering estimate: +Rs. 60,000 at Rs. 1,200 per guest
Venue: capacity needs review
Seating: updated quantity required
Other services: check whether their quote depends on guest count

Next action: request revised quotes from affected vendors
```

All figures in this example are illustrative. The preview should separate a calculated estimate from a binding vendor quote. It must not silently change an accepted price, booking, or payment obligation.

Once the customer submits the change, affected vendors receive the relevant revision and can approve, decline, or provide a revised quote. The previous agreement remains visible until the replacement is explicitly accepted under the agreed product rules.

**Why this is promising:** it connects budget, capacity, quotes, and confirmations around a real customer decision instead of presenting them as unrelated dashboard widgets.

## 7. Supporting feature: comparable, complete quotes

Use a consistent quote structure that includes:

- Base service and selected package.
- Quantity or guest count and price unit.
- Included work and exclusions.
- Transport, setup, overtime, and other applicable charges.
- Estimated versus confirmed total.
- Payment milestones, quote validity, and vendor-provided cancellation terms.
- Revision date and the event version the quote covers.

Comparison should identify missing information rather than declaring the cheapest incomplete quote the best option. Quote templates need category-specific fields; a caterer and a photographer should not be forced into the same service specification.

This extends the current package and guest-pricing concepts, but needs new backend support and consistent server calculations.

## 8. Supporting feature: vendor confirmation and replacement coordination

Show each service's state and the next responsible person: request sent, response needed, change under review, confirmed, declined, or cancelled. Keep booking status separate from payment status and event readiness.

If a vendor declines, Vendeze could suggest replacements based on the same event brief and the affected service requirements. The customer chooses whether to request a replacement, and the replacement vendor must accept.

The existing sample has local backup suggestions, but not a full persisted replacement workflow. A suggested backup is not a reserved backup. Do not promise guaranteed replacement unless vendor agreements, staffing, availability, and commercial policies support it.

## 9. Supporting feature: a shared event schedule

After agreement, create a schedule showing setup, arrivals, service windows, handoffs, and completion. Each vendor sees the details needed for their work and acknowledges relevant changes. Customers can nominate a coordinator or family contact with limited permissions.

For example, decoration completion may affect photography and venue preparation. An unresolved dependency should remain visible until the parties confirm a revised arrangement.

Shared schedules alone are not a new category. Their proposed value here is that they stay connected to the actual event brief, accepted quotes, and subsequent changes. Avoid exposing all customer conversations or personal details to every vendor.

## 10. Local relevance

Research which Batticaloa celebrations, languages, service practices, travel distances, and family decision processes the product should support first.

Possible options include editable event templates, Tamil/English support, locally relevant service categories, dietary requirements, and multiple functions within one celebration. Do not infer a customer's preferences from their identity. Let customers select relevant needs, and validate templates with local people and service providers.

The sample already supports event types beyond weddings. Whether to launch for several event types or one focused segment is an open product decision.

## 11. Example end-to-end experience

1. A customer creates a brief for a 200-guest celebration.
2. They shortlist a venue, caterer, and decorator using comparable quotes.
3. Vendeze identifies a setup-time conflict between the decorator and venue.
4. The customer requests a revised access time; the parties acknowledge it.
5. The guest count later rises to 250.
6. Vendeze previews the estimated price and capacity effects without modifying accepted agreements.
7. The customer requests revisions from affected vendors.
8. The event workspace shows who has acknowledged the new plan and what remains unresolved.

This scenario is a proposed future workflow, not a description of the current application.

## 12. Scope for the internship UI task

Prototype three connected views with clearly labelled sample data:

1. **Event workspace:** brief, selected services, unresolved issues, and next actions.
2. **Quote comparison:** inclusions, exclusions, totals, and missing details.
3. **Change preview:** proposed edit, affected services, estimated cost changes, and required approvals.

Include normal, incomplete, conflicting, loading, and error states. A static prototype should not imply live availability, actual payment collection, or confirmed vendor acceptance.

Keep the current brand and improve the existing screens around this user journey. This is a proposal to discuss with the supervisor; it does not expand an approved UI assignment into an unapproved backend build.

## 13. Phased development proposal

| Phase | Outcome | Main dependency |
| --- | --- | --- |
| Discovery | Select one user segment and validate its highest-priority problem | Supervisor and user/vendor input |
| UI prototype | Demonstrate the event workspace, quote comparison, and change preview | Agreed scenario and labelled sample data |
| Persistence foundation | Reliable accounts, events, quotes, bookings, and authorization across browsers | Existing backend fixes and integration |
| First product workflow | Guest-count change with capacity/price preview and acknowledged quote revision | Structured vendor data and versioned agreements |
| Coordination pilot | Shared timing checks, reminders, and manually assisted replacement handling | Participating vendors and operational ownership |
| Expansion | More event types, rules, languages, and automation | Evidence from the pilot |

No timeline is committed in this draft. Scope and effort must be estimated after the team selects a workflow and resolves the current implementation gaps.

## 14. How to validate the direction

Propose short discovery conversations with event organisers and vendors, arranged through the team. Ask about the last event they handled and actual changes, misunderstandings, and failed confirmations. Avoid asking only whether they like a new feature.

Test a prototype using a concrete task: increase the guest count, identify affected services, and request revised quotes. Observe whether users can tell an estimate from an agreed price and an unresolved request from a confirmation.

Possible pilot measures include the time required to obtain a complete quote, unresolved conflicts before the event, acknowledgement time after a change, and the number of follow-ups needed. Establish a baseline before setting improvement targets.

## 15. Decisions to discuss

- Who is the first customer segment and which event type matters most?
- Is the largest problem price uncertainty, unreliable confirmation, or coordinating changes?
- Will Vendeze provide self-service software, assisted coordination, or both?
- Can participating vendors maintain capacity, setup, and quote information?
- Which parts belong in the current UI assignment, and which are longer-term proposals?
- Which existing behavior is authoritative: immediate booking confirmation or vendor approval?

**Recommended discussion starting point:** pilot one change workflow, such as guest-count changes affecting catering and venue capacity, before committing to a broad planning platform.
