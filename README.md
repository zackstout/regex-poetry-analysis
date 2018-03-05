# Poetry Analysis with Regex
Learning regex by doing some poetry analysis using [PoetryDB](http://poetrydb.org/index.html). Starting with counting instances of a user-inputted word in all of an author's poems, hoping to scale up to looking at all authors. Immediate goal: save the data to a local database so we don't have to wait on the API every time.

## Completed Features:
- [x] Enter an author and a word or term to see how frequently it occurs in their writing (of the poems in the database).
- [x] Enter a term and see how frequently it appears across all writings of all authors, grouped by author, expressed as a percentage of their number of lines in the database.

## Next Steps:
- [ ] Let users pick a word to map among all authors.
- [ ] Group authors in categories so users can slice by category (e.g. Romantic).
- [ ] Run a sentiment analysis on each author.
