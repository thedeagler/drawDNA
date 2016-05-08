/*
========================================
    Challenges
========================================
 */
- Force graph
- Styling svgs
  -outlining a g

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
- Save and share link

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
- When hovering a base in either the sequence or graph, the corresponding base should be highlighted in the sequence.
- create connections by connecting two unpaired and complementary bases (e.g. C and G, or A and T)
  - DBN should update


/*
========================================
    Todo
========================================
 */
x Create legend
- Create edit menu
- Scroll to zoom
- Home / explaination / tutorial page

