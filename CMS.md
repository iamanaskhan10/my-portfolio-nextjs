# Portfolio CMS

The portfolio includes a protected editor at `/admin`. It manages site copy, projects, experience, and uploaded project images. Public pages read the saved content on every server request, so publishing does not require a rebuild.

## Local setup

1. Run `npm.cmd run cms:setup`. This generates missing admin credentials in `.env.local` without replacing existing settings.
2. Find the `ADMIN_PASSWORD` value in `.env.local` and use it to sign in. Keep this file private.
3. Run (or restart) `npm.cmd run dev` and open `http://127.0.0.1:3007/admin`.

For manual or hosted setup, set `ADMIN_PASSWORD` (at least 12 characters) and `ADMIN_SESSION_SECRET` (at least 32 random characters) using `.env.example` as a reference.

The first publish creates `content/portfolio.json`. Uploads are stored in `public/uploads`. Both locations are ignored by Git because they contain runtime data.

## Homepage project media

In `/admin`, open **Projects** and select the project. Published projects appear in the homepage work list, with **Featured on homepage** projects first. Each full row links directly to its case study. On hover-capable devices, a mouse reveals the cover in a square window that follows the pointer at any browser width; moving to another row slides the next cover vertically within that window. Scrolling with a stationary mouse updates the preview to the row beneath it. Devices without hover show square cover tiles with the title, category, and period in two columns, or one column at widths up to 600px. Covers fill their squares edge to edge and may crop, so keep essential imagery away from the edges. Project names, categories, covers, order, and the archive-link label remain CMS-driven.

For still images or GIFs, upload through **Media**, attach the asset to the project, then edit its **Gallery** entry. Set **Source**, **Title**, **Alt text**, **Caption**, **Width**, and **Height** accurately. Use **Earlier** and **Later** to set the gallery order. The first image becomes the project cover, so use a still image first for a dependable homepage preview. If the cover is a GIF, the work list uses **Poster image path** from Project demo video or the first non-GIF gallery image; without a usable still it shows a placeholder. Gallery edits also affect shared project imagery elsewhere on the site.

Publish and check the mouse hover preview at wide and narrow browser widths, the cover tiles on a device without hover, and the direct case-study link. The homepage work list has no gallery controls; open the case study to check its complete image gallery, captions, and full-screen viewer.

## Project demo video

In **Projects ? Project demo video**, configure an optional clip for the actual case-study page. A configured video appears above the image gallery and adds **Watch demo** alongside the source or discussion action. The homepage work list continues to use a still cover.

1. Add a real user-provided local `.mp4` or `.webm` clip to `public/videos`, for example `public/videos/project-demo.mp4`, and include it in deployed site files. The image uploader does not upload videos.
2. Set **Video path** to `/videos/project-demo.mp4` (omit `public`). Use a local path beginning with `/`, without spaces, query strings, or an external URL.
3. Set **Poster image path** to a local still `.png`, `.jpg`, `.jpeg`, `.webp`, or `.avif` path, or leave it empty to use the project cover. Set **Film caption** to an accurate description of the clip.
4. Publish and open the case study. The player uses native controls, does not autoplay or preload the clip, supports inline playback on mobile, and pauses offscreen or when the page becomes hidden. Clear **Video path** and publish to remove both the demo section and Watch demo action.

These fields retain the existing `project.showcase.videoSrc`, `posterSrc`, and `caption` schema. No project demo is fabricated or automatically assigned. The screenshot gallery remains available if a clip cannot load. GitHub follows source availability; projects without public source retain their discussion action.

## Selected work introduction images

Open **Site copy ? Selected work images** to control rising images independently of covers and demos. The sequence accepts zero, one, or many images without a fixed image-count cap.

1. Use **Upload image** here to upload PNG, JPEG, WebP, or GIF media, or select an existing upload or published project's gallery image. Uploading adds to the media library; it does not automatically add to the sequence.
2. Use **Add rising image** to add an entry, then choose its image from the selector. A direct upload need not belong to a project gallery.
3. Use up/down controls to reorder and the remove control to remove entries. Remove every entry for a text-only introduction. This does not delete the media files.
4. Publish and check the saved sequence. If a referenced project image becomes unavailable, choose a replacement.

Older content without `site.projects.introImages` defaults to the first two selected covers; an explicitly empty list stays empty. Scroll travel starts at 220svh and adds 45svh per image beyond two. The introduction statement fills white from left to right word by word and reverses on upward scrolling. Reduced motion shows white text without rising images. Keep project captions factual and retain illustration labels. All upload controls here handle images, not video.

## Production deployment

Run this app as a persistent Node process with `npm.cmd run build` followed by `npm.cmd run start`. The application directory must be writable, or set `PORTFOLIO_CONTENT_PATH` and `PORTFOLIO_UPLOAD_DIR` to writable persistent directories.

Uploads are served through `/api/media/[name]`, including files added after startup. Setting `PORTFOLIO_UPLOAD_DIR` to an external persistent directory needs no additional static-file server. Use HTTPS in production for the secure admin session cookie.

This filesystem adapter is intended for a Node server, VPS, or container with a persistent volume. A serverless deployment such as Vercel needs an external database and object-storage adapter because its local filesystem is ephemeral.

## Backups

Back up the content JSON file and upload directory together, along with any local videos and posters referenced from `public`. Restore the media files with the content so every published preview remains available.
