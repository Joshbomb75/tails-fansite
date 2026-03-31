# Tails Multiverse Fan Site

A polished, minimal, mobile-friendly single-page fan website highlighting major versions of Miles "Tails" Prower across games, animation, comics, and film.

## Included Variants

- Tails (Original Sonic Series)
- Tails (Sonic X)
- Tails (Sonic Movie Trilogy)
- Tails (IDW Comics)
- Nine (Sonic Prime)
- Tails (Sonic Boom)
- Tails (Archie Comics)

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- JSON data source for scalable content (`data/tails-variants.json`)

## Project Structure

```text
tails-fansite/
├── index.html
├── styles.css
├── app.js
├── README.md
└── data/
    └── tails-variants.json
```

## Run Locally

From the project directory:

```bash
cd /Users/joshbot/.openclaw/workspace/tails-fansite
python3 -m http.server 8000
```

Then open:

- On your Mac: `http://localhost:8000`
- On your phone (same Wi-Fi): `http://<your-mac-local-ip>:8000`

> Tip: find your Mac local IP with:
>
> ```bash
> ipconfig getifaddr en0
> ```

## Notes

- This is a fan-made, unofficial tribute.
- Most character/media images are loaded via public wiki/Wikimedia links.
- To add more variants, update `data/tails-variants.json`; no code changes required.
