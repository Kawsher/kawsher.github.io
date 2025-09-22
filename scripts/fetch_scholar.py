import json, os, sys, re
from datetime import date

PROFILE_ID = os.environ.get("PROFILE_ID", "fQ_TTFsAAAAJ")
OUT_PATH   = os.environ.get("OUT_PATH", "data/scholar.json")

# ---- Helper: robust type detection ----
CONF_ACRONYMS = [
    # add/trim as needed
    "aaai","ijcai","neurips","nips","icml","iclr","cvpr","eccv","iccv","miccai",
    "kdd","sigmod","sigir","cikm","wsdm","www","chi","ubicomp","uist","icra","iros",
    "emnlp","acl","naacl","coling","icassp","euvip","isbi","ismb","siggraph",
]
CONF_WORDS = r"(proceedings|conference|workshop|symposium|meeting|companion|demo|posters)"
JOURNAL_WORDS = r"(journal|transactions|trans\.|letters|bulletin|annals|frontiers in|ieee access)"

def classify_type(bib: dict) -> str:
    """
    Returns: Journal / Conference / Book Chapter / Book / Other
    Priority: structured fields -> venue text -> publisher/title hints
    """
    entry = (bib.get("ENTRYTYPE") or bib.get("pub_type") or "").strip().lower()
    journal = (bib.get("journal") or "").strip()
    booktitle = (bib.get("booktitle") or "").strip()
    venue = (bib.get("venue") or "").strip()
    publisher = (bib.get("publisher") or "").strip()
    title = (bib.get("title") or "").strip()

    # 1) Trust explicit entry types first
    if entry == "article":
        return "Journal"
    if entry in {"inproceedings", "conference", "proceedings"}:
        return "Conference"
    if entry in {"incollection", "inbook", "chapter"}:
        return "Book Chapter"
    if entry == "book":
        return "Book"

    # 2) Structured fields
    if booktitle:
        return "Conference"
    if journal and not booktitle:
        return "Journal"

    # 3) Venue / publisher / title heuristics
    v = " ".join(x for x in [venue, journal, booktitle, publisher] if x).lower()
    # conference if venue says conference-like terms OR common acronyms
    if re.search(rf"\b{CONF_WORDS}\b", v):
        return "Conference"
    if any(re.search(rf"\b{acronym}\b", v) for acronym in CONF_ACRONYMS):
        return "Conference"

    # book chapter cues
    if re.search(r"\bchapter\b", title.lower()) or re.search(r"\b(handbook|springer series)\b", v):
        return "Book Chapter"

    # book cues
    if "press" in v and "university" in v:
        return "Book"

    # journal fallback ONLY if strong journal words and no conference cues found
    if re.search(rf"\b{JOURNAL_WORDS}\b", v):
        return "Journal"

    return "Other"


def main():
    try:
        from scholarly import scholarly
    except Exception as e:
        print("Failed to import scholarly:", e, file=sys.stderr)
        sys.exit(1)

    try:
        author = scholarly.search_author_id(PROFILE_ID)
        author = scholarly.fill(author, sections=['basics','indices','publications'])
    except Exception as e:
        print("Failed to fetch author:", e, file=sys.stderr)
        if os.path.exists(OUT_PATH):
            print("Keeping existing JSON."); sys.exit(0)
        with open(OUT_PATH,"w",encoding="utf-8") as f:
            json.dump({"metrics":{},"publications":[]}, f, indent=2)
        sys.exit(0)

    metrics = {
        "citations": int(author.get("citedby", 0) or 0),
        "hindex":   int(author.get("hindex", 0) or 0),
        "i10":      int(author.get("i10index", 0) or 0),
        "lastUpdated": date.today().isoformat()
    }

    pubs = []
    for p in author.get("publications", []):
        try:
            bib = p.get("bib", {})
            try:
                p = scholarly.fill(p)  # enrich with citations / urls
            except Exception:
                pass

            # Prefer structured fields for display
            venue_display = bib.get("journal") or bib.get("booktitle") or bib.get("venue") or ""
            pub_type = classify_type(bib)

            pubs.append({
                "title": bib.get("title",""),
                "authors": bib.get("author",""),
                "venue": venue_display,
                "year": int(bib.get("pub_year")) if bib.get("pub_year") else None,
                "link": p.get("eprint_url") or p.get("pub_url") or "",
                "citedBy": int(p.get("num_citations", 0) or 0),
                "type": pub_type
            })
        except Exception:
            continue

    pubs.sort(key=lambda x: (x.get("year") or 0, x.get("citedBy") or 0), reverse=True)

    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    with open(OUT_PATH,"w",encoding="utf-8") as f:
        json.dump({"metrics":metrics,"publications":pubs}, f, indent=2)

if __name__ == "__main__":
    main()
