Ghazi Anshari
--Login and Register--

1. Apply formik and yup (both)
2. Implement a way to add the RegisterOrganizerNoticeDialog beside the Organizer Register h1 (register)
3. Request to server via axios (both)
4. Implement react toastify

--Organizer Dashboard--
Let’s break this into **bite-size frontend chunks** so you never feel lost.  
Below is a **starter roadmap** that focuses **only** on the **organizer dashboard** UI/UX.  
You can literally tick the boxes one by one; the backend can follow later.

---

### 🎯 Phase 0 – One-time scaffolding (30 min)

| Task | What you do                                                    |
| ---- | -------------------------------------------------------------- |
| 1.   | Create `/app/dashboard/[slug]/overview/page.tsx` (landing tab) |
| 2.   | Create `/app/dashboard/[slug]/events/page.tsx` (list & edit)   |
| 3.   | Create `/app/dashboard/[slug]/transactions/page.tsx`           |
| 4.   | Create `/app/dashboard/[slug]/analytics/page.tsx`              |
| 5.   | Create `/app/dashboard/[slug]/profile/page.tsx`                |

(Next.js will auto-route `/dashboard/abc123/events`.)

---

### 🧩 Phase 1 – Make the sidebar dynamic

Replace the placeholder items with **real tabs**:

```ts
const orgNav = [
  { title: "Overview", url: "./overview", icon: Home },
  { title: "My Events", url: "./events", icon: Calendar },
  { title: "Transactions", url: "./transactions", icon: Inbox },
  { title: "Analytics", url: "./analytics", icon: BarChart2 },
  { title: "Profile", url: "./profile", icon: Settings },
];
```

Render them with `<Link href={item.url}>` so the active tab gets an `aria-current` style automatically.

---

### 🪞 Phase 2 – Overview landing page (`/overview`)

| Section               | Component idea                                                               |
| --------------------- | ---------------------------------------------------------------------------- |
| **Stats cards**       | Re-usable `<StatCard title="Total Revenue" value={...} />`                   |
| **Quick actions**     | Buttons “Create Event”, “View Recent Transactions”                           |
| **At-a-glance graph** | Tiny line chart (< 200 px) with **Recharts** or **Chart.js** (monthly sales) |

Mock data for now:

```ts
const stats = { revenue: 4_200_000, events: 3, ticketsSold: 187 };
```

---

### 📅 Phase 3 – Events list (`/events`)

| Feature          | FE pattern                                                   |
| ---------------- | ------------------------------------------------------------ |
| **List**         | TanStack Table or simple `.map`                              |
| **Row actions**  | Dropdown “Edit / Duplicate / Delete / View Attendees”        |
| **Status badge** | `<Badge variant={event.isActive ? 'default' : 'secondary'}>` |
| **Empty state**  | Centered illustration + “Create your first event” button     |

You can re-use the same table component for **Attendee List** later.

---

### 💳 Phase 4 – Transactions (`/transactions`)

| Column   | Notes                                         |
| -------- | --------------------------------------------- |
| Order ID | Clickable → opens modal                       |
| Customer | Avatar + name                                 |
| Event    | Short title                                   |
| Amount   | Rp …                                          |
| Status   | Colored badge (Pending / Accepted / Rejected) |
| Actions  | “Accept” / “Reject” buttons **inside** modal  |

Use a small **slide-over** (Radix Dialog or Sheet) to show the **payment proof image** + action buttons.

---

### 📊 Phase 5 – Analytics (`/analytics`)

Start with **three tiny charts**:

1. **Revenue by month** – Bar chart (Recharts).
2. **Ticket sales by day** – Line chart.
3. **Top 3 events** – Horizontal bar.

All mock data first; later you’ll replace with API calls.

---

### 👤 Phase 6 – Profile (`/profile`)

| Section     | Fields                                                          |
| ----------- | --------------------------------------------------------------- |
| **Avatar**  | Upload preview (use `react-dropzone` or `<Input type="file">`). |
| **Details** | Name, email, password change form.                              |
| **Stats**   | Total points, expiry date, coupons list.                        |

---

### 🧪 Development order (suggested)

1. **Sidebar + tab routing** (10 min)
2. **Overview page** with static stats (20 min)
3. **Events list** with dummy array (30 min)
4. **Transactions table** (30 min)
5. **Analytics mini-charts** (30 min)
6. **Profile page** (20 min)

Each step is **independent**; you can commit & push after every one.

---

### 🛠️ Tools you already have

- **Shadcn/ui** – Sidebar, Dialog, Table, Badge, Button, Input.
- **Lucide icons** – ready-made icons.
- **Recharts** (or Chart.js) – one-liner install for graphs.

---

### 📌 Next action

Pick **Phase 1** (dynamic sidebar) and push it.  
Once you see the tabs working, momentum will snowball 🚀

Ready when you are—just holler!
