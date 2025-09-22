import json, os, sys
from datetime import date

PROFILE_ID = os.environ.get("PROFILE_ID", "fQ_TTFsAAAAJ")
OUT_PATH   = os.environ.get("OUT_PATH", "data/scholar.json")

def classify_type(bib, venue: str) -> str:
    """Best-effort category: Journal / Conference / Book Chapter / Book / Other"""
    t = (bib.get("ENTRYTYPE") or bib.get("pub_type") or "").lower()
    v = (venue or "").lower()

    # direct bib types first
    if t in {"article"}: return "Journal"
    if t in {"inproceedings", "conference", "proceedings"}: return "Conference"
    if t in {"incollection", "inbook", "chapter"}: return "Book Chapter"
    if t in {"book"}: return "Book"

    # venue-based heuristics
    journal_words = ["journal", "trans.", "transactions", "letters", "bulletin"]
    conf_words    = ["conf", "conference", "proceedings", "workshop", "symposium", "ic", "acm", "ieee"]
    chapter_words = ["chapter", "handbook", "springer series"]

    if any(w in v for w in journal_words):   return "Journal"
    if any(w in v for w in conf_words):      return "Conference"
    if any(w in v for w in chapter_words):   return "Book Chapter"
    if "press" in v and "university" in v:   return "Book"

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
                p = scholarly.fill(p)  # enrich with cit count, urls
            except Exception:
                pass
            venue = bib.get("venue", "") or bib.get("journal", "") or ""
            pub_type = classify_type(bib, venue)

            pubs.append({
                "title": bib.get("title",""),
                "authors": bib.get("author",""),
                "venue": venue,
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
