/*
========================================
    Challenges
========================================
 */
- Force graph
- Styling svgs
  -outlining a g
- Many small challenges working with d3 - just had to read the docs and examine the code

/*
========================================
    Primary directives
========================================
 */
- Code clarity
- Application architecture
- UI + UX decisions
- Create a short document explaining the architecture and any assumptions you made.

/*
========================================
    Constraints
========================================
 */
- The DNA Sequence will contain standard A, C, T, G bases, possibly N (any base), in the 5'-to-3' direction.
- The 2D notation will contain only dots and parentheses (e.g. no pseudo knots).

/*
========================================
    reqs
========================================
 */
x Each base of the sequence should be colored.
x The DBN should be visible.
x Label bases
x Annotate 5' and 3' end
- Visually differentiate edges for phosphate backbone and base-pair complementarity
x Save and share link

/*
========================================
    interactions
========================================
 */
x colors of each base
x size of the base representation
x font for the label *(maybe not so good) - have it scaling with node size
x line width (did length instead. imo width is not useful, but trivial if necessary)
x drag bases in the graph to modify the layout
x When hovering a base in either the sequence or graph, the corresponding base should be highlighted in the sequence.
x create connections by connecting two unpaired and complementary bases (e.g. C and G, or A and T)
  x DBN should update


/*
========================================
    Backlog
========================================
 */
- Home / explaination / tutorial page
- Highlight connections as well
  - Differentiate types of connections with colors
- Sharelink icon
- Store base pair relationship somewhere globalish
- Need more detailed error check on link making

- Canvas mouse events
  - Scroll to zoom
  - Click to drag
- Webpack/grunt Build
- Sockets/live updates/collaborative
- Save display data to server in addition to DNA data
- Fix Bad ux not saving invalid edits
  - Did it for input validity reasons
- Responsive
- Respond to window resize
- Add button highlight on hover
  - Change to PNG instead of svg?
- Make DNA object
  - Create "DNA builder" where you can add one node at a time and make connections
- When creating links, show selectable bases
- Refactor to React
- Edit links and nodes instead of redraw

x Create legend
x Create edit menu

/*
========================================
    Bugs
========================================
 */
- Error notification persists even though bad data doesn't save
- Infobox spans aren't created on load
- New links created over other elements
- Adjacent base pairs double up on links and end up being too close (need to remove non-bp link)

/*
========================================
    Example DNA
========================================
 */
1: {
  dbn: '...(((((.(...).)))))........(((((.....((..(.((((((..(((.((...)).)))..)))))).).)))))))...............',
  sequence: 'TTGGGGAGACTGGGGCTCCCATTCGTTGCCTTTATAAATCCTCGCAAGCCAATCAACAGGTTGGTGAGGGGCTTGGGTGAAAAGGTGCTTAAGACTCCGT'
}

2: {
  dbn: '..(((((..(((...)))..)))))...',
  sequence: 'TTGGAGTACACAACCTGTACACTCCTTC',
}


Homepage reqs
DrawDNA
Easily create and visualize secondary DNA structure.

- Get Started button
- Video/gif tutorial
  - Create new
  - Edit
  - Click/drag
    - Make base pair
  - Settings
  - Sharing
