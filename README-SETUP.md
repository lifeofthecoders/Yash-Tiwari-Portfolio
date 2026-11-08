# Yash Tiwari Portfolio — Supabase CMS integration

## Included replacements
- `src/context/PortfolioContext.jsx`
- `src/components/AdminPanel.jsx`
- `src/lib/supabase.js`
- `supabase/secure-cms-migration.sql`
- `.env.example`

Your existing `portfolioData.js`, page components, Navbar, Footer, and visual styles are not replaced.

## 1. Apply the SQL migration
Run `supabase/secure-cms-migration.sql` in Supabase SQL Editor.

This creates a separate `portfolio_public_content` table. Public visitors can read only that table. Drafts stay in `portfolio_content`, which is protected by RLS. The publish RPC checks the authenticated user's UUID against `portfolio_admins`.

## 2. Confirm administrator membership
In Supabase Authentication -> Users, copy the user UUID for the administrator.
In Table Editor -> `portfolio_admins`, verify there is a row with exactly that UUID.
Do not grant anon or authenticated users INSERT/UPDATE/DELETE on `portfolio_admins`.

## 3. Configure the React app
At the project root, create `.env.local`:
```
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_PUBLISHABLE_OR_LEGACY_ANON_KEY
```
Use the Project URL and publishable key from Supabase Project Settings -> API.
Never put the database password, service_role key, or secret key in a Vite environment variable.

Install the client:
```
npm install @supabase/supabase-js
```

Replace the two source files and add `src/lib/supabase.js`.

## 4. Configure Vercel
Add these same two variables to Vercel Project -> Settings -> Environment Variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Add them for Production (and Preview/Development if used), save, and redeploy.

## 5. Migrate your existing portfolio content
The published frontend continues to use bundled `portfolioData.js` defaults until the first cloud publish.
The admin editor loads an existing private draft if present; otherwise it loads the bundled defaults.
After login, use Save Draft, then Publish Changes. This seeds the database with the full editable data.
If you have important edits only in your old browser localStorage, export a backup from the old Admin Panel before replacing the code, then import that JSON using the new Admin Panel's Backup tab. Import saves it as a draft; publish separately.

## 6. Test
- Visit `/#admin`, sign in with the Supabase Auth email/password for the allowlisted admin.
- Change a field and click Save Draft. It must not change the public site.
- Click Publish Changes. The public site should update after reload.
- Open an incognito window: the public portfolio should load, but admin draft reads/writes must be denied.
- A normal authenticated user not listed in `portfolio_admins` must not be able to edit or publish.

## Notes
- The new AdminPanel has no hardcoded username/password or browser session flag.
- `Save Draft` writes to the private table; `Publish Changes` invokes a database function that copies the draft to a separate public table.
- Existing media URL fields remain editable. Supabase Storage upload integration is a separate follow-up if you want actual file uploads.
- Rotate any password that was used with the old hardcoded frontend login. That old password was present in source code and must no longer be used.
