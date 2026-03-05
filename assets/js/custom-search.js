import * as params from '@params';

let fuse;
let resList = document.getElementById('searchResults');
let sInput = document.getElementById('searchInput');
let first, last, current_elem = null;
let resultsAvailable = false;

// Format date for display
function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Decode HTML entities to plain text for processing
function decodeHtmlEntities(text) {
    if (!text) return '';
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
}

// Extract contextual snippet around first match position
function extractSnippet(content, searchTerm, maxLength = 150) {
    if (!content) return '';
    
    // Decode HTML entities for processing
    const plainText = decodeHtmlEntities(content);
    
    if (!searchTerm) {
        const snippet = plainText.substring(0, maxLength);
        return snippet + (plainText.length > maxLength ? '...' : '');
    }
    
    // Find first occurrence of search term (case-insensitive)
    const searchLower = searchTerm.toLowerCase();
    const plainLower = plainText.toLowerCase();
    const matchIndex = plainLower.indexOf(searchLower);
    
    if (matchIndex === -1) {
        // No match found, return from start
        const snippet = plainText.substring(0, maxLength);
        return snippet + (plainText.length > maxLength ? '...' : '');
    }
    
    const matchEnd = matchIndex + searchTerm.length;
    
    // Calculate snippet boundaries centered on match
    const contextChars = Math.floor((maxLength - searchTerm.length) / 2);
    let snippetStart = Math.max(0, matchIndex - contextChars);
    let snippetEnd = Math.min(plainText.length, matchEnd + contextChars);
    
    // Adjust to not break words at start
    if (snippetStart > 0) {
        const nextSpace = plainText.indexOf(' ', snippetStart);
        if (nextSpace !== -1 && nextSpace < matchIndex) {
            snippetStart = nextSpace + 1;
        }
    }
    
    // Adjust to not break words at end
    if (snippetEnd < plainText.length) {
        const prevSpace = plainText.lastIndexOf(' ', snippetEnd);
        if (prevSpace !== -1 && prevSpace > matchEnd) {
            snippetEnd = prevSpace;
        }
    }
    
    // Extract snippet
    let snippet = plainText.substring(snippetStart, snippetEnd);
    
    // Add ellipsis
    const prefix = snippetStart > 0 ? '...' : '';
    const suffix = snippetEnd < plainText.length ? '...' : '';
    
    return prefix + snippet + suffix;
}

// Highlight matching text - only highlight the exact matched characters
function highlightMatches(text, searchTerm) {
    if (!searchTerm || !text) {
        return escapeHtml(text || '');
    }
    
    // First, escape ALL HTML in the text
    const escapedText = escapeHtml(text);
    
    // Escape special regex characters in search term
    const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Also escape the search term for matching in already-escaped text
    const escapedSearchTerm = escapeHtml(escapedTerm);
    
    // Match the escaped search term (case-insensitive)
    const regex = new RegExp(`(${escapedSearchTerm})`, 'gi');
    
    // Wrap matches in strong tags (text is already escaped, just add tags)
    return escapedText.replace(regex, '<strong>$1</strong>');
}

// Escape HTML special characters
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Build metadata HTML
function buildMetadata(item) {
    let meta = [];
    
    if (item.date) {
        meta.push(`<span title="${item.date}">${formatDate(item.date)}</span>`);
    }
    
    if (item.readingTime) {
        meta.push(`${item.readingTime} min read`);
    }
    
    if (item.categories && item.categories.length > 0) {
        for (const cat of item.categories) {
            const catUrl = `/categories/${cat.slug}/`;
            meta.push(`<a href="${catUrl}" class="category-badge" data-category="${cat.slug}">${escapeHtml(cat.name)}</a>`);
        }
    }
    
    return meta.join('&nbsp;·&nbsp;');
}

// Render a single search result card
function renderResultCard(result, searchTerm) {
    const item = result.item;
    
    // Get snippet with context around match
    const snippet = extractSnippet(item.content, searchTerm);
    const highlightedSnippet = highlightMatches(snippet, searchTerm);
    
    // Highlight title if there's a search term
    const highlightedTitle = highlightMatches(item.title, searchTerm);
    
    // Build metadata
    const metadata = buildMetadata(item);
    
    // Build series ribbon if post belongs to a series
    let seriesRibbon = '';
    if (item.series && item.series.length > 0) {
        const s = item.series[0];
        seriesRibbon = `<a href="${s.permalink}" class="series-bookmark" aria-label="Part ${s.part || 1} of ${s.total || 1} in ${escapeHtml(s.name)}">
            <div class="series-bookmark-content">
                <span class="series-name">${escapeHtml(s.name)}</span>
                <span class="series-progress">${s.part || 1}/${s.total || 1}</span>
            </div>
        </a>`;
    }
    
    return `
        <li class="post-entry">
            <header class="entry-header">
                <h2 class="entry-hint-parent">${highlightedTitle}</h2>
            </header>
            <div class="entry-content">
                <p>${highlightedSnippet}</p>
            </div>
            ${metadata ? `<footer class="entry-footer">${metadata}</footer>` : ''}
            <a href="${item.permalink}" class="entry-link" aria-label="${escapeHtml(item.title)}"></a>
            ${seriesRibbon}
        </li>
    `;
}

// Update URL with current search query (without adding history entries)
function updateUrlQuery(query) {
    const url = new URL(window.location.href);
    if (query) {
        url.searchParams.set('q', query);
    } else {
        url.searchParams.delete('q');
    }
    // Use replaceState to avoid cluttering history with every keystroke
    history.replaceState({ query: query }, '', url.toString());
}

// Read query from URL and populate search input
function initFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    if (query) {
        sInput.value = query;
        // Trigger search programmatically
        sInput.dispatchEvent(new Event('keyup'));
    }
}

// load our search index
window.onload = function () {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                if (data) {
                    let options = {
                        distance: 100,
                        threshold: 0.4,
                        ignoreLocation: true,
                        includeMatches: true,
                        keys: [
                            'title',
                            'permalink',
                            'summary',
                            'content'
                        ]
                    };
                    if (params.fuseOpts) {
                        options = {
                            isCaseSensitive: params.fuseOpts.iscasesensitive ?? false,
                            includeScore: params.fuseOpts.includescore ?? false,
                            includeMatches: params.fuseOpts.includematches ?? true,
                            minMatchCharLength: params.fuseOpts.minmatchcharlength ?? 1,
                            shouldSort: params.fuseOpts.shouldsort ?? true,
                            findAllMatches: params.fuseOpts.findallmatches ?? true,
                            ignoreFieldNorm: params.fuseOpts.ignorefieldnorm ?? true,
                            keys: params.fuseOpts.keys ?? ['title', 'permalink', 'summary', 'content'],
                            location: params.fuseOpts.location ?? 0,
                            threshold: params.fuseOpts.threshold ?? 0.4,
                            distance: params.fuseOpts.distance ?? 100,
                            ignoreLocation: params.fuseOpts.ignorelocation ?? true
                        };
                    }
                    fuse = new Fuse(data, options);
                    
                    // Initialize from URL after Fuse is loaded
                    initFromUrl();
                }
            } else {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.open('GET', "../index.json");
    xhr.send();
};

function activeToggle(ae) {
    document.querySelectorAll('.focus').forEach(function (element) {
        element.classList.remove("focus");
    });
    if (ae) {
        ae.focus();
        document.activeElement = current_elem = ae;
        ae.parentElement.classList.add("focus");
    } else {
        document.activeElement.parentElement.classList.add("focus");
    }
}

function reset() {
    resultsAvailable = false;
    resList.innerHTML = sInput.value = '';
    // Clear URL query parameter
    updateUrlQuery('');
    sInput.focus();
}

// Maximum acceptable fuzzy match score (lower = better, 0 = perfect match)
// Results with scores above this threshold are discarded as irrelevant
const MAX_MATCH_SCORE = 0.3;

// Filter results by score quality - discard poor fuzzy matches
function filterByScore(results) {
    return results.filter(result => {
        // Keep results with no score (exact matches) or good scores
        if (result.score === undefined) return true;
        return result.score <= MAX_MATCH_SCORE;
    });
}

// Combine search results from multiple tokens, deduplicating by permalink
// Items matching more tokens rank higher
function combineTokenResults(tokenResults) {
    if (tokenResults.length === 0) return [];
    if (tokenResults.length === 1) return tokenResults[0];
    
    const itemMap = new Map(); // permalink -> { item, matchCount, bestScore }
    
    for (const results of tokenResults) {
        for (const result of results) {
            const permalink = result.item.permalink;
            const existing = itemMap.get(permalink);
            
            if (existing) {
                // Increment match count for items matching multiple tokens
                existing.matchCount += 1;
                // Keep the best (lowest) score
                if (result.score !== undefined && (existing.bestScore === undefined || result.score < existing.bestScore)) {
                    existing.bestScore = result.score;
                }
            } else {
                itemMap.set(permalink, {
                    item: result.item,
                    matchCount: 1,
                    bestScore: result.score,
                    matches: result.matches
                });
            }
        }
    }
    
    // Convert to array and sort: more matches first, then by best score
    const combined = Array.from(itemMap.values());
    combined.sort((a, b) => {
        // Prioritize items that match more tokens
        if (b.matchCount !== a.matchCount) {
            return b.matchCount - a.matchCount;
        }
        // Then by best score (lower is better)
        if (a.bestScore !== undefined && b.bestScore !== undefined) {
            return a.bestScore - b.bestScore;
        }
        return 0;
    });
    
    // Return in Fuse.js result format
    return combined.map(entry => ({
        item: entry.item,
        score: entry.bestScore,
        matches: entry.matches
    }));
}

// execute search as each character is typed
sInput.onkeyup = function (e) {
    if (!fuse) return;
    
    const searchTerm = this.value.trim();
    
    // Update URL with current search query
    updateUrlQuery(searchTerm);
    
    // Early exit for empty search
    if (!searchTerm) {
        resultsAvailable = false;
        resList.innerHTML = '';
        return;
    }
    
    // Split search into tokens for multi-word matching
    // This allows "orca sli" to find "OrcaSlicer" and vice versa
    const tokens = searchTerm.split(/\s+/).filter(token => token.length >= 2);
    const limit = params.fuseOpts?.limit ?? 10;
    
    let results;
    
    if (tokens.length > 1) {
        // Multi-token search: search each token and combine results
        const tokenResults = tokens.map(token => fuse.search(token, { limit: limit * 2 }));
        results = filterByScore(combineTokenResults(tokenResults)).slice(0, limit);
    } else {
        // Single token: use standard search
        results = filterByScore(fuse.search(searchTerm, { limit }));
    }
    
    if (results.length !== 0) {
        let resultSet = '';
        
        for (let item of results) {
            resultSet += renderResultCard(item, searchTerm);
        }
        
        resList.innerHTML = resultSet;
        resultsAvailable = true;
        first = resList.firstElementChild;
        last = resList.lastElementChild;
    } else {
        resultsAvailable = false;
        resList.innerHTML = '';
    }
};

sInput.addEventListener('search', function (e) {
    if (!this.value) reset();
});

// kb bindings
document.onkeydown = function (e) {
    let key = e.key;
    let ae = document.activeElement;
    
    let inbox = document.getElementById("searchbox").contains(ae);
    
    if (ae === sInput) {
        let elements = document.getElementsByClassName('focus');
        while (elements.length > 0) {
            elements[0].classList.remove('focus');
        }
    } else if (current_elem) ae = current_elem;
    
    if (key === "Escape") {
        reset();
        return;
    }
    
    // Allow normal text editing in input for left/right arrows, Home, End, etc.
    if (ae === sInput) {
        // Only handle Down arrow to navigate to results, let other keys work normally
        if (key === "ArrowDown" && resultsAvailable) {
            e.preventDefault();
            activeToggle(resList.firstElementChild.querySelector('a.entry-link'));
        }
        return;
    }
    
    if (!resultsAvailable || !inbox) {
        return;
    }
    
    if (key === "ArrowDown") {
        e.preventDefault();
        if (ae.parentElement !== last) {
            activeToggle(ae.parentElement.nextElementSibling.querySelector('a.entry-link'));
        }
    } else if (key === "ArrowUp") {
        e.preventDefault();
        if (ae.parentElement === first) {
            activeToggle(sInput);
        } else {
            activeToggle(ae.parentElement.previousElementSibling.querySelector('a.entry-link'));
        }
    } else if (key === "Enter") {
        e.preventDefault();
        ae.click();
    }
};
