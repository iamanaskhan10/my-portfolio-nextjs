# Portfolio CMS

The portfolio includes a protected editor at `/admin`. It manages site copy, projects, experience, and uploaded project images. Public pages read the saved content on every server request, so publishing does not require a rebuild.

## Local setup

1. Run `npm.cmd run cms:setup`. This generates missing admin credentials in `.env.local` without replacing existing settings.
2. Find the `ADMIN_PASSWORD` value in `.env.local` and use it to sign in. Keep this file private.
3. Run (or restart) `npm.cmd run dev` and open `http://127.0.0.1:3007/admin`.

For manual or hosted setup, set `ADMIN_PASSWORD` (at least 12 characters) and `ADMIN_SESSION_SECRET` (at least 32 random characters) using `.env.example` as a reference.

The first publish creates `content/portfolio.json`. Uploads are stored in `public/uploads`. Both locations are ignored by Git because they contain runtime data.

## Production deployment

Run this app as a persistent Node process with `npm.cmd run build` followed by `npm.cmd run start`. The application directory must be writable, or set `PORTFOLIO_CONTENT_PATH` and `PORTFOLIO_UPLOAD_DIR` to writable persistent directories.

Uploads are served through `/api/media/[name]`, including files added after startup. Setting `PORTFOLIO_UPLOAD_DIR` to an external persistent directory needs no additional static-file server. Use HTTPS in production for the secure admin session cookie.

This filesystem adapter is intended for a Node server, VPS, or container with a persistent volume. A serverless deployment such as Vercel needs an external database and object-storage adapter because its local filesystem is ephemeral.

## Backups

Back up the content JSON file and upload directory together. Restoring both returns the CMS to the same published state.
