# SEO Strategy 2026: The E-E-A-T & Intent Playbook

This document outlines how to write and structure the first 3 blog articles to ensure maximum visibility on Google and Answer Engines (ChatGPT, Gemini, etc.).

## 1. Core Principles (From the Vision)
*   **Don't chase generic volume** (e.g., "how to bet"). Chase **Intent** (e.g., "NFL Week 4 underdog picks with data").
*   **Demonstrate E-E-A-T** (Experience, Expertise, Authoritativeness, Trust).
*   **Build Entities**: Link internally to other "money pages" (Newsletter signup).

---

## 2. Article Structure Template (Copy this for every post)

When adding a new post in the Admin Panel (`/admin`), follow this structure:

### Title
Must be specific and promise value.
*   *Bad:* "Tennis Betting Tips"
*   *Good:* "ATP Finals 2025: Why Alcaraz is Undervalued on Indoor Hard Courts"

### Category
Select the specific sport (ATP, WTA, Football Picks, etc.) to help our "Topical Authority".

### Content Body (Markdown)

**Introduction (The Hook)**
*   State the premise immediately. "The public is betting X, but our model shows Y."
*   Mention we are using "OddsMaster Quant Models" (Brand Authority).

**The Data (Experience/Proof)**
*   Include screenshot placeholders or actual stats.
*   "We tracked 500 simulations..." -> Google loves unique data points.

**The Key Entities (For AI Search)**
*   Mention full names: "Carlos Alcaraz", "Novak Djokovic", "Jannik Sinner".
*   Mention specific markets: "Moneyline", "Set Spread", "Over/Under 22.5 Games".
*   *Why?* ChatGPT connects these "Entities" to your brand.

**The Mixed Intent Handling**
*   Provide a quick summary list (for those who want a quick pick).
*   Provide deep analysis (for those who want to read).

**Call to Action (Internal Linking)**
*   **Crucial:** "Want these picks daily? Subscribe to the [OddsMaster Newsletter](/newsletter)."
*   This passes authority from this blog post to your main product page.

---

## 3. SEO Checklist Before Publishing

1.  **URL Slug**: Keep it short and keyword rich.
    *   `oddsmaster.vip/blogs/atp-finals-alcaraz-prediction`
2.  **Meta Description (Excerpt)**:
    *   Write 150 characters that answer the user's question. This often becomes the snippet in Google.
3.  **Tags**: Use 3-5 tags relevant to the sport and bet type.
4.  **Cover Image**: Use a unique image if possible, or one of our branded assets. Alt text should describe the image + keyword.

---
## 4. Google Registration Steps (Do this once)

1.  **Google Search Console (GSC)**:
    *   Go to [search.google.com/search-console](https://search.google.com/search-console).
    *   Add Property -> Domain -> `oddsmaster.vip`.
    *   It will ask you to add a TXT record to your DNS (GoDaddy/Namecheap/Vercel).
    *   *Alternative:* If you can't access DNS, use the "URL Prefix" method and I can add an HTML tag to the site code for you.

2.  **Submit Sitemap**:
    *   In GSC, go to **Sitemaps**.
    *   Enter `https://www.oddsmaster.vip/sitemap.xml`.
    *   Click Submit. Google will now crawl every page we generated.

3.  **Request Indexing (For new posts)**:
    *   Paste the new blog URL into the top search bar in GSC.
    *   Click "Request Indexing" to jump the queue.

---
## 5. "WordCell" / Mobile Updates
*   **Access**: You can update blogs from your phone!
*   **URL**: Go to `oddsmaster.vip/admin`.
*   **UI**: The panel is mobile-responsive. You can write, upload images, and publish directly from Safari/Chrome on iOS/Android.
*   **Preview**: Changes publish immediately to the live site (give it ~2-3 mins for Vercel to rebuild).

---
## 6. Optimization for AI (Gemini/ChatGPT)
*   We have added **JSON-LD Schema** to every blog post. This code is invisible to humans but tells robots: "This is a Blog Post, written by OddsMaster, about [Topic]".
*   **Citations**: To get cited, you must provide unique data/opinions. AIs cite sources that say something *new*. Don't just regurgitate ESPN news.

---
## 7. How to Use "Random Fact" Blocks
To increase engagement and drive users to the homepage, you can insert a "Random Fact Block" anywhere in your blog post.

**How to do it:**
1.  In the Admin Panel editor.
2.  Type `[[FACT_CTA]]` on its own line where you want the block to appear.
3.  The website will automatically replace this code with a beautiful, randomized fact card + "Get The Edge" button.

**Example:**
```markdown
The market is shifting heavily towards the under.

[[FACT_CTA]]

However, our model sees value on the over due to...
```
