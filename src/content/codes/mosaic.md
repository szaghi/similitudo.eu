---
name: mosaic
tagline: Scientific literature from 22 databases in one search, a local library of the papers and their PDFs, and a language model that reads them with you.
kind: tool
order: 5
status: active
license: GPLv3 / BSD / MIT
repo: https://github.com/szaghi/mosaic
docs: https://szaghi.github.io/mosaic/
logo: /codes/mosaic
methods:
  - arXiv, OpenAlex, Crossref, Semantic Scholar, PubMed, HAL, NASA ADS, IEEE Xplore, Scopus and more, searched in parallel and merged by DOI
  - The PDFs you are entitled to read, from the source, the open copies Unpaywall knows, or your publisher logins
  - A local library that fills in what one source leaves out, searched offline, exported to BibTeX, RIS, Zotero or Obsidian
  - Saved searches that report only new papers, related papers from a seed
  - Relevance ranking, summaries that cite the papers, comparison tables, questions answered from your papers
  - Citation maps of the library, hubs and clusters
  - JSON output, a Claude Code skill and a web interface
figures:
  - src: /codes/mosaic/search.png
    width: 1300
    height: 640
    alt: "mosaic search: a spinner while the sources answer, then one merged table of results with source, open access, PDF and citations"
    caption: "One search, many sources: Hall thruster particle-in-cell papers from arXiv, DOAJ, Europe PMC, HAL, OpenAlex, Crossref, PubMed and Zenodo, merged into one table."
    source: https://szaghi.github.io/mosaic/tutorial/01-first-search
    animated: true
  - src: /codes/mosaic/summarise.png
    width: 1300
    height: 620
    alt: "mosaic search --summarise: the results table, then a paragraph citing the rows by number"
    caption: "A summary that cites its papers: six arXiv results on anomalous electron transport in Hall thrusters, then a paragraph whose every statement points to a row."
    source: https://szaghi.github.io/mosaic/guide/relevance-ranking
    animated: true
---

**mosaic** (*M*ulti-s*O*urce *S*cientific *A*rticle *I*ndexer and *C*ollector) searches 22 scientific databases with one
command, from arXiv and OpenAlex to PubMed, NASA ADS and Scopus, and merges the results by DOI. Every result goes into a
local library, and mosaic downloads the PDFs you are entitled to read: no paywall or bot-check evasion. A language
model, on your machine through Ollama or a cloud API, ranks the papers, summarises them citing each one, compares them
in tables and answers questions from them; saved searches follow a field and report only what is new.

A Python tool, `pip install mosaic-search`.
