# Portfolio CMS

The portfolio includes a protected editor at `/admin`. It manages site copy, projects, experience, and uploaded project images. Public pages read the saved content on every server request, so publishing does not require a rebuild.

## Local setup

1. Run `npm.cmd run cms:setup`. This generates missing admin credentials in `.env.local` without replacing existing settings.
2. Find the `ADMIN_PASSWORD` value in `.env.local` and use it to sign in. Keep this file private.
3. Run (or restart) `npm.cmd run dev` and open `http://127.0.0.1:3007/admin`.

For manual or hosted setup, set `ADMIN_PASSWORD` (at least 12 characters) and `ADMIN_SESSION_SECRET` (at least 32 random characters) using `.env.example` as a reference.

The first publish creates `content/portfolio.json`. Uploads are stored in `public/uploads`. Both locations are ignored by Git because they contain runtime data.

## Homepage project media

In `/admin`, open **Projects** and select the project. Published projects appear in the homepage work list, with **Featured on homepage** projects first. Each full row links directly to its case study. On desktop, hovering a row shows its cover in a square window that follows the pointer; moving to another row slides the next cover vertically within that window. Tablet and mobile show square cover tiles with the title, category, and period. Project names, categories, covers, order, and the archive-link label remain CMS-driven.

For still images or GIFs, upload through **Media**, attach the asset to the project, then edit its **Gallery** entry. Set **Source**, **Title**, **Alt text**, **Caption**, **Width**, and **Height** accurately. Use **Earlier** and **Later** to set the gallery order. The first image becomes the project cover, so use a still image first for a dependable homepage preview. If the cover is a GIF, the work list uses **Poster image path** from the retained film settings or the first non-GIF gallery image; without a usable still it shows a placeholder. Gallery edits also affect shared project imagery elsewhere on the site.

Publish and check the desktop hover preview, mobile cover, and direct case-study link. The homepage work list has no gallery controls; open the case study to check its complete image gallery, captions, and full-screen viewer.

The **Homepage showcase film** fields remain available for the retained legacy gallery layouts. Configured films do not play in the current homepage work list or the case-study image gallery. To maintain an existing optional film configuration:

1. Add a local `.mp4` or `.webm` file to `public/videos`, for example `public/videos/project-demo.mp4`, and include it in the deployed site files. The Media uploader handles images, so video files are added separately.
2. In **Homepage showcase film**, set **Video path** to `/videos/project-demo.mp4` (omit `public`). Use a local path beginning with `/`, without spaces, query strings, or an external URL.
3. Set **Poster image path** to a local still `.png`, `.jpg`, `.jpeg`, `.webp`, or `.avif` path, or leave it empty to use the project cover. Set **Film caption** to an accurate description of the clip.
4. Publish to save the configuration. A legacy gallery, if rendered, places the film before its images and plays it only through visitor controls. Clear **Video path** and publish to remove that film configuration. The current homepage work list continues to use a still cover.

The existing **Site copy → Selected work images** setting controls the rising images in the introduction independently of these project previews. Keep captions factual and retain illustration labels where applicable.

## Production deployment

Run this app as a persistent Node process with `npm.cmd run build` followed by `npm.cmd run start`. The application directory must be writable, or set `PORTFOLIO_CONTENT_PATH` and `PORTFOLIO_UPLOAD_DIR` to writable persistent directories.

Uploads are served through `/api/media/[name]`, including files added after startup. Setting `PORTFOLIO_UPLOAD_DIR` to an external persistent directory needs no additional static-file server. Use HTTPS in production for the secure admin session cookie.

This filesystem adapter is intended for a Node server, VPS, or container with a persistent volume. A serverless deployment such as Vercel needs an external database and object-storage adapter because its local filesystem is ephemeral.

## Backups

Back up the content JSON file and upload directory together, along with any local videos and posters referenced from `public`. Restore the media files with the content so every published preview remains available.
