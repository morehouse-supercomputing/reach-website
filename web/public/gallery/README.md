# Gallery photos

Drop workshop and convening photos here, then point at them from
`web/app/gallery/data.ts`.

Each entry in `shots` is one tile on `/gallery`:

```ts
{ id: "los-angeles-1", album: "los-angeles", src: "/gallery/lax-01.jpg", caption: "Domain experts reviewing prompts." }
```

- `src` empty renders the placeholder tile. Fill it in to show the photo.
- `caption` is optional and shows under the tile and in the lightbox.
- `size: "wide"` spans two columns, `size: "tall"` spans two rows.
- Albums come from `mockWorkshopMetrics`, so the workshop list stays in one place.

Prefer landscape JPGs around 1600px wide. Keep filenames lowercase with dashes.
