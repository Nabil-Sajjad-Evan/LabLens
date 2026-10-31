# LabLens: project brief (for team members and their AI assistants)

> If you are an AI assistant reading this: follow this file exactly. Build only the screens the user names. Do not change files in `components/` or `lib/`, and do not add libraries unless the user says so. Ask the user before doing anything this file does not cover.

## 1. What LabLens is

LabLens is a web app (mobile-first) for a university Software Engineering project (CSE 327). A user uploads a photo or PDF of a lab report. The app reads the values, the user checks them, and the app shows which results are low or high, a plain-language explanation, trends over time and a simple plan. Our users are mostly older adults, so everything must be easy to read.

Right now we are building **only the UI, with sample data**. There is no backend, no AI and no database yet. Every screen reads from `lib/sample-data.ts`.

## 2. Tech stack (already set up by the repo owner)

- Next.js (App Router) with TypeScript
- Tailwind CSS (use `rem`-based classes such as `text-lg`, `p-4`, `h-14`; avoid fixed pixel values like `text-[17px]`)
- shadcn/ui for basic parts (buttons, inputs) if the repo owner already added them
- Recharts for the trends chart (only on the Trends screen)
- Run the app: `npm run dev`, then open http://localhost:3000. In Chrome, press F12 and use the phone-size view (390 px wide) to check your screen.

## 3. Design rules

**Fonts** (loaded in the root layout by the repo owner)
- Headings, big numbers, dates, normal-range text and the explanation paragraphs: **Literata** (serif).
- Everything else (buttons, labels, body text): **Atkinson Hyperlegible**.
- Always set numbers in Literata. Atkinson puts a slash through zeros, which looks wrong on lab values like 1,50,000.

**Colours**

| Use | Colour |
|---|---|
| Main text | `#1F1D36` |
| Brand / buttons / links | `#3A3485` (indigo) |
| Secondary text | `#55526B` |
| Lines and borders | `#DAD8E6` |
| Soft background | `#F2F1F8` |
| Low (text on tag) | `#1F5AA6` on `#E4EDF9` |
| High | `#97480A` on `#FCEBD6` |
| Urgent | `#A81F1F` (tag: white text on red) |
| Normal | `#1F6B4F` on `#E2F2EA` |
| Normal zone on the range bar | `#BFE0CF` |
| Warning (missing value) | `#8A3F00` on `#FFF1DE` |

**Sizes**
- Body text 17 px (about `text-[1.0625rem]`, or `text-lg` is fine). Nothing smaller than 14 px.
- Buttons 58 px tall (`h-14` is close), 6 px corner radius, label centred, bold.
- Inputs 56 px tall, 2 px border.
- Tap targets at least 44 px tall.
- Layout is mobile first (390 px wide). On a wider screen, centre the page in a column about 430 px wide for now.

**Style rules**
- No cards with shadows. Lists are rows separated by thin lines.
- No small grey text for important information.
- Low and High are shown with **words and an arrow** (`↓ Low`, `↑ High`), never by colour alone.
- Use the words **"normal levels"**, never "printed range" or "reference range".

## 4. Safety wording (important, marks depend on it)

- LabLens **never diagnoses**. Use hedged wording: "can be seen with", "doctors often look into this", "talk to your doctor".
- Never mention medicines, doses or supplements.
- Every explanation ends with: "Automated summary for general information. It is not a diagnosis. Always check with your doctor."
- Whether a result is Low, High, Normal or Urgent is decided by plain code (see `getStatus` in `lib/sample-data.ts`), **not by AI**.

## 5. Routes (one file per screen)

| Screen | Route | Owner |
|---|---|---|
| C1 Sign in | `/` | Evan |
| C2 Upload | `/upload` | Evan |
| C3 Reading your report | `/reading` | Evan |
| C4 Photo not clear | `/unreadable` | Evan |
| C5 Check results | `/check` | Ismail |
| C6 Report summary | `/reports/latest` | Ismail |
| C7 All results | `/reports/latest/all` | Ismail |
| C10 Urgent result | `/demo/urgent` | Ismail |
| C11 All normal | `/demo/all-normal` | Ismail |
| C8 Trends | `/trends` | Raihan |
| C9 Plan | `/plan` | Raihan |
| C12 Your reports | `/reports` | Raihan |
| C13 Account | `/account` | Raihan |

Put each screen in its own folder, for example `app/plan/page.tsx`. Do not put two screens in one file.

## 6. Shared components (owned by Evan: do not edit)

Found in `components/`. Use them as they are. If you need a change, message Evan.

- `Screen`: wraps every screen (header on top, tabs at the bottom, phone-width column). Start every page with it: `<Screen active="Trends">...</Screen>`. Leave out `active` for screens without tabs. To push a button to the bottom of a short screen, put `<div className="min-h-6 flex-1" />` above it.
- `PageTitle`, `SectionTitle`, `Meta` (in `Headings.tsx`): the big title, the section title and the grey line under a title.
- `ResultRow`: one lab result. `<ResultRow result={results[0]} />`, or `showBar={false}` for the shorter row.
- `StatusBanner`: the full-width coloured block at the top of summary screens. `tone` is `"info"` (indigo), `"urgent"` (red) or `"ok"` (green); `counts={{ low: 8, high: 3, normal: 5 }}` adds the numbers and the bar.
- `StatusTag`, `RangeBar`: the small parts inside `ResultRow`. Use them on their own only if you need to.
- `PrimaryButton`, `SecondaryButton`: big buttons. Give an `href` to link to another screen, or an `onClick` for an action.
- `TextLink`: bold underlined link with a big tap area (`danger` makes it red, `muted` makes it grey for Cancel).
- `TipList`: a plain list of short lines separated by thin lines. `<TipList items={["First tip", "Second tip"]} />`.
- `Note`: grey disclaimer box.
- `AppHeader`, `BottomNav`: used inside `Screen`. You normally do not use them directly.

Helpers: `lib/sample-data.ts` (data, `getStatus`, `markerPosition`) and `lib/format.ts` (`formatValue`, `formatRange`).

Colours are Tailwind classes: `text-ink`, `text-brand`, `text-muted`, `bg-tint`, `border-rule`, `text-low`, `bg-low-bg`, `text-high`, `bg-high-bg`, `text-urgent`, `text-ok`, `bg-ok-bg`, `text-warn`, `bg-warn-bg`. Fonts: normal text is Atkinson already; add `font-serif` for headings, numbers, dates and normal-range text.

To see every component working, run `npm run dev` and open http://localhost:3000/preview. Copy the way `app/preview/page.tsx` uses them.

If a shared component you need does not exist yet, build a simple version inside your own screen's folder and tell Evan.

## 7. Screen descriptions

The design PDF (`LabLens_UI_Mockup_Direction_C_6th_edition.pdf`) is the source of truth. The text below describes each screen for your AI in case it cannot read the PDF well.

**Evan's screens**
- **C1 Sign in:** Big heading "Understand your lab report in plain words", a line of explanation, one sample result row (Haemoglobin 11.8 g/dl, Low) on a soft background, a "Continue with Google" button, a "Try a sample report" link and a short disclaimer. No bottom tabs.
- **C2 Upload:** Heading "Add your report". Three large buttons: Take a photo (filled), Choose a photo, Choose a PDF. Then a "For a clear photo" list of three tips and a grey note. Bottom tabs, Upload active.
- **C3 Reading:** Heading "Reading your report", a sketch of a page, and a four-step list (done / in progress with a spinner / not started). No bottom tabs.
- **C4 Photo not clear:** An amber warning icon, the heading "We could not read this photo clearly", a "What helps" list, a note, and buttons "Take a new photo", "Choose a different file" and a link "Enter the values by hand".

**Ismail's screens**
- **C5 Check results:** Back link, heading, a short instruction, report date and lab name inputs, "17 results found" with "1 needs a look", then rows. Each row: test name, an input holding the value with its unit, and "Normal: 13.0 – 17.0" below. One row (MPV) has an amber background and the text "There is no value for this on your report. Add it, or leave it empty." Then "Show 11 more results", the button "Looks right, show my results" and a Cancel link.
- **C6 Report summary:** Back link "All reports", heading, a line "Blood count from Lab A, 7 Oct 2026", then a full-width indigo `StatusBanner`: "11 results are outside normal levels" with "Please talk to your doctor about them.", counts 8 Low / 3 High / 5 Normal, and a three-colour bar. Below: "Outside normal levels" with four `ResultRow`s (platelets, haemoglobin, ESR, neutrophils), a link "See all 16 results", the "LabLens Insights" section with three short paragraphs, the grey disclaimer and the button "See how your results changed".
- **C7 All results:** Back link, heading, tabs (All 16, Low 8, High 3, Normal 5), then every result grouped under "Outside normal levels" (11) and "Normal" (5). Rows here have no range bar. Ends with a note about MPV and a button "Back to summary".
- **C10 Urgent result:** Same as the summary, but the banner is red: "Please see a doctor as soon as you can". One urgent result (platelet count 18,000), then a "What to do now" list of two lines, a button "Print a summary for my doctor", a link "See all results" and a "sample result" note.
- **C11 All normal:** Same as the summary, but the banner is green: "All your results are within normal levels", with 16 Normal. Two sample rows, then Insights and the disclaimer.

**Raihan's screens**
- **C8 Trends:** Heading, a line "4 reports, January to October 2026", tabs (Haemoglobin, Platelets, ESR, Neutrophils), a Recharts line chart of the haemoglobin values with a green band for 13–17, a "Sample data" caption, "Your haemoglobin is going up.", and an "All readings" table with Date, Name on report and Value. Name on report differs by lab (Haemoglobin, Hb, HGB). Ends with a note explaining that LabLens matches names, and the button "See my plan".
- **C9 Plan:** Heading, "Next test" ("Repeat your blood count in about 3 months", "Around 7 January 2027"), a secondary button "Add to my calendar", "Healthy habits to try" (four checkbox rows with round checkboxes), "Questions for your doctor" (three plain rows) and the button "Print a summary for my doctor".
- **C12 Your reports:** Heading "Your reports", "5 reports", then five tappable rows (date, lab, a coloured status line, a chevron). Ends with "Add a new report".
- **C13 Account:** Round "SU" avatar, name and email, a "Your data" paragraph, a Sign out button and a red "Delete my account and all my reports" link. (No settings or toggles.)

## 8. Working with Git (do this every time)

```bash
git checkout main
git pull
git checkout -b feature-plan            # always start the name with "feature-", then the screen name
# ... build your screen, then:
git add .
git commit -m "Add Plan screen with sample data"
git push -u origin feature-plan
```

Then open GitHub, click **Compare & pull request**, write one line about what you built, and ask Evan to review. Commit after every small working step, not once at the end.

Rules from our teacher (she checks the commit history on GitHub):
- `main` holds the complete, working project.
- Make a new branch for every feature, named `feature-...` (examples: `feature-plan`, `feature-trends`, `feature-summary`).
- Never push directly to `main`. Push only to your own branch, then merge it into `main` with a pull request.
- Commit often with clear messages, so every member's work shows in the history.

## 9. How to work with your AI assistant

1. Open the repo folder in VS Code. Give your AI this file (paste it or attach it) and the design PDF pages for your screens.
2. Build **one screen at a time**. Ask for the whole screen, then fix details with short follow-ups.
3. Run `npm run dev` and look at the result in the browser at phone size. Compare it with the PDF.
4. If there is an error, paste the **whole error text** into the AI and ask it to explain and fix it.
5. Do not accept changes to `components/`, `lib/` or the config files. Do not let it add new libraries.
6. If you are stuck for more than 30 minutes, message Evan with a screenshot.

**Starter prompt (paste this first):**

> I am a student on a team building LabLens, a lab report explainer web app (Next.js App Router, TypeScript, Tailwind). I have attached PROJECT_BRIEF.md and the design PDF. Read the brief fully. I own these screens: [YOUR SCREENS]. Build them one at a time, starting with [FIRST SCREEN]. Follow the colours, fonts, wording rules and file locations in the brief. Use the shared components in `components/` and the data in `lib/sample-data.ts`. Do not edit shared files or add libraries. After building, tell me exactly which files you created and how to run and check the screen.

## 10. Deadlines

- Your screens ready for review (pull request open): **evening of 3 Nov**.
- Evan joins everything and fixes links: 3 to 4 Nov.
- Polish and phone check: 4 to 5 Nov.
- Presentation: **8 Nov**. Every member presents the screens they built.
