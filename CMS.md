# Portfolio CMS

The portfolio includes a protected editor at `/admin`. It manages site copy, projects, experience, and uploaded project images. Public pages read the saved content on every server request, so publishing does not require a rebuild.

## Local setup

1. Run `npm.cmd run cms:setup`. This generates missing admin credentials in `.env.local` without replacing existing settings.
2. Find the `ADMIN_PASSWORD` value in `.env.local` and use it to sign in. Keep this file private.
3. Run (or restart) `npm.cmd run dev` and open `http://127.0.0.1:3007/admin`.

For manual or hosted setup, set `ADMIN_PASSWORD` (at least 12 characters) and `ADMIN_SESSION_SECRET` (at least 32 random characters) using `.env.example` as a reference.

The first publish creates `content/portfolio.json`. Uploads are stored in `public/uploads`. Both locations are ignored by Git because they contain runtime data.

## Homepage project media

In `/admin`, open **Projects** and select the project. Published projects appear in the homepage gallery, with **Featured on homepage** projects first. The first two use large features; subsequent projects use compact features.

For still images or GIFs, upload through **Media**, attach the asset to the project, then edit its **Gallery** entry. Set **Source**, **Title**, **Alt text**, **Caption**, **Width**, and **Height** accurately. Use **Earlier** and **Later** to set the preview order. The first image becomes the project cover, so keep a still image first when adding GIFs: the homepage uses that cover until the visitor chooses **Play animation**. Gallery edits also affect the shared project imagery elsewhere on the site.

To add or replace an optional film:

1. Add a local `.mp4` or `.webm` file to `public/videos`, for example `public/videos/project-demo.mp4`, and include it in the deployed site files. The Media uploader handles images, so video files are added separately.
2. In **Homepage showcase film**, set **Video path** to `/videos/project-demo.mp4` (omit `public`). Use a local path beginning with `/`, without spaces, query strings, or an external URL.
3. Set **Poster image path** to a local still `.png`, `.jpg`, `.jpeg`, `.webp`, or `.avif` path, or leave it empty to use the project cover. Set **Film caption** to an accurate description of the clip.
4. Publish the changes and check the homepage preview and **Full screen** viewer. The film appears before the gallery images and plays only through the visitor's controls. Clear **Video path** and publish to return to image-only previews.

The existing **Site copy → Selected work images** setting controls the rising images in the introduction independently of these project previews. Keep captions factual and retain illustration labels where applicable.

## Production deployment

Run this app as a persistent Node process with `npm.cmd run build` followed by `npm.cmd run start`. The application directory must be writable, or set `PORTFOLIO_CONTENT_PATH` and `PORTFOLIO_UPLOAD_DIR` to writable persistent directories.

Uploads are served through `/api/media/[name]`, including files added after startup. Setting `PORTFOLIO_UPLOAD_DIR` to an external persistent directory needs no additional static-file server. Use HTTPS in production for the secure admin session cookie.

This filesystem adapter is intended for a Node server, VPS, or container with a persistent volume. A serverless deployment such as Vercel needs an external database and object-storage adapter because its local filesystem is ephemeral.

## Backups

Back up the content JSON file and upload directory together, along with any local videos and posters referenced from `public`. Restore the media files with the content so every published preview remains available.
