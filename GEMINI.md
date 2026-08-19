# Project Rules & Guidelines

## Page & URL Structure Rule
All non-root pages in this project MUST follow a folder-based HTML structure:

```text
page-name/
└── index.html
```

- **Clean URL**: `/page-name`
- **Never create standalone `.html` files at the root** (e.g. `contact.html`, `about.html`, `pricing.html`).
- **Do not use configuration hacks or JS routing** (`.htaccess`, `vercel.json`, `_redirects`, `history.replaceState`). Clean URLs must originate natively from the HTML folder structure (`folder/index.html`).
