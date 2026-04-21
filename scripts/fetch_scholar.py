
import json, os, sys
from datetime import date

PROFILE_ID = os.environ.get("PROFILE_ID", "fQ_TTFsAAAAJ")
OUT_PATH   = os.environ.get("OUT_PATH", "data/scholar.json")

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

    metrics = {"citations": int(author.get("citedby", 0) or 0),
               "hindex":   int(author.get("hindex", 0) or 0),
               "i10":      int(author.get("i10index", 0) or 0),
               "lastUpdated": date.today().isoformat()}

    pubs = []
    for p in author.get("publications", []):
        try:
            bib = p.get("bib", {})
            try: p = scholarly.fill(p)
            except Exception: pass
            pubs.append({
                "title": bib.get("title",""),
                "authors": bib.get("author",""),
                "venue": bib.get("venue",""),
                "year": int(bib.get("pub_year")) if bib.get("pub_year") else None,
                "link": p.get("eprint_url") or p.get("pub_url") or "",
                "citedBy": int(p.get("num_citations", 0) or 0)
            })
        except Exception: continue

    pubs.sort(key=lambda x: (x.get("year") or 0, x.get("citedBy") or 0), reverse=True)

    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
    with open(OUT_PATH,"w",encoding="utf-8") as f:
        json.dump({"metrics":metrics,"publications":pubs}, f, indent=2)

if __name__ == "__main__":
    main()
