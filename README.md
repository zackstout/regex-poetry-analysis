# Poetry Analysis with Regex
Learning regex by doing some poetry analysis using [PoetryDB](http://poetrydb.org/index.html). Starting with counting instances of a user-inputted word in all of an author's poems, hoping to scale up to looking at all authors. Immediate goal: save the data to a local database so we don't have to wait on the API every time.

## Screenshot:
![screen shot 2018-03-04 at 8 13 26 pm](https://user-images.githubusercontent.com/29472568/36954581-a117fece-1fe8-11e8-9592-1c8d3851f5a5.png)

## Completed Features:
- [x] Enter an author and a word or term to see how frequently it occurs in their writing (of the poems in the database).
- [x] Enter a term and see how frequently it appears across all writings of all authors, grouped by author, expressed as a percentage of their number of lines in the database.

## Next Steps:
- [ ] Group authors in categories so users can slice by category (e.g. Romantic).
- [ ] Run a sentiment analysis on each author.
- [ ] Determine distribution of positive vs negative sentiment for each author by poem
- [ ] Make list of natural imagery regexs, test against authors
- [ ] Track number of times author uses "I"
- [ ] track times lines end with a punctuation mark vs enjambment
- [ ] Scrape wikipedia for birthdates of authors to group them by epoch
- [ ] Map author against lines in the DB to get a visual intuition for the database
