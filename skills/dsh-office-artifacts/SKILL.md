---
name: dsh-office-artifacts
description: Create, repair, transform, or verify XLSX, DOCX, PPTX, and PDF deliverables with format-aware tools and reopen or render checks.
whenToUse: Use when a task produces or modifies a spreadsheet, document, presentation, or PDF that must preserve file integrity or layout.
metadata: dsh-portable-skill-pack
---

# DSH Office Artifacts

1. Identify the output format, reader, sources, template, required content, style constraints, and recipient application.
2. Preserve source files. Never overwrite an original unless the user explicitly requests it; write a new output path by default.
3. Inspect installed tools and use a format-aware library or application. Do not edit OOXML archives through raw string replacement except for a tested, narrow repair.
4. Structure content before layout and retain sources for claims, calculations, and externally supplied data.
5. Reopen every saved artifact with a parser or native-capable library. Render or visually inspect layout-sensitive output.
6. For XLSX, preserve formulas as formulas, keep dates and numbers typed, and check formulas, sheet names, filters, frozen panes, and chart references.
7. For DOCX, use styles and preserve heading hierarchy, links, lists, table semantics, citations, and page-break intent.
8. For PPTX, preserve the template theme and layouts, then check text overflow, contrast, image crops, charts, and reading order after rendering.
9. For PDF, confirm page count, order, extracted text or OCR, links, form values, and redactions. A visual black rectangle is not a verified redaction.
10. Report output path, source inputs, checks performed, known limitations, and any required human review.
