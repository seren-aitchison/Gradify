// TechGradify · ForgeLab Algorithms (content standard 2). Added by scripts/new-course.mjs add-notes.
export default `
## Linear search
LV: GCSE · Foundation
S: Linear search checks each item of a list in turn until it finds the target or reaches the end. It is the simplest searching algorithm and works on any list, sorted or not.
O: Describe how linear search works and write it in Python
O: Trace a linear search and count the comparisons it makes
O: Evaluate linear search against binary search for different data
H: The algorithm
P: **Linear search** starts at the first item and compares each item with the target. If an item matches, it returns its position; if the end is reached without a match, it reports that the target is absent (often by returning −1). It needs no preparation: the list can be in any order.
X: Search \`names = ["Kai", "Ben", "Zoe", "Ali"]\` for "Zoe" with \`for i in range(len(names)): if names[i] == target: return i\`, then \`return -1\` after the loop.
> i = 0: "Kai" isn't "Zoe". i = 1: "Ben" isn't.
> i = 2: "Zoe" matches, so 2 is returned after 3 comparisons.
> Searching for "Tom" compares all 4 items and returns −1.
> Python's \`names.index(x)\` and \`x in names\` perform a linear search internally.
K: Linear search makes up to n comparisons for n items: on average about n/2 when the target is present, and all n when it is absent.
H: Efficiency
- Best case: the target is first, 1 comparison.
- Worst case: the target is last or absent, n comparisons.
- Time grows in proportion to n: its time complexity is O(n).
- Advantages: simple, works on unsorted data and on structures without indexes, such as linked lists.
P: A useful variant stops early on a sorted list: once an item larger than the target is reached, the target can't appear later. This halves the average work for absent targets but doesn't change the O(n) worst case.
!: Returning "not found" inside the loop on the first mismatch. The \`return -1\` must come after the loop, once every item has been checked.
EV: established | Linear search has O(n) worst-case and average time complexity; it is optimal for unsorted data, because any item could be the target.
EV: established | For small lists, linear search is often as fast as binary search in practice, because it is simpler and needs no sorting.
T: Linear search | A search that checks each item in turn until the target is found or the list ends
T: Target | The value a search is looking for
T: Worst case | The input that makes an algorithm do the most work, such as an absent target for linear search
SUM: Linear search checks items one by one and works on unsorted lists.
SUM: It takes up to n comparisons, so its time complexity is O(n).
SRC: Knuth D. E., The Art of Computer Programming, Volume 3: Sorting and Searching, 2nd edition, Addison-Wesley, section 6.1 | secondary | 1998
SRC: AQA, GCSE Computer Science 8525 specification, section 3.1.3 "Searching algorithms" | standard | 2020
Q: Does linear search need the list to be sorted? | No: it checks every item in turn, so it works on unsorted lists.
Q: How many comparisons does linear search make in the worst case for n items? | n.
M1#computing-u04-01-q1@1: How does linear search find an item? | It checks each item in order until it finds the target or reaches the end | It repeatedly halves the list and discards one half | It sorts the list and then checks the middle item | It jumps to the position given by a hash function | Linear search is a sequential check of every item. Halving is binary search; hashing is used by dictionaries.
M2#computing-u04-01-q2@2: How many comparisons does a linear search make to find 8 in [3, 9, 1, 8, 4]? | 4 | 1 | 5 | 2 | It compares 3, 9, 1 and then 8, which matches on the fourth comparison.
TF1#computing-u04-01-q3@1: Linear search can be used on an unsorted list. | true | It makes no assumption about order, checking every item until it finds the target.
M3#computing-u04-01-q4@3: A list of 50 unsorted items is searched only once. Why is linear search the better choice than sorting and then binary searching? | Sorting costs more than the single linear search it would replace | Binary search doesn't work on lists of 50 items | Linear search is always faster than binary search | Sorting would delete duplicate items from the list | Sorting takes about n log n steps; one linear search takes at most n, so for a single search on unsorted data linear search wins.
SA3#computing-u04-01-q5@2,3: Write a linear search function in Python and explain its best and worst cases. | \`def linear_search(items, target):\` then \`for i in range(len(items)):\` \`if items[i] == target: return i\`, and after the loop \`return -1\`. Best case: the target is the first item, found in one comparison. Worst case: the target is last or absent, needing n comparisons, so the time grows linearly with n, O(n). The return −1 comes after the loop so every item is checked. | Correct loop over every item ; Returns the index on a match ; Returns −1 after the loop ; Explains the best case ; Explains the worst case as O(n)

## Binary search
LV: GCSE · Application
S: Binary search finds an item in a sorted list by repeatedly checking the middle item and discarding the half that can't contain the target. It is dramatically faster than linear search on large sorted data.
O: Describe how binary search works and state its precondition
O: Trace a binary search, showing the low, high and middle positions at each step
O: Compare binary search with linear search and justify when each should be used
H: Halving the search
P: **Binary search** requires a **sorted** list. It compares the target with the middle item. If they match, it stops. If the target is smaller, the search continues in the lower half; if larger, in the upper half. Each comparison halves the remaining items until the target is found or no items remain.
E: mid = (low + high) // 2 :: the middle index of the current range
E: about log_{2} n comparisons :: worst case for n items; 1,000,000 items need at most 20
X: Search [2, 5, 8, 12, 16, 23, 38, 56, 72, 91] for 23.
> low = 0, high = 9: mid = 4, item 16. 23 > 16, so low = 5.
> low = 5, high = 9: mid = 7, item 56. 23 < 56, so high = 6.
> low = 5, high = 6: mid = 5, item 23. Found at index 5 after 3 comparisons.
> If low ever passes high, the target is absent. Linear search would have needed 6 comparisons.
K: Binary search needs sorted data and makes at most about log_{2} n comparisons, so its time complexity is O(log n).
H: When to use which
- Binary search: large, sorted data searched many times, such as a dictionary or index.
- Linear search: small or unsorted data, or data searched only once.
- Binary search needs random access by index; it doesn't suit linked lists.
- Python's \`bisect\` module provides binary search on sorted lists.
!: Forgetting to move low to mid + 1 (or high to mid − 1). Setting low = mid can loop forever when two items remain.
EV: established | Binary search has O(log n) worst-case time complexity on sorted arrays.
EV: established | Correct binary search is notoriously easy to get wrong: Bentley reported that most professional programmers' first attempts contained bugs, and a long-standing overflow bug in the mid calculation was found in Java's library in 2006.
T: Binary search | A search of a sorted list that compares the middle item and discards half the remaining items each step
T: Midpoint | The middle position of the current search range, (low + high) // 2
T: O(log n) | Logarithmic time: the work grows by a constant amount each time the data doubles
SUM: Binary search halves a sorted list each step until it finds the target or the range is empty.
SUM: It takes O(log n) time but needs sorted data with access by index.
SRC: Bentley J., Programming Pearls, 2nd edition, Addison-Wesley, column 4 | secondary | 2000
SRC: Python Software Foundation, The Python Standard Library, "bisect: Array bisection algorithm" | standard | 2024 | https://docs.python.org/3/library/bisect.html
Q: What must be true of a list before binary search can be used? | It must be sorted.
Q: At most how many comparisons does binary search need for 1,000 items? | About 10, since 2^{10} = 1,024.
M1#computing-u04-02-q1@1: What does binary search compare the target with first? | The middle item of the list | The first item of the list | The last item of the list | A randomly chosen item | It starts at the middle so that one comparison can rule out half the list.
M2#computing-u04-02-q2@2: Binary search on a sorted list of 15 items checks index 7 first. The target is smaller. Which indexes remain? | 0 to 6 | 8 to 14 | 0 to 7 | 7 to 14 | A smaller target must lie before the midpoint, so high becomes 6.
SEQ2#computing-u04-02-q3@2: Order the steps of one pass of binary search. | Calculate the middle index ; Compare the middle item with the target ; Stop if they are equal ; Otherwise discard the half that can't contain the target | Each pass finds the middle, compares, and either stops or narrows the range.
M3#computing-u04-02-q4@3: A company searches a 10-million-item list once a day, and the list changes completely every day. Which approach is likely fastest overall? | Linear search, because sorting every day costs more than one search | Binary search on the unsorted list | Sorting the list then binary searching it every day | Searching the list twice with linear search | Binary search needs sorted data; sorting 10 million items takes far longer than one linear pass of 10 million comparisons.
SA3#computing-u04-02-q5@2,3: Compare linear and binary search and justify which a phone contacts app should use to find a name. | Linear search checks items one by one: simple, works on unsorted data, O(n). Binary search needs sorted data and halves the range each step: O(log n), about 20 comparisons for a million items. Contacts are kept sorted by name and searched often, so binary search (or a hash table) is better: the cost of keeping them sorted is paid once per change, while every search is fast. For a handful of contacts, the difference would be negligible. | Describes linear search with O(n) ; Describes binary search with O(log n) ; States the sorted precondition ; Chooses binary search with justification ; Notes the trade-off or small-data case

## Bubble sort
LV: GCSE · Foundation
S: Bubble sort repeatedly passes through a list, swapping adjacent items that are in the wrong order, until no swaps are needed. It is simple to understand and trace but slow on large lists.
O: Describe how bubble sort works and write it in Python
O: Trace the passes of a bubble sort and count the swaps
O: Evaluate bubble sort's efficiency and explain the early-exit improvement
H: How it works
P: **Bubble sort** compares each pair of adjacent items and swaps them if they are out of order. After one full pass, the largest item has "bubbled" to the end. Each further pass places the next largest, so pass k need only go as far as n − k. The algorithm stops when a pass makes no swaps.
X: Sort [5, 1, 4, 2].
> Pass 1: (5, 1) swap → [1, 5, 4, 2]; (5, 4) swap → [1, 4, 5, 2]; (5, 2) swap → [1, 4, 2, 5].
> Pass 2: (1, 4) no swap; (4, 2) swap → [1, 2, 4, 5]. The 5 is already in place.
> Pass 3: (1, 2) no swap. No swaps in the pass, so the list is sorted.
> In Python a swap is \`v[j], v[j + 1] = v[j + 1], v[j]\`.
K: Each pass of bubble sort moves the largest unsorted item to its final place; stopping when a pass makes no swaps avoids wasted passes.
H: Efficiency
- Worst case (reverse order): about n^{2}/2 comparisons and swaps, O(n^{2}).
- Best case with the early exit (already sorted): one pass of n − 1 comparisons, O(n).
- Sorts **in place**, using almost no extra memory, and is **stable**.
- Too slow for large data: 10,000 items need about 50 million comparisons.
P: A further refinement records where the last swap in a pass happened: everything after it is already sorted, so the next pass can stop there. These tweaks reduce the work on nearly sorted lists but leave the worst case unchanged.
!: Stopping after one pass. One pass only guarantees the largest item is in place; keep passing until a pass makes no swaps.
EV: established | Bubble sort's worst-case and average time complexity is O(n^{2}).
EV: contested | Knuth wrote that bubble sort "seems to have nothing to recommend it" except a catchy name; it is taught because it is easy to trace, not because it is used in practice.
T: Bubble sort | A sort that repeatedly swaps adjacent out-of-order items until a pass makes no swaps
T: Pass | One run through the list comparing adjacent pairs
T: In-place sort | A sort that rearranges items within the original list, needing little extra memory
SUM: Bubble sort swaps adjacent out-of-order items; each pass fixes the next largest item.
SUM: It is O(n^{2}) in the worst case, simple and in place, but slow on large data.
SRC: Knuth D. E., The Art of Computer Programming, Volume 3: Sorting and Searching, 2nd edition, Addison-Wesley, section 5.2.2 | secondary | 1998
SRC: OCR, GCSE Computer Science J277 specification, section 2.1.3 "Searching and sorting algorithms" | standard | 2020
Q: What is guaranteed after the first pass of bubble sort? | The largest item is in its final position at the end of the list.
Q: When does bubble sort with an early exit stop? | When a complete pass makes no swaps.
M1#computing-u04-03-q1@1: What does bubble sort compare? | Adjacent pairs of items | The first and last items only | Each item with the middle item | Items in two separate halves | Bubble sort compares neighbours and swaps them if they are in the wrong order.
M2#computing-u04-03-q2@2: What is [3, 1, 2] after the first pass of bubble sort into ascending order? | [1, 2, 3] | [1, 3, 2] | [3, 2, 1] | [2, 1, 3] | (3, 1) swap gives [1, 3, 2]; (3, 2) swap gives [1, 2, 3].
TF1#computing-u04-03-q3@2: With an early exit, bubble sort on an already sorted list needs only one pass. | true | The first pass makes no swaps, so the algorithm stops after n − 1 comparisons.
M3#computing-u04-03-q4@3: Why is bubble sort rarely used for large data sets? | Its comparisons grow with the square of n, so it becomes very slow | It can't sort lists containing negative numbers | It needs twice as much memory as the list | It only works on lists of strings | O(n^{2}) time means doubling the data roughly quadruples the work; merge sort or Timsort are far faster.
SA3#computing-u04-03-q5@2,3: Trace bubble sort on [4, 3, 2, 1] and use it to explain the algorithm's worst case. | Pass 1: [3, 4, 2, 1], [3, 2, 4, 1], [3, 2, 1, 4] (3 swaps). Pass 2: [2, 3, 1, 4], [2, 1, 3, 4] (2 swaps). Pass 3: [1, 2, 3, 4] (1 swap). Pass 4 makes no swaps. Reverse order is the worst case: every comparison causes a swap, giving 3 + 2 + 1 = 6 swaps, in general n(n − 1)/2, so the time grows as n^{2}. | Correct pass 1 ; Correct later passes ; Counts the swaps ; Identifies reverse order as worst case ; Generalises to n(n − 1)/2 or O(n^{2})

## Insertion sort
LV: GCSE · Application
S: Insertion sort builds a sorted section at the start of the list, taking each next item and inserting it into its correct place among the items already sorted. It is efficient on small or nearly sorted lists.
O: Describe how insertion sort works and write it in Python
O: Trace insertion sort, showing the sorted section after each item is inserted
O: Compare insertion sort with bubble sort and explain when it performs well
H: How it works
P: **Insertion sort** treats the first item as a sorted section of one. It then takes the next item (the **key**) and shifts larger items in the sorted section one place right until it finds where the key belongs, then inserts it. This repeats until every item has been inserted, like sorting a hand of playing cards.
X: Sort [7, 3, 5, 1].
> Sorted section [7]. Insert 3: 7 shifts right → [3, 7, 5, 1].
> Insert 5: 7 shifts right; 3 < 5, so 5 goes after 3 → [3, 5, 7, 1].
> Insert 1: 7, 5 and 3 all shift right → [1, 3, 5, 7].
> In Python: \`for i in range(1, len(v)):\` take \`key = v[i]\`, then \`while j >= 0 and v[j] > key:\` shift \`v[j + 1] = v[j]\` and decrease j, then place \`v[j + 1] = key\`.
K: Insertion sort keeps the front of the list sorted and inserts each new item into it; on nearly sorted data, each insertion needs very few shifts.
H: Efficiency
- Worst case (reverse order): O(n^{2}) comparisons and shifts.
- Best case (already sorted): one comparison per item, O(n).
- In place and stable, with little overhead, so it is fast for small lists.
- Real libraries use it for small sub-lists: Python's Timsort combines it with merge sort.
P: Insertion sort is also an **online** algorithm: it can sort items as they arrive, one at a time, keeping the list sorted throughout, which suits a stream of readings or a leaderboard updated by each new score.
!: Confusing insertion sort with bubble sort. Insertion sort moves one item into a growing sorted section; bubble sort swaps neighbours across the whole unsorted part.
EV: established | Insertion sort has O(n^{2}) worst-case time but O(n) on already sorted input, and performs well on nearly sorted data.
EV: established | Timsort, Python's built-in sort, uses insertion sort on short runs before merging them.
T: Insertion sort | A sort that inserts each item in turn into its correct place within a growing sorted section
T: Key | In insertion sort, the item currently being inserted into the sorted section
T: Nearly sorted | Data in which most items are already close to their final positions
SUM: Insertion sort grows a sorted section, inserting each next item in its place.
SUM: It is O(n^{2}) in the worst case but O(n) on sorted data, and fast for small lists.
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, section 2.1 | secondary | 2022
SRC: Peters T., "listsort.txt": description of Timsort in the CPython source | primary | 2002 | https://github.com/python/cpython/blob/main/Objects/listsort.txt
Q: In insertion sort, what is true of the items before the current position? | They form a sorted section.
Q: On what kind of data does insertion sort perform best? | Data that is already sorted or nearly sorted.
M1#computing-u04-04-q1@1: What does insertion sort do with each item in turn? | Inserts it into its correct place in the sorted section | Swaps it with the item at the end of the list | Splits it into two halves | Compares it only with the middle item | Each item is moved into position among the already sorted items.
M2#computing-u04-04-q2@2: What is [6, 2, 9, 4] after the first two items have been inserted (so three items are sorted)? | [2, 6, 9, 4] | [2, 4, 6, 9] | [6, 2, 4, 9] | [2, 6, 4, 9] | Inserting 2 gives [2, 6, 9, 4]; inserting 9 needs no move, so the list is unchanged.
TF1#computing-u04-04-q3@3: Insertion sort is usually faster than bubble sort on a list that is almost sorted. | true | Each item needs only a few shifts, so insertion sort approaches O(n), while bubble sort may still need several passes.
M3#computing-u04-04-q4@3: Why does Python's built-in sort use insertion sort for short runs? | It has little overhead and is fast on small, nearly sorted sections | It has better worst-case complexity than merge sort | It is the only stable sorting algorithm | It doesn't need any comparisons at all | For small n, simplicity beats asymptotic advantages; Timsort then merges the sorted runs.
SA3#computing-u04-04-q5@2,3: Compare insertion sort and bubble sort, using their best and worst cases. | Both are simple, in place and stable, with O(n^{2}) worst-case time on reverse-ordered data. Bubble sort repeatedly swaps adjacent items, fixing the largest remaining item each pass; insertion sort inserts each item into a growing sorted section. Both are O(n) on sorted data (bubble sort only with an early exit). In practice insertion sort does fewer swaps (it shifts and then places once) and is faster on nearly sorted data, which is why libraries use it for small runs; bubble sort is mainly used for teaching. | Describes both mechanisms ; States O(n^{2}) worst case for both ; States best cases ; Notes fewer swaps or better practical speed for insertion ; Judges which is more useful

## Merge sort
LV: GCSE · Application
S: Merge sort splits a list in half repeatedly until each part has one item, then merges the parts back together in order. It is a divide-and-conquer algorithm with O(n log n) time in every case.
O: Describe the split and merge stages of merge sort
O: Trace merge sort on a short list, showing each merge
O: Evaluate merge sort's time and memory use against bubble and insertion sort
H: Divide, then merge
P: **Merge sort** divides the list into two halves, sorts each half (by merge sort again), then **merges** the two sorted halves. Splitting stops at lists of one item, which are already sorted. To merge, compare the front items of the two lists, move the smaller to the output, and repeat until one list is empty, then copy the rest of the other.
X: Sort [8, 3, 5, 1].
> Split: [8, 3] and [5, 1]; then [8], [3], [5], [1].
> Merge pairs: [8] and [3] → [3, 8]; [5] and [1] → [1, 5].
> Merge [3, 8] with [1, 5]: 1 < 3 → 1; 3 < 5 → 3; 5 < 8 → 5; then 8. Result [1, 3, 5, 8].
> Each level of merging handles all n items, and there are log_{2} n levels.
K: Merge sort's time is O(n log n) in the best, average and worst case, but it needs extra memory for the merged lists.
H: Strengths and weaknesses
- Consistent O(n log n): 1,000,000 items need about 20 million comparisons, against about 500 billion for bubble sort.
- Stable, and suits linked lists and data too large for memory (external sorting).
- Needs O(n) extra memory for merging, unlike in-place sorts.
- More complex to write, and slower than insertion sort on very small lists.
P: The recursion in merge sort is often drawn as a tree: the full list at the top, splitting down to single items, then merging back up. The tree has about log_{2} n levels, and the total work at each level is proportional to n.
!: Thinking the splitting stage sorts anything. All the ordering happens during the merges.
EV: established | Merge sort, attributed to John von Neumann (1945), runs in O(n log n) time in every case.
EV: established | No comparison-based sort can beat O(n log n) in the worst case, so merge sort is asymptotically optimal among them.
T: Merge sort | A divide-and-conquer sort that splits a list into halves, sorts them and merges the sorted halves
T: Merge | Combining two sorted lists into one sorted list by repeatedly taking the smaller front item
T: O(n log n) | Linearithmic time: typical of efficient comparison sorts such as merge sort
SUM: Merge sort splits down to single items, then merges sorted lists back together.
SUM: It is O(n log n) in every case and stable, but needs O(n) extra memory.
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, section 2.3 | secondary | 2022
SRC: Knuth D. E., The Art of Computer Programming, Volume 3: Sorting and Searching, 2nd edition, Addison-Wesley, section 5.2.4 | secondary | 1998
Q: What is the time complexity of merge sort? | O(n log n) in the best, average and worst cases.
Q: What is the main disadvantage of merge sort compared with bubble sort? | It needs extra memory, about the size of the list, for merging.
M1#computing-u04-05-q1@1: At which stage of merge sort are items put in order? | When sorted sub-lists are merged | When the list is split in half | When single items are compared with the middle item | Before the algorithm starts | Splitting only divides the list; ordering happens as lists are merged.
M2#computing-u04-05-q2@2: What is the result of merging [2, 7, 9] and [3, 4, 10]? | [2, 3, 4, 7, 9, 10] | [2, 7, 9, 3, 4, 10] | [2, 3, 7, 4, 9, 10] | [10, 9, 7, 4, 3, 2] | Repeatedly take the smaller front item: 2, 3, 4, 7, 9, then the remaining 10.
TF1#computing-u04-05-q3@2: Merge sort is faster on an already sorted list than on a reversed one. | false | Merge sort always splits and merges fully, so it takes O(n log n) whatever the starting order.
M3#computing-u04-05-q4@3: A device with very little spare memory must sort 5,000 readings. Why might insertion sort be preferred to merge sort? | It sorts in place, while merge sort needs extra memory for merging | Merge sort can't sort more than 1,000 items | Insertion sort is O(n log n) in every case | Merge sort only works on strings | Merge sort's O(n) extra space may not fit; insertion sort uses almost none, at the cost of more time.
SA3#computing-u04-05-q5@2,3: Explain why merge sort takes O(n log n) time and evaluate it against bubble sort for sorting 100,000 records. | Halving repeatedly gives about log_{2} n levels of splitting; at each level every item is handled once during merging, so the total work is about n × log_{2} n. For 100,000 records that is about 1.7 million operations, against about 5 billion for bubble sort's n^{2}/2. Merge sort is stable and predictable but needs memory for a copy of the data; bubble sort is in place but impractically slow at this size. Merge sort is the clear choice unless memory is very tight. | Explains log n levels ; Explains n work per level ; Gives a numerical comparison ; Notes the extra memory cost ; Reaches a justified choice

## Quicksort
LV: A level · Application
S: Quicksort picks a pivot, partitions the list into items smaller and larger than the pivot, then sorts each part recursively. It is usually the fastest general-purpose comparison sort in practice, though its worst case is O(n^{2}).
O: Describe how quicksort partitions a list around a pivot
O: Trace quicksort on a short list
O: Explain quicksort's best and worst cases and how pivot choice affects them
H: Partition around a pivot
P: **Quicksort**, devised by Tony Hoare in 1959–61, chooses a **pivot** item, then **partitions** the list so that every item smaller than the pivot comes before it and every larger item after it. The pivot is now in its final position. Quicksort is then applied to each side; lists of zero or one item are already sorted.
X: Sort [6, 2, 9, 4, 7] using the first item as pivot.
> Pivot 6: smaller items [2, 4]; larger items [9, 7]. Arrangement: [2, 4] 6 [9, 7].
> Sort [2, 4]: pivot 2, nothing smaller, [4] larger → [2, 4].
> Sort [9, 7]: pivot 9, [7] smaller → [7, 9].
> Result: [2, 4, 6, 7, 9].
K: Quicksort does its work while partitioning, before the recursive calls; merge sort does its work while merging, after them.
H: Performance
- Best and average case: pivots split lists roughly in half, O(n log n).
- Worst case: the pivot is always the smallest or largest item (for example, the first item of a sorted list), giving O(n^{2}).
- Choosing a random pivot, or the median of three items, makes the worst case very unlikely.
- In-place partitioning needs only O(log n) extra memory on average, and it is fast in practice because of good cache use.
P: The partition step can be done in place by scanning from both ends of the list and swapping items that are on the wrong side of the pivot (Hoare's scheme), or by one scan that moves smaller items to the front (Lomuto's scheme). Either way, partitioning a list of n items takes O(n) time.
!: Picking the first item as pivot on data that is often already sorted. Every partition is lopsided and quicksort degrades to O(n^{2}).
EV: established | Quicksort's average time is O(n log n) and its worst case O(n^{2}); randomised pivot selection makes the worst case highly improbable.
EV: established | Quicksort variants are used in many standard libraries, for example C's qsort implementations and Java's sort for primitive types (dual-pivot quicksort).
T: Quicksort | A divide-and-conquer sort that partitions a list around a pivot and sorts each part recursively
T: Pivot | The item chosen to partition the list; smaller items go before it and larger after
T: Partition | Rearranging a list so that items less than the pivot come before it and greater items after it
SUM: Quicksort partitions around a pivot, which lands in its final place, then sorts each side.
SUM: It averages O(n log n) and is fast in practice, but poor pivots give O(n^{2}).
SRC: Hoare C. A. R., "Quicksort", The Computer Journal 5(1), 10–16 | primary | 1962 | https://doi.org/10.1093/comjnl/5.1.10
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, chapter 7 | secondary | 2022
Q: What is a pivot in quicksort? | The item chosen to partition the list: smaller items go before it and larger items after.
Q: What is quicksort's worst-case time complexity? | O(n^{2}), when pivots repeatedly split the list very unevenly.
M1#computing-u04-06-q1@1: Where is the pivot after one partition step in quicksort? | In its final sorted position | At the start of the list | At the end of the list | In the middle index of the list | Everything smaller is before it and everything larger after it, so the pivot is exactly where it belongs.
M2#computing-u04-06-q2@2: Partition [5, 8, 1, 7, 3] around the pivot 5. Which items end up before the pivot? | 1 and 3 | 8 and 7 | 1, 3 and 7 | Only 1 | Items smaller than 5 go before it: 1 and 3. 8 and 7 go after.
TF1#computing-u04-06-q3@3: Choosing the pivot at random makes quicksort's O(n^{2}) worst case very unlikely. | true | A random pivot is unlikely to be the extreme item every time, whatever the input order.
M3#computing-u04-06-q4@3: Quicksort using the first item as pivot is run on a list already in ascending order. What happens? | Each partition puts every other item on one side, so it takes O(n^{2}) time | It finishes in one partition, because the list is sorted | It takes O(log n) time, because nothing moves | It raises an error because no items are smaller | The first item is the minimum, so each step removes only one item: n + (n − 1) + … comparisons.
SA3#computing-u04-06-q5@2,3: Compare quicksort and merge sort, and explain why quicksort is often preferred in practice despite its worse worst case. | Both are divide-and-conquer O(n log n) sorts on average. Merge sort guarantees O(n log n) and is stable but needs O(n) extra memory. Quicksort partitions in place with little extra memory and has small constant factors and good cache behaviour, so it is usually faster on arrays; its O(n^{2}) worst case comes from poor pivots and is made unlikely by random or median-of-three pivots. Merge sort is preferred when stability, guaranteed time or linked lists matter. | States both average O(n log n) ; Notes merge sort's guarantee and memory cost ; Notes quicksort's in-place speed ; Explains the worst case and pivot remedy ; Says when each is preferred

## Measuring efficiency
LV: A level · Application
S: Algorithms are compared by how their use of time and memory grows as the input grows, not by timing them on one computer. This lesson introduces counting basic operations, best, average and worst cases, and why growth rate matters.
O: Explain why algorithms are compared by counting operations rather than by timing
O: Count the operations an algorithm performs as a function of the input size n
O: Distinguish best, average and worst cases and explain why the worst case is usually reported
H: Why not just time it?
P: The time a program takes depends on the computer, the language, other programs running and the particular input. To compare **algorithms** fairly, we count the **basic operations** they perform (comparisons, assignments, arithmetic) as a function of the **input size** n, such as the number of items in a list.
X: Count the operations in \`total = 0\`, then \`for x in v: total += x\`.
> \`total = 0\`: 1 operation.
> The loop body runs n times, 1 addition each: n operations.
> Total: n + 1 operations.
> For large n the + 1 is irrelevant: doubling n doubles the work. The algorithm grows linearly.
K: Efficiency is about growth: how the number of operations (or memory) increases as n increases, independent of hardware.
H: Cases
- **Best case**: the input that needs the least work (target first in linear search).
- **Worst case**: the input that needs the most (target absent).
- **Average case**: the expected work over typical inputs.
- The worst case is usually quoted because it is a guarantee: the algorithm will never do worse.
P: **Space complexity** measures memory the same way: how much extra storage an algorithm needs as n grows. Merge sort needs n extra memory; bubble sort needs almost none.
!: Judging an algorithm by its speed on small test data. At n = 10 almost everything is fast; differences show at large n.
EV: established | Analysing algorithms by counting operations as a function of input size is the standard approach in algorithm textbooks such as CLRS and Knuth.
EV: contested | Average-case analysis depends on assumptions about the input distribution, which may not match real data.
T: Time complexity | How the number of operations an algorithm performs grows with the size of its input
T: Space complexity | How the amount of memory an algorithm needs grows with the size of its input
T: Input size | The measure of how big a problem is, usually written n, such as the number of items
SUM: Algorithms are compared by counting operations as a function of n, not by timing.
SUM: Best, average and worst cases differ; the worst case gives a guarantee.
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, section 2.2 "Analyzing algorithms" | secondary | 2022
SRC: AQA, A-level Computer Science 7517 specification, section 4.4.4 "Classification of algorithms" | standard | 2015
Q: Why is the worst case usually reported? | It is a guarantee: the algorithm will never take longer than that.
Q: What does space complexity measure? | How the extra memory an algorithm needs grows as the input size grows.
M1#computing-u04-07-q1@1: Why do computer scientists count operations instead of timing programs? | Timings depend on the hardware and conditions, while operation counts depend only on the algorithm | Timing a program is impossible without special equipment | Counting operations always gives smaller numbers | Operations can't be measured on modern computers | Counting operations gives a machine-independent measure that can be compared fairly.
M2#computing-u04-07-q2@3: A loop inside a loop each runs over n items, and the inner body does 2 operations. Roughly how many operations are done? | 2n^{2} | 2n | n + 2 | n^{2} + n^{2} + n | The inner body runs n × n times, with 2 operations each, so about 2n^{2}.
TF1#computing-u04-07-q3@1: An algorithm's best-case performance guarantees how it will perform on any input. | false | The best case is the most favourable input; only the worst case gives a guarantee for all inputs.
M3#computing-u04-07-q4@3: Algorithm A takes 100n operations and B takes n^{2}. Which is better for large inputs? | A, because n^{2} grows faster and exceeds 100n once n is over 100 | B, because it has no large constant | They are always equal | B, because squaring is a single operation | Growth rate dominates: for n = 10,000, A does 1 million operations and B 100 million.
SA3#computing-u04-07-q5@2,3: Explain why an algorithm that is faster on a test of 20 items might be the worse choice for real data of 2 million items. | At 20 items, constant factors and set-up costs dominate, so a simple O(n^{2}) algorithm may beat an O(n log n) one. But efficiency is about growth: at 2 million items n^{2} is 4 × 10^{12} operations while n log n is about 4 × 10^{7}, a difference of 100,000 times. Algorithms should be compared by their time complexity, preferably in the worst case, and tested at realistic sizes. | Notes constants dominate at small n ; Explains growth rate ; Gives a numerical comparison ; Mentions worst case or complexity classes ; Concludes that realistic sizes must be considered

## Big O notation
LV: A level · Application
S: Big O notation describes the upper bound on how an algorithm's time or space grows with input size, ignoring constants and lower-order terms. This lesson covers the common complexity classes and how to derive the Big O of simple code.
O: Explain what Big O notation expresses and why constants and smaller terms are dropped
O: Derive the Big O complexity of code with loops, nested loops and halving
O: Rank the common complexity classes from most to least efficient
H: What Big O means
P: **Big O notation** gives an upper bound on the growth of a function: an algorithm is O(f(n)) if, for large enough n, its operation count is at most a constant times f(n). In practice we keep the fastest-growing term and drop constants: 3n^{2} + 5n + 7 is O(n^{2}). Big O is usually used for the worst case.
H: The common classes
E: O(1) :: constant: accessing a list item by index
E: O(log n) :: logarithmic: binary search
E: O(n) :: linear: linear search, summing a list
E: O(n log n) :: linearithmic: merge sort
E: O(n^{2}) :: polynomial (quadratic): bubble sort, nested loops over the data
E: O(2^{n}) :: exponential: trying every subset of n items
E: O(n!) :: factorial: trying every ordering of n items
X: Derive the Big O of three fragments.
> \`x = v[0]\`: one step whatever n is: O(1).
> \`for a in v:\` with an inner \`for b in v:\` doing one comparison: n × n steps: O(n^{2}).
> \`while n > 1: n = n // 2\`: n halves each time, so about log_{2} n passes: O(log n).
> Two loops one after another over v: n + n = 2n, which is O(n).
K: Sequential steps add (keep the largest); nested loops multiply; halving the problem each step gives a logarithm.
P: Big O is used for space as well as time: an algorithm that builds a copy of its input uses O(n) extra space, while one that keeps only a few variables uses O(1). Both measures matter when choosing an algorithm.
!: Thinking O(n) means "exactly n steps". 5n + 100 is also O(n): Big O describes the shape of growth, not the exact count.
EV: established | Big O notation was popularised in computer science by Knuth (1976) for stating bounds on algorithm running times.
EV: established | Strictly, Big O is an upper bound; Θ (theta) gives a tight bound and Ω (omega) a lower bound, though "Big O" is often used loosely for the tight bound.
T: Big O notation | A notation giving an upper bound on how an algorithm's time or space grows with input size
T: Constant time | O(1): the time doesn't depend on the input size
T: Exponential time | O(2^{n}) or worse: the time doubles (or more) with each extra item of input
SUM: Big O keeps the fastest-growing term and ignores constants.
SUM: From best to worst: O(1), O(log n), O(n), O(n log n), O(n^{2}), O(2^{n}), O(n!).
SRC: Knuth D. E., "Big Omicron and big Omega and big Theta", ACM SIGACT News 8(2), 18–24 | primary | 1976 | https://doi.org/10.1145/1008328.1008329
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, chapter 3 | secondary | 2022
Q: What is the Big O of 4n^{2} + 3n + 10? | O(n^{2}): keep the fastest-growing term and drop constants.
Q: What is the time complexity of accessing a list item by its index? | O(1), constant time.
M1#computing-u04-08-q1@1: What is the time complexity of binary search? | O(log n) | O(n) | O(n^{2}) | O(1) | Each step halves the range, so the number of steps grows with log n.
M2#computing-u04-08-q2@2: What is the Big O of a loop over n items followed by a separate loop over the same n items? | O(n) | O(n^{2}) | O(2n^{2}) | O(log n) | Sequential loops add: n + n = 2n, and constants are dropped, giving O(n).
SEQ1#computing-u04-08-q3@3: Order these complexities from most to least efficient for large n. | O(1) ; O(log n) ; O(n) ; O(n log n) ; O(n^{2}) ; O(2^{n}) | Constant beats logarithmic, which beats linear, then linearithmic, quadratic and exponential.
M3#computing-u04-08-q4@3: A function loops i from 1 to n, and inside it loops j from 1 to 10. What is its Big O? | O(n) | O(n^{2}) | O(10^{n}) | O(log n) | The inner loop runs a constant 10 times, so the total is 10n, which is O(n).
SA3#computing-u04-08-q5@2,3: Explain how to find the Big O of an algorithm that compares every pair of items in a list to find duplicates, and suggest a more efficient approach. | The outer loop visits each of n items and the inner loop compares it with every later item: about n(n − 1)/2 comparisons. Dropping constants and lower terms gives O(n^{2}). A better approach adds each item to a set while checking whether it is already there: each check and insertion is O(1) on average, so the whole algorithm is O(n), at the cost of O(n) extra memory. Sorting first then comparing neighbours gives O(n log n) with little extra memory. | Counts pairs as about n^{2}/2 ; Concludes O(n^{2}) ; Proposes a set or hash-based approach ; States O(n) for it ; Notes the memory trade-off or sorting alternative

## Comparing algorithm complexity
LV: A level · Evaluation
S: Knowing the Big O of algorithms lets you predict how they scale and choose between them. This lesson compares the searching and sorting algorithms, shows how quickly different classes grow and discusses when the theoretically better algorithm isn't the best choice.
O: Compare the time and space complexity of the standard searching and sorting algorithms
O: Use growth rates to predict how running time changes when the input grows
O: Evaluate when factors other than Big O should decide the choice of algorithm
H: The standard algorithms
- Linear search: O(n) time, O(1) space; any list.
- Binary search: O(log n) time, O(1) space iteratively; sorted lists.
- Bubble and insertion sort: O(n^{2}) worst, O(n) best, O(1) extra space.
- Merge sort: O(n log n) always, O(n) extra space, stable.
- Quicksort: O(n log n) average, O(n^{2}) worst, O(log n) space on average.
H: How fast things grow
P: For n = 1,000: log_{2} n ≈ 10; n log n ≈ 10,000; n^{2} = 1,000,000; 2^{n} has over 300 digits. If an O(n^{2}) algorithm takes 1 second for 1,000 items, it takes about 100 seconds for 10,000 items (100 times the work for 10 times the data), while an O(n log n) algorithm's time grows only about 13 times.
X: Predict running times. An O(n^{2}) sort takes 4 seconds for 20,000 items.
> Doubling n to 40,000 multiplies the work by 2^{2} = 4: about 16 seconds.
> Ten times the data, 200,000 items: 10^{2} = 100 times: about 400 seconds.
> An O(n log n) sort taking 0.1 s at 20,000 would take roughly 1.2 s at 200,000.
> Growth rate, not today's speed, decides what is practical at scale.
K: For large inputs the complexity class dominates; for small inputs, constant factors, memory and simplicity can matter more.
H: Beyond Big O
- **Input characteristics**: insertion sort beats merge sort on nearly sorted data.
- **Memory**: in-place algorithms suit constrained devices.
- **Stability**: needed when sorting records by one field while keeping an earlier order.
- **Simplicity**: simple code is less likely to contain bugs.
!: Assuming an O(log n) algorithm is always faster. Binary search requires sorted data; if the data must be sorted first for one search, the total cost is O(n log n).
EV: established | The asymptotic complexities of the standard searching and sorting algorithms are proved results found in every algorithms textbook.
EV: contested | Real-world performance also depends on hardware effects such as caching, so engineers benchmark candidates on realistic data before choosing.
T: Scalability | How well an algorithm copes as its input grows
T: Stable sort | A sort that keeps items with equal keys in their original relative order
T: Constant factor | The fixed multiplier hidden by Big O, which affects speed at small and moderate sizes
SUM: Searching: linear O(n), binary O(log n). Sorting: bubble and insertion O(n^{2}), merge O(n log n), quicksort O(n log n) on average.
SUM: Complexity dominates at scale; memory, stability, data and simplicity also matter.
SRC: Sedgewick R. and Wayne K., Algorithms, 4th edition, Addison-Wesley, section 2.5 | secondary | 2011
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, part II | secondary | 2022
Q: If an O(n^{2}) algorithm's input is tripled, how does its running time change? | It increases about nine times (3^{2}).
Q: Which standard sort guarantees O(n log n) time in every case? | Merge sort.
M1#computing-u04-09-q1@1: Which sort has O(n log n) time in the worst case? | Merge sort | Bubble sort | Insertion sort | Quicksort with the first item as pivot | Merge sort always splits and merges in n log n time; the others can degrade to n^{2}.
M2#computing-u04-09-q2@2: An O(n) algorithm takes 2 seconds for 1 million items. Roughly how long for 5 million? | 10 seconds | 50 seconds | 2 seconds | 25 seconds | Linear time grows in proportion: five times the data takes five times as long.
TF1#computing-u04-09-q3@3: An algorithm with a better Big O is always faster, whatever the input size. | false | Big O describes growth for large n; at small n, an algorithm with worse complexity but smaller constants can be faster.
M3#computing-u04-09-q4@3: A list of 1 million records arrives almost sorted, with a few out of place, and must be fully sorted. Which algorithm is likely to be fastest? | Insertion sort, because few shifts are needed on nearly sorted data | Bubble sort without an early exit | Quicksort with the first item as pivot | Selection of a random algorithm each time | Insertion sort runs close to O(n) on nearly sorted input; a first-item-pivot quicksort would hit its O(n^{2}) worst case.
SA3#computing-u04-09-q5@2,3: A social media site sorts 50 million posts by time several times a minute. Evaluate which sorting algorithm it should use. | Bubble and insertion sorts are O(n^{2}): about 10^{15} operations, far too slow. Merge sort guarantees O(n log n), roughly 1.3 × 10^{9} operations, and is stable, but needs a second copy of 50 million items. Quicksort averages the same complexity in place and is fast in practice, though a randomised pivot is needed to avoid the worst case. A hybrid such as Timsort benefits because new posts arrive mostly in time order. The best choice is an O(n log n) hybrid sort exploiting existing order, possibly with incremental updates rather than full re-sorts. | Rules out O(n^{2}) sorts with numbers ; Evaluates merge sort with memory ; Evaluates quicksort with pivot ; Uses the nearly sorted nature of data ; Reaches a justified recommendation

## Time and space trade-offs
LV: A level · Evaluation
S: Faster algorithms often need more memory, and memory-saving algorithms often take longer. This lesson explores the time-space trade-off through caching, lookup tables, hashing and memoisation.
O: Explain what is meant by a time-space trade-off
O: Identify trade-offs in techniques such as lookup tables, caching, hashing and memoisation
O: Evaluate which side of a trade-off to favour in a given situation
H: Trading memory for speed
P: A **time-space trade-off** is a choice between using more memory to save time, or more time to save memory. Storing results so they needn't be recalculated, or building an index so items needn't be searched, uses space to buy speed.
- **Lookup tables**: precompute answers, such as the square of every byte value, and read them instead of calculating.
- **Hash tables**: dictionaries and sets use extra space so lookups are O(1) rather than O(n).
- **Caching**: keep recently used results, from CPU caches to web caches.
- **Memoisation**: store each function result by its arguments, so repeated calls return instantly.
X: Memoise a slow recursive Fibonacci function.
> Plain recursion recalculates the same values repeatedly: fib(30) makes over 1.6 million calls.
> Add \`from functools import lru_cache\` and the decorator \`@lru_cache(maxsize=None)\` above \`def fib(n):\`.
> Now each fib(k) is computed once and stored: fib(30) needs only 31 calculations.
> Time falls from exponential to O(n); memory rises to O(n) for the stored results.
K: Precomputing or storing results trades memory for speed; recomputing trades speed for memory. The right balance depends on which is scarcer.
H: Choosing a side
P: Favour speed when memory is plentiful and responses matter (web servers, games). Favour memory when it is scarce (embedded devices, huge data sets) or when stored results would quickly go stale. Compression is another trade-off: smaller files cost processing time to compress and decompress.
!: Caching without a limit or an expiry. An unbounded cache can exhaust memory, and stale entries return out-of-date results.
EV: established | The time-space trade-off is a general principle of algorithm design, illustrated by hash tables, lookup tables and memoisation.
EV: established | Python's functools.lru_cache provides memoisation with an optional size limit and least-recently-used eviction.
T: Time-space trade-off | Using more memory to reduce running time, or more time to reduce memory use
T: Memoisation | Storing the results of function calls so that repeated calls with the same arguments return immediately
T: Lookup table | A precomputed table of answers that replaces calculation with a fast read
SUM: Many speed-ups store results (tables, caches, hashes, memoisation) at the cost of memory.
SUM: Which side to favour depends on the scarcity of memory and time and on whether stored data stays valid.
SRC: Python Software Foundation, The Python Standard Library, "functools": lru_cache | standard | 2024 | https://docs.python.org/3/library/functools.html
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, chapter 14 "Dynamic Programming" | secondary | 2022
Q: What is memoisation? | Storing results of function calls by their arguments so repeated calls return the stored result instead of recalculating.
Q: Give an example of trading memory for speed. | A hash table (dictionary) uses extra memory to give O(1) average lookups instead of O(n) searching.
M1#computing-u04-10-q1@1: What does a time-space trade-off involve? | Using more memory to save time, or more time to save memory | Making an algorithm both faster and smaller at no cost | Replacing an algorithm with hardware | Running two algorithms at the same time | Most improvements in one resource cost something in the other.
M2#computing-u04-10-q2@2: A game precomputes the sine of every whole-degree angle into a list at start-up. What is the trade-off? | 360 stored values in memory in exchange for faster lookups during play | Slower gameplay in exchange for using less memory | Less accuracy in exchange for no memory use | No trade-off, because lists use no memory | A lookup table spends memory once so each later sine is a fast read instead of a calculation.
TF1#computing-u04-10-q3@2: Memoisation reduces the running time of recursive Fibonacci from exponential to linear. | true | Each value is calculated once and stored, so only n distinct calls do real work.
M3#computing-u04-10-q4@3: A smart thermostat with 32 KB of memory needs the average of its last 10,000 readings. Which approach suits it best? | Keep a running total and count, updated with each reading, without storing them all | Store all 10,000 readings in a list and sum them each time | Cache every average ever calculated in a dictionary | Build a lookup table of all possible averages | Memory is scarce, so storing the readings is unaffordable; a running total trades no extra memory for constant-time updates (a sliding window would need more care).
SA3#computing-u04-10-q5@2,3: Evaluate the use of caching in a website that shows each visitor the day's top 100 news stories. | Calculating the top 100 needs a costly database query. Caching the result in memory and serving it to every visitor saves enormous repeated work, giving fast responses and lower server load: a trade of a little memory for much time. The risks are staleness (new stories won't appear until the cache refreshes) and memory use if many variants are cached. An expiry time of, say, a minute, or invalidation when stories change, balances freshness with speed. Here the trade-off strongly favours caching. | Identifies the costly repeated computation ; Explains memory used to save time ; Identifies staleness ; Proposes expiry or invalidation ; Reaches a justified judgement

## Recursion
LV: A level · Application
S: A recursive function is one that calls itself on a smaller version of the same problem. This lesson covers base cases and recursive cases, the call stack, and how to trace a recursive function.
O: Identify the base case and recursive case of a recursive function
O: Trace a recursive function using the call stack, including how values are returned
O: Explain stack overflow and why every recursive function needs a reachable base case
H: Base and recursive cases
P: A **recursive** function solves a problem by calling itself on a smaller instance. It needs a **base case**, which is answered directly without recursion, and a **recursive case**, which reduces the problem and calls the function again. Each call must move closer to the base case.
E: n! = n × (n − 1)! :: recursive case of factorial
E: 0! = 1 :: base case
X: Trace \`def fact(n):\` with \`if n == 0: return 1\` and \`return n * fact(n - 1)\`, called as fact(3).
> fact(3) needs 3 × fact(2); fact(2) needs 2 × fact(1); fact(1) needs 1 × fact(0).
> fact(0) hits the base case and returns 1.
> Unwinding: fact(1) returns 1 × 1 = 1; fact(2) returns 2 × 1 = 2; fact(3) returns 3 × 2 = 6.
> Four calls were on the stack at the deepest point.
K: A recursive function must have a base case that stops the recursion and a recursive case that moves towards it; results are combined as the calls return.
H: The call stack
P: Each function call pushes a **stack frame** holding its parameters, local variables and return address onto the **call stack**. When a call returns, its frame is popped and execution resumes in the caller. Deep recursion uses one frame per level; if the stack runs out of space, the program fails with a **stack overflow** (Python raises RecursionError, by default after about 1,000 levels).
!: Writing a recursive case that doesn't shrink the problem, such as \`fact(n)\` calling \`fact(n)\`, or a base case that can be skipped, such as testing \`n == 0\` when n can be negative. Both recurse until the stack overflows.
EV: established | Any recursive function can be rewritten iteratively, using an explicit stack where necessary, and vice versa.
EV: established | CPython sets a default recursion limit (about 1,000 frames), adjustable with sys.setrecursionlimit, to protect against stack overflow.
T: Recursion | A technique in which a function calls itself to solve a smaller instance of the same problem
T: Base case | The condition under which a recursive function returns without calling itself
T: Stack overflow | An error when the call stack runs out of space, often caused by recursion that never reaches its base case
SUM: Recursion solves a problem through smaller instances of itself, ending at a base case.
SUM: Each call adds a stack frame; missing or unreachable base cases cause stack overflow.
SRC: Python Software Foundation, The Python Standard Library, "sys": getrecursionlimit and setrecursionlimit | standard | 2024 | https://docs.python.org/3/library/sys.html
SRC: Abelson H. and Sussman G. J., Structure and Interpretation of Computer Programs, 2nd edition, MIT Press, section 1.2 | secondary | 1996
Q: What is a base case? | The case in which a recursive function returns an answer directly, without calling itself, stopping the recursion.
Q: What is stored in a stack frame? | A call's parameters, local variables and the return address.
M1#computing-u04-11-q1@1: What must every recursive function have to avoid running forever? | A reachable base case | A global variable | At least two parameters | A while loop | Without a base case that is eventually reached, the calls never stop and the stack overflows.
M2#computing-u04-11-q2@2: Given \`def s(n):\` with \`if n == 1: return 1\` and \`return n + s(n - 1)\`, what is s(4)? | 10 | 24 | 4 | 9 | s(4) = 4 + 3 + 2 + 1 = 10: the function sums 1 to n.
TF1#computing-u04-11-q3@2: When a recursive call returns, its stack frame is removed and execution continues in the calling function. | true | Frames are popped in last-in, first-out order as each call completes.
M3#computing-u04-11-q4@3: What happens when \`def f(n): return n * f(n - 1)\` (with no base case) is called as f(5)? | It recurses until the stack overflows, raising RecursionError | It returns 120, the factorial of 5 | It returns 0 once n reaches 0 | It returns None after one call | Nothing stops the calls: n goes 5, 4, 3 … below zero indefinitely until the recursion limit is hit.
SA3#computing-u04-11-q5@2,3: Write a recursive function to compute the sum of a list's items, and explain how it works using the call stack. | \`def total(v):\` \`if v == []: return 0\` (base case: an empty list sums to 0), else \`return v[0] + total(v[1:])\` (recursive case on a shorter list). For [2, 5, 1], calls stack up: total([2, 5, 1]), total([5, 1]), total([1]), total([]). The base case returns 0, then frames are popped: 1 + 0 = 1, 5 + 1 = 6, 2 + 6 = 8. Each call holds its own v in its stack frame. | Correct base case ; Correct recursive case on a smaller list ; Traces calls being pushed ; Traces values returned as frames pop ; Correct final result

## Recursive and iterative solutions
LV: A level · Evaluation
S: Many problems can be solved either recursively or with loops. This lesson compares the two approaches for clarity, memory use and speed, and shows how to convert between them.
O: Write recursive and iterative versions of the same algorithm
O: Compare recursion and iteration for memory use, speed and readability
O: Judge which approach suits a given problem and justify the choice
H: Two ways to repeat
P: **Iteration** repeats with loops and updates variables; **recursion** repeats by calling itself, with each call holding its own state. Every recursive algorithm can be written iteratively (sometimes with an explicit stack) and the reverse.
X: Factorial, both ways.
> Recursive: \`def fact(n): return 1 if n == 0 else n * fact(n - 1)\`.
> Iterative: \`result = 1\`, then \`for i in range(2, n + 1): result *= i\`, then return result.
> Both give fact(5) = 120. The recursive version uses 6 stack frames; the iterative one uses two variables.
> fact(5000) works iteratively but exceeds Python's default recursion limit recursively.
K: Recursion is natural for self-similar problems such as trees and divide and conquer; iteration is usually more memory-efficient and faster for simple repetition.
H: Comparing the approaches
- **Readability**: recursion mirrors definitions (factorial, tree traversal, merge sort) and can be much shorter.
- **Memory**: each recursive call adds a stack frame, O(n) for depth n; a loop needs O(1).
- **Speed**: function calls cost time, so recursion is often slower in Python.
- **Risk**: deep recursion can overflow the stack.
- Some languages optimise **tail calls** (where the recursive call is the last action) into loops; Python does not.
P: To convert recursion into iteration, keep the information each call would have held in variables or on an explicit stack, and loop until the base case is reached. To convert the other way, turn the loop's changing variables into parameters of a recursive call.
!: Assuming recursion is always more elegant. For simple counting loops, recursion adds overhead and risk without making the code clearer.
EV: established | Recursion and iteration are equally expressive: any computation written with one can be written with the other.
EV: contested | Which is clearer is partly a matter of training and taste; functional programmers use recursion routinely, while Python's style favours loops for simple repetition.
T: Iteration | Repeating steps using a loop
T: Tail recursion | Recursion in which the recursive call is the final action of the function
T: Explicit stack | A stack data structure managed by the program, used to replace recursion with iteration
SUM: Recursive and iterative solutions are interchangeable; recursion uses a stack frame per call.
SUM: Choose recursion for naturally recursive structures and iteration for simple repetition or deep inputs.
SRC: Abelson H. and Sussman G. J., Structure and Interpretation of Computer Programs, 2nd edition, MIT Press, section 1.2.1 "Linear recursion and iteration" | secondary | 1996
SRC: OCR, A Level Computer Science H446 specification, section 2.2.1 "Programming techniques" | standard | 2015
Q: Why does recursion usually use more memory than iteration? | Each recursive call adds a stack frame, so memory grows with the depth of recursion.
Q: Name a problem that is naturally recursive. | Traversing a tree, merge sort, or the Towers of Hanoi.
M1#computing-u04-12-q1@1: What is the main memory disadvantage of recursion? | Each call adds a frame to the call stack | Recursive functions can't use local variables | Recursion stores the whole program twice | Recursive code can't be compiled | Stack frames accumulate until the base case is reached, using memory proportional to the depth.
M2#computing-u04-12-q2@2: A function must count down from 1,000,000 to 0. Why is a loop better than recursion in Python? | Recursion would need a million stack frames and exceed the recursion limit | Loops can't count down, so recursion is required | Recursion would give the wrong numbers | Python loops are limited to 1,000 passes | A loop uses constant memory; recursion of that depth overflows Python's stack.
TF1#computing-u04-12-q3@1: Every recursive algorithm can be rewritten as an iterative one. | true | Iteration with an explicit stack can simulate any recursion, and the two are equally expressive.
M3#computing-u04-12-q4@3: Which task most clearly benefits from a recursive solution? | Listing every file in a folder and all its sub-folders | Adding up the numbers in a flat list | Printing the numbers from 1 to 100 | Reading the lines of a text file | Folders contain folders, a self-similar tree structure that recursion handles naturally.
SA3#computing-u04-12-q5@2,3: Compare recursive and iterative solutions to calculating the nth Fibonacci number. | The naive recursive version, fib(n) = fib(n − 1) + fib(n − 2) with base cases fib(0) = 0 and fib(1) = 1, mirrors the definition and is easy to read but recomputes values, taking exponential time, and uses O(n) stack. An iterative version keeps the last two values in a loop, taking O(n) time and O(1) memory. Memoising the recursive version brings it to O(n) time but still O(n) memory. Iteration is the better practical choice; recursion is clearer for explaining the definition. | Describes the recursive version and base cases ; Identifies exponential time from repeated work ; Describes the iterative version with complexities ; Mentions memoisation or stack use ; Reaches a justified judgement

## Breadth-first and depth-first traversal
LV: A level · Application
S: Graph traversal visits every reachable vertex of a graph in a systematic order. This lesson covers breadth-first search with a queue and depth-first search with a stack or recursion, and what each is used for.
O: Describe breadth-first and depth-first traversal of a graph
O: Trace both traversals on a graph, recording the visiting order
O: Compare the two traversals and choose one for a given application
H: Breadth-first search
P: **Breadth-first search** (BFS) visits a start vertex, then all its neighbours, then their unvisited neighbours, level by level. It uses a **queue**: dequeue a vertex, visit it, and enqueue its unvisited neighbours. Marking vertices as visited prevents loops in graphs with cycles. In an unweighted graph BFS finds the shortest path (fewest edges) from the start to every vertex.
H: Depth-first search
P: **Depth-first search** (DFS) goes as deep as possible along one branch before backtracking. It uses a **stack**, often the call stack through recursion: visit a vertex, then recursively visit each unvisited neighbour in turn.
X: Graph: A–B, A–C, B–D, C–D, D–E. Start at A; neighbours in alphabetical order.
> BFS: queue [A]. Visit A, enqueue B, C. Visit B, enqueue D. Visit C (D already queued). Visit D, enqueue E. Visit E. Order: A, B, C, D, E.
> DFS: visit A, go to B, from B go to D, from D go to C (unvisited), backtrack to D, go to E. Order: A, B, D, C, E.
> Both visit every vertex once; only the order differs.
> Each runs in O(V + E) time for V vertices and E edges with an adjacency list.
K: BFS explores level by level with a queue and finds shortest paths in unweighted graphs; DFS explores deeply with a stack and suits maze solving, cycle detection and topological sorting.
H: Applications
- BFS: shortest routes in unweighted networks, "degrees of separation" in social networks, web crawling by distance.
- DFS: solving mazes, detecting cycles, ordering tasks with dependencies, finding connected components.
- BFS can use much more memory on wide graphs; DFS may follow a very long path before finding a nearby goal.
!: Forgetting to mark vertices as visited. In a graph with a cycle, the traversal loops forever.
EV: established | BFS and DFS each run in O(V + E) time using adjacency lists.
EV: established | In an unweighted graph, BFS discovers each vertex by a path with the fewest edges, so it finds shortest paths.
T: Breadth-first search | A traversal visiting all neighbours of a vertex before moving further away, using a queue
T: Depth-first search | A traversal following each branch as far as possible before backtracking, using a stack
T: Traversal | Visiting every vertex (or node) of a graph or tree in a systematic order
SUM: BFS uses a queue and explores level by level; DFS uses a stack and explores branch by branch.
SUM: BFS finds shortest unweighted paths; DFS suits mazes and dependency ordering.
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, sections 20.2 and 20.3 | secondary | 2022
SRC: AQA, A-level Computer Science 7517 specification, section 4.3.1 "Graph-traversal" | standard | 2015
Q: Which data structure does breadth-first search use? | A queue.
Q: Which traversal finds the shortest path in an unweighted graph? | Breadth-first search.
M1#computing-u04-13-q1@1: Which data structure supports depth-first search? | A stack | A queue | A hash table | A priority queue | DFS backtracks to the most recently visited vertex, which is last-in first-out: a stack (or recursion).
M2#computing-u04-13-q2@2: Graph edges: 1–2, 1–3, 2–4, 3–5. BFS from 1, neighbours in numerical order. What is the visiting order? | 1, 2, 3, 4, 5 | 1, 2, 4, 3, 5 | 1, 3, 5, 2, 4 | 1, 4, 5, 2, 3 | BFS visits 1, then its neighbours 2 and 3, then the next level: 4 (from 2) and 5 (from 3).
M2#computing-u04-13-q3@3: For the same graph (1–2, 1–3, 2–4, 3–5), what order does DFS from 1 give, neighbours in numerical order? | 1, 2, 4, 3, 5 | 1, 2, 3, 4, 5 | 1, 3, 5, 2, 4 | 1, 4, 2, 5, 3 | DFS follows 1 → 2 → 4 to the end, backtracks to 1, then 3 → 5.
TF1#computing-u04-13-q4@1: Without marking visited vertices, a traversal of a graph containing a cycle may never end. | true | The traversal would keep going round the cycle, revisiting the same vertices.
M3#computing-u04-13-q5@3: A social network wants to find whether two users are connected by at most three friendships. Which traversal is most suitable? | BFS, because it explores by distance and can stop after three levels | DFS, because it always finds the shortest path | Neither: graphs can't represent friendships | A binary search of the friends list | BFS reaches all users at distance 1, then 2, then 3, so it can stop at depth three; DFS might wander deep first.
SA3#computing-u04-13-q6@2,3: Compare breadth-first and depth-first search, including how each is implemented and one application suited to each. | BFS uses a queue: it visits the start, then all neighbours, then their neighbours, level by level, and finds shortest paths in unweighted graphs, as in finding the fewest train changes. DFS uses a stack or recursion: it follows one branch as deep as possible, then backtracks, which suits solving a maze or detecting cycles. Both are O(V + E). BFS can need a lot of memory for wide graphs; DFS can go deep away from a nearby goal. Both must mark visited vertices. | Describes BFS with a queue ; Describes DFS with a stack or recursion ; Gives a suitable BFS application ; Gives a suitable DFS application ; Notes complexity, memory or visited marking

## Dijkstra's shortest path algorithm
LV: A level · Application
S: Dijkstra's algorithm finds the shortest path from one vertex to every other vertex in a weighted graph with non-negative edge weights. It underlies route planning and network routing.
O: Describe the steps of Dijkstra's algorithm
O: Trace Dijkstra's algorithm on a small weighted graph, recording distances and previous vertices
O: Explain the algorithm's limitations, including negative weights, and where it is used
H: The algorithm
P: Edsger Dijkstra published the algorithm in 1959. It keeps a tentative **distance** for every vertex (0 for the start, infinity for the rest) and a set of **unvisited** vertices.
- Choose the unvisited vertex with the smallest distance and mark it visited: its distance is now final.
- For each of its unvisited neighbours, compute distance via this vertex; if it is smaller, update the neighbour's distance and record this vertex as its **previous** vertex.
- Repeat until every vertex is visited (or the target is).
- Follow the previous vertices backwards from the target to read off the path.
X: Edges: A–B 4, A–C 1, C–B 2, B–D 1, C–D 5. Start A.
> Start: A 0; B, C, D ∞. Visit A: B = 4 (via A), C = 1 (via A).
> Visit C (smallest, 1): B via C = 1 + 2 = 3 < 4, so B = 3 (via C); D = 1 + 5 = 6 (via C).
> Visit B (3): D via B = 3 + 1 = 4 < 6, so D = 4 (via B). Visit D.
> Shortest path to D: A → C → B → D, length 4, though A–B is a direct edge.
K: Dijkstra's algorithm always finalises the closest unvisited vertex next; with non-negative weights, that vertex's distance can't later be improved.
H: Limits and uses
P: With a priority queue (min-heap), the algorithm runs in O((V + E) log V). It fails with **negative** edge weights, because a later negative edge could shorten an already finalised distance; the Bellman–Ford algorithm handles those. It is used in satnav routing and in link-state routing protocols such as OSPF.
!: Stopping when the target is first discovered rather than when it is visited. A shorter route may still be found until the target becomes the smallest unvisited vertex.
EV: established | Dijkstra's algorithm correctly finds shortest paths in graphs with non-negative edge weights (Dijkstra, 1959).
EV: established | The OSPF routing protocol computes routes with a shortest-path-first calculation based on Dijkstra's algorithm.
T: Weighted graph | A graph whose edges carry values such as distances or costs
T: Dijkstra's algorithm | An algorithm that finds the shortest paths from one vertex to all others in a graph with non-negative weights
T: Priority queue | A queue in which the item with the highest priority (here, the smallest distance) is removed first
SUM: Dijkstra repeatedly finalises the nearest unvisited vertex and relaxes its neighbours' distances.
SUM: It needs non-negative weights and is used in route planning and network routing.
SRC: Dijkstra E. W., "A note on two problems in connexion with graphs", Numerische Mathematik 1, 269–271 | primary | 1959 | https://doi.org/10.1007/BF01386390
SRC: Moy J., RFC 2328: OSPF Version 2, IETF | standard | 1998 | https://www.rfc-editor.org/rfc/rfc2328
Q: What kind of edge weights does Dijkstra's algorithm require? | Non-negative weights.
Q: How is the path itself recovered at the end of Dijkstra's algorithm? | By following each vertex's recorded previous vertex back from the target to the start.
M1#computing-u04-14-q1@1: Which vertex does Dijkstra's algorithm visit next? | The unvisited vertex with the smallest tentative distance | The vertex with the most edges | The vertex added to the graph first | A random unvisited vertex | Choosing the nearest unvisited vertex is what guarantees its distance is final.
M2#computing-u04-14-q2@2: A vertex has tentative distance 9. Its neighbour, just visited with distance 4, connects to it with an edge of weight 3. What happens? | Its distance is updated to 7 | Its distance stays 9 | Its distance becomes 3 | Its distance becomes 13 | 4 + 3 = 7 is less than 9, so the shorter route replaces the old distance.
TF1#computing-u04-14-q3@3: Dijkstra's algorithm always gives correct shortest paths in graphs with negative edge weights. | false | A negative edge found later could shorten a distance already marked final; Bellman–Ford is used instead.
M3#computing-u04-14-q4@3: Edges: S–A 2, S–B 6, A–B 3, A–C 7, B–C 1. What is the shortest distance from S to C? | 6 | 8 | 9 | 7 | S → A → B → C costs 2 + 3 + 1 = 6, beating S → B → C (7) and S → A → C (9).
SA3#computing-u04-14-q5@2,3: Explain how Dijkstra's algorithm finds the shortest route in a road network, and evaluate its use for a satnav. | Each junction is a vertex and each road an edge weighted by distance or time. Set the start to 0 and others to infinity; repeatedly finalise the closest unvisited junction and update its neighbours if a shorter route via it is found, recording the previous junction; follow previous junctions back from the destination for the route. It is guaranteed optimal for non-negative weights, which travel times are. But on a continental road network it explores in every direction, so satnavs use faster variants such as A* search with a distance heuristic, or precomputed hierarchies. | Models roads as a weighted graph ; Describes initialisation ; Describes visiting the nearest and updating neighbours ; Explains recovering the route ; Evaluates performance and alternatives

## A* search
LV: A level · Application
S: A* search finds a shortest path from a start to a single goal, using a heuristic estimate of the remaining distance to explore the most promising vertices first. It is Dijkstra's algorithm guided towards the goal.
O: Explain the role of the cost so far g, the heuristic h and their sum f in A* search
O: Trace A* search on a small graph using a given heuristic
O: Evaluate A* search against Dijkstra's algorithm and explain what makes a heuristic admissible
H: Guided search
P: Published by Hart, Nilsson and Raphael in 1968, A* search gives each vertex a score f(n) = g(n) + h(n), where g(n) is the known cost from the start to n and h(n) is a **heuristic** estimate of the cost from n to the goal. It always expands the open vertex with the lowest f. With h = 0 everywhere, A* search behaves exactly like Dijkstra's algorithm.
E: f(n) = g(n) + h(n) :: total estimated cost of a path through n
P: A heuristic is **admissible** if it never overestimates the true remaining cost. With an admissible (and consistent) heuristic, A* search is guaranteed to find a shortest path. On a map, straight-line distance is admissible, because no road can be shorter than a straight line.
X: Start S, goal G. Edges: S–A 1, S–B 4, A–G 5, B–G 1. Heuristic h: S 4, A 5, B 1, G 0.
> Expand S. A: g = 1, f = 1 + 5 = 6. B: g = 4, f = 4 + 1 = 5.
> Lowest f is B (5): expand it. G via B: g = 5, f = 5 + 0 = 5.
> Lowest f is now G (5), lower than A (6): G is reached with cost 5.
> A was never expanded: the heuristic steered the search away from it.
K: A* search expands the vertex with the lowest g + h; a good admissible heuristic finds the same shortest path as Dijkstra's algorithm while exploring far fewer vertices.
H: Strengths and weaknesses
- Faster than Dijkstra's algorithm towards a single goal when the heuristic is informative.
- Optimal when the heuristic is admissible; an overestimating heuristic may find a worse path faster.
- Needs a sensible heuristic, which depends on the problem (straight-line distance, Manhattan distance on grids).
- Stores many open vertices, so memory can be a problem on huge graphs.
!: Using a heuristic that overestimates, such as road distance multiplied by 2. The search may finish quickly with a route that isn't the shortest.
EV: established | A* search with an admissible heuristic is guaranteed to find an optimal path (Hart, Nilsson and Raphael, 1968).
EV: established | A* search and its variants are widely used for pathfinding in video games and robotics.
T: A* search | A best-first search that expands the vertex with the lowest cost so far plus estimated cost to the goal
T: Heuristic function | An estimate of the cost from a vertex to the goal, used to guide the search
T: Admissible heuristic | A heuristic that never overestimates the true cost to reach the goal
SUM: A* search ranks vertices by f = g + h, combining known cost with an estimate of the rest.
SUM: With an admissible heuristic it finds a shortest path, usually exploring far less than Dijkstra.
SRC: Hart P. E., Nilsson N. J. and Raphael B., "A formal basis for the heuristic determination of minimum cost paths", IEEE Transactions on Systems Science and Cybernetics 4(2), 100–107 | primary | 1968 | https://doi.org/10.1109/TSSC.1968.300136
SRC: Russell S. and Norvig P., Artificial Intelligence: A Modern Approach, 4th edition, Pearson, section 3.5 | secondary | 2020
Q: In A* search, what do g(n) and h(n) stand for? | g(n) is the actual cost from the start to n; h(n) is the heuristic estimate of the cost from n to the goal.
Q: What makes a heuristic admissible? | It never overestimates the true remaining cost to the goal.
M1#computing-u04-15-q1@1: Which vertex does A* search expand next? | The open vertex with the lowest g + h | The open vertex with the lowest h only | The vertex with the most neighbours | The vertex discovered first | A* search combines the cost so far with the estimate to the goal and expands the lowest total.
M2#computing-u04-15-q2@2: A vertex has cost so far 7 and heuristic 4; another has cost so far 5 and heuristic 8. Which is expanded first? | The first, with f = 11 | The second, with f = 13 | The second, because its cost so far is lower | The first, because its heuristic is lower | f = 7 + 4 = 11 and 5 + 8 = 13; the lower f is expanded first.
TF1#computing-u04-15-q3@3: If the heuristic is 0 for every vertex, A* search behaves like Dijkstra's algorithm. | true | With h = 0, f equals g, so vertices are expanded in order of their cost from the start.
M3#computing-u04-15-q4@3: A game uses straight-line distance as its heuristic for a character walking on roads. Why does A* search still find the shortest route? | Straight-line distance never exceeds the real road distance, so the heuristic is admissible | Straight-line distance always equals road distance exactly | Games don't need shortest routes, so any route counts | A* search ignores the heuristic once it nears the goal | Admissibility, never overestimating, is what guarantees optimality.
SA3#computing-u04-15-q5@2,3: Compare A* search with Dijkstra's algorithm for finding a route between two cities. | Dijkstra's algorithm expands vertices in order of distance from the start in every direction, so it explores a large circle before reaching the destination; it finds shortest paths to all vertices. A* search adds a heuristic estimate of the remaining distance, such as straight-line distance, and expands the lowest g + h, so it heads towards the destination and explores far fewer vertices. Both are optimal if weights are non-negative and the A* heuristic is admissible. A* search needs a good heuristic and suits one target; Dijkstra suits finding routes to every vertex. | Describes Dijkstra exploring in all directions ; Describes A* using g + h ; Explains fewer vertices explored ; States the admissibility condition ; Judges when each is better

## Divide and conquer
LV: A level · Application
S: Divide and conquer solves a problem by splitting it into smaller independent sub-problems of the same type, solving them (often recursively) and combining their solutions. It is behind binary search, merge sort and quicksort.
O: Describe the divide, conquer and combine steps of the strategy
O: Identify divide and conquer in binary search, merge sort and quicksort
O: Explain why halving a problem leads to logarithmic factors in complexity
H: Divide, conquer, combine
- **Divide** the problem into smaller sub-problems of the same kind.
- **Conquer** each sub-problem, recursively, until it is small enough to solve directly.
- **Combine** the sub-solutions into a solution for the whole problem.
P: Binary search divides and discards one half, so it has nothing to combine. Merge sort divides trivially and does its work combining (merging). Quicksort does its work dividing (partitioning) and needs no combining.
X: Find the maximum of [3, 9, 2, 7] by divide and conquer.
> Divide: [3, 9] and [2, 7].
> Conquer: max of [3, 9] is 9 (from [3] and [9]); max of [2, 7] is 7.
> Combine: max(9, 7) = 9.
> This is O(n), the same as a loop; divide and conquer pays off when combining is cheap and halving saves work, as in sorting.
K: Halving a problem repeatedly gives log_{2} n levels; if each level costs O(n) the total is O(n log n), and if each level costs O(1), as in binary search, the total is O(log n).
H: Strengths and limits
P: Divide and conquer leads to efficient algorithms, and its sub-problems are independent, so they can be solved in parallel on several cores. But recursion adds overhead and stack use, and if sub-problems overlap (the same sub-problem appears many times) plain divide and conquer repeats work; dynamic programming is then better.
!: Applying divide and conquer to problems whose sub-problems overlap, such as naive recursive Fibonacci. The same sub-problems are solved again and again.
EV: established | Many of the fastest known algorithms (merge sort, quicksort, fast Fourier transform, Karatsuba multiplication) use divide and conquer.
EV: established | The master theorem gives the time complexity of many divide-and-conquer recurrences, such as T(n) = 2T(n/2) + n, which solves to O(n log n).
T: Divide and conquer | A strategy that splits a problem into smaller independent sub-problems, solves them and combines the results
T: Sub-problem | A smaller instance of the original problem
T: Recurrence relation | An equation expressing an algorithm's running time in terms of its running time on smaller inputs
SUM: Divide and conquer splits, solves sub-problems recursively, and combines.
SUM: Binary search, merge sort and quicksort use it; overlapping sub-problems call for dynamic programming.
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, chapter 4 "Divide-and-Conquer" | secondary | 2022
SRC: Karatsuba A. and Ofman Y., "Multiplication of many-digital numbers by automatic computers", Proceedings of the USSR Academy of Sciences 145, 293–294 | primary | 1962
Q: What are the three steps of divide and conquer? | Divide the problem into sub-problems, conquer (solve) them, and combine their solutions.
Q: Why is divide and conquer suited to parallel processing? | Its sub-problems are independent, so different cores can solve them at the same time.
M1#computing-u04-16-q1@1: Which algorithm is not an example of divide and conquer? | Linear search | Merge sort | Binary search | Quicksort | Linear search checks items one by one without splitting the problem.
M2#computing-u04-16-q2@2: In merge sort, which step does most of the work? | Combining sorted halves by merging | Dividing the list into halves | Choosing a pivot | Discarding half of the list | Splitting is trivial; all the comparisons that order the items happen while merging.
TF1#computing-u04-16-q3@3: Divide and conquer is efficient for naive recursive Fibonacci because it splits the problem into two parts. | false | The sub-problems overlap heavily, so the same values are recomputed exponentially many times.
M3#computing-u04-16-q4@3: A divide-and-conquer algorithm halves its input and does O(n) work at each level. What is its complexity? | O(n log n) | O(log n) | O(n^{2}) | O(n) | There are about log_{2} n levels of halving, each costing O(n), giving O(n log n).
SA3#computing-u04-16-q5@2,3: Explain how merge sort and binary search each use divide and conquer, and why their complexities differ. | Binary search divides the sorted list at the middle and conquers only one half, discarding the other, with nothing to combine: O(1) work per level over log n levels gives O(log n). Merge sort divides into halves and conquers both, then combines by merging, which costs O(n) per level over log n levels, giving O(n log n). The difference comes from merge sort solving both halves and paying for combining. | Describes binary search's divide and discard ; States O(log n) with reason ; Describes merge sort's divide and combine ; States O(n log n) with reason ; Explains the source of the difference

## Greedy algorithms
LV: A level · Application
S: A greedy algorithm builds a solution step by step, always taking the choice that looks best right now. It is fast and simple, and for some problems provably optimal, but for others it gives poor answers.
O: Describe the greedy strategy and give examples of greedy algorithms
O: Apply a greedy algorithm, such as making change, and test whether it gives the optimal answer
O: Evaluate when a greedy algorithm is guaranteed to be optimal and when it is only a heuristic
H: Best choice now
P: A **greedy algorithm** makes the locally best choice at each step and never reconsiders it. Dijkstra's algorithm (always finalise the nearest vertex), Prim's and Kruskal's algorithms for minimum spanning trees and Huffman coding are greedy and provably optimal. For many other problems, greedy is only a heuristic.
X: Make 30p using the fewest coins.
> UK coins (1, 2, 5, 10, 20, 50): take the largest coin that fits: 20, then 10. Two coins, which is optimal.
> Imaginary coins (1, 15, 25): greedy takes 25, then five 1s: six coins.
> But 15 + 15 uses only two coins. Greedy failed.
> UK coins happen to have a structure for which greedy is always optimal; arbitrary coin systems need dynamic programming.
K: A greedy algorithm is only guaranteed optimal when the problem has the greedy-choice property: a locally best choice is always part of some best overall solution.
H: Uses and limits
- **Strengths**: simple, fast (often O(n log n) after sorting), little memory.
- **Optimal for**: shortest paths with non-negative weights, minimum spanning trees, Huffman codes, activity selection by earliest finish time.
- **Heuristic for**: travelling salesman (nearest neighbour), knapsack with indivisible items, timetabling.
- To trust a greedy algorithm, prove it is optimal or test it against an exact method on small cases.
P: Huffman coding (School 6) is a good example of a greedy algorithm that is provably optimal: it repeatedly merges the two least frequent symbols, and this locally best choice always leads to the shortest possible prefix code.
!: Assuming a greedy algorithm is optimal because it works on a few examples. The coin example works for many amounts before failing at 30.
EV: established | Greedy algorithms are optimal for problems with the greedy-choice property and optimal substructure, such as minimum spanning trees and Huffman coding.
EV: established | The nearest-neighbour heuristic for the travelling salesman problem can produce tours much longer than the optimum.
T: Greedy algorithm | An algorithm that makes the locally best choice at each step without reconsidering earlier choices
T: Greedy-choice property | The property that a locally optimal choice is always part of a globally optimal solution
T: Optimal solution | The best possible solution to a problem, such as the shortest route or fewest coins
SUM: Greedy algorithms take the best-looking choice at each step and never backtrack.
SUM: They are optimal for some problems (Dijkstra, Huffman, spanning trees) and only heuristics for others.
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, chapter 15 "Greedy Algorithms" | secondary | 2022
SRC: Kleinberg J. and Tardos É., Algorithm Design, Pearson, chapter 4 | secondary | 2006
Q: What does a greedy algorithm do at each step? | Takes the choice that looks best at that moment, without reconsidering earlier choices.
Q: Name a greedy algorithm that is guaranteed to be optimal. | Dijkstra's algorithm (non-negative weights), Kruskal's or Prim's algorithm, or Huffman coding.
M1#computing-u04-17-q1@1: What characterises a greedy algorithm? | It makes the locally best choice at each step | It tries every possible solution | It splits the problem into halves | It stores every sub-problem's answer in a table | Greedy means choosing what looks best now, with no backtracking.
M2#computing-u04-17-q2@2: Using greedy change-making with coins 1, 4 and 6, how many coins are given for 8? | 3 | 2 | 4 | 1 | Greedy takes 6, then 1 and 1: three coins. The optimum is 4 + 4, two coins.
TF1#computing-u04-17-q3@2: A greedy algorithm always finds the optimal solution if it finds one quickly. | false | Speed says nothing about optimality; greedy is only guaranteed optimal for problems with the greedy-choice property.
M3#computing-u04-17-q4@3: A delivery driver always drives to the nearest unvisited address next. What is the main weakness of this greedy approach? | It can leave distant addresses until last, giving a much longer total route | It always finds the shortest possible route but is slow | It can't visit more than ten addresses | It requires the addresses to be sorted alphabetically | Nearest neighbour is a heuristic for the travelling salesman problem; local choices can force long return trips.
SA3#computing-u04-17-q5@2,3: Evaluate the use of a greedy algorithm to choose which talks to attend at a conference, to attend as many as possible. | Sort talks by finishing time; repeatedly choose the talk that finishes earliest and doesn't overlap the last one chosen. This is the activity-selection problem, which has the greedy-choice property: choosing the earliest finish always leaves the most time for the rest, so the algorithm is provably optimal, and it runs in O(n log n) because of sorting. Choosing the shortest talk or the earliest start instead is also greedy but not optimal. So greedy works here only with the right choice rule. | Describes the earliest-finish rule ; States it is optimal with a reason ; Gives the complexity ; Notes other greedy rules fail ; Reaches a judgement about the choice rule

## Dynamic programming
LV: A level · Evaluation
S: Dynamic programming solves problems with overlapping sub-problems by solving each sub-problem once and storing the result. It turns many exponential-time recursive solutions into polynomial-time ones.
O: Identify overlapping sub-problems and optimal substructure in a problem
O: Solve a problem with memoisation (top-down) or tabulation (bottom-up)
O: Evaluate dynamic programming against greedy and plain recursive approaches
H: Solve each sub-problem once
P: **Dynamic programming** (Richard Bellman, 1950s) applies when a problem has **optimal substructure** (an optimal solution is built from optimal solutions to sub-problems) and **overlapping sub-problems** (the same sub-problems recur). Each sub-problem is solved once and its answer stored.
- **Top-down (memoisation)**: write the natural recursion and cache each result.
- **Bottom-up (tabulation)**: fill a table from the smallest sub-problems upwards with a loop.
X: Fewest coins to make 8 with coins 1, 4 and 6, bottom-up.
> best[0] = 0. For each amount a from 1 to 8, best[a] = 1 + the minimum of best[a − c] for each coin c ≤ a.
> best[1..3] = 1, 2, 3 (ones). best[4] = 1. best[5] = 2. best[6] = 1. best[7] = 2 (6 + 1).
> best[8] = 1 + min(best[7], best[4], best[2]) = 1 + min(2, 1, 2) = 2.
> Answer: 2 coins (4 + 4), which greedy (6 + 1 + 1) missed. Time O(amount × coins).
K: Dynamic programming stores answers to overlapping sub-problems, trading memory for a large saving in time, and finds optimal answers where greedy choices fail.
H: Where it is used
P: Classic uses include the knapsack problem, edit distance (spell checkers and DNA comparison), longest common subsequence (the diff tool), and shortest paths in graphs with negative edges (Bellman–Ford). The cost is memory for the table, and the hard part is defining the sub-problems and the recurrence that links them.
!: Using dynamic programming when sub-problems don't overlap. In merge sort each sub-list is sorted once, so storing results gains nothing.
EV: established | Dynamic programming, named by Richard Bellman, solves problems with optimal substructure and overlapping sub-problems in polynomial time where naive recursion is exponential.
EV: established | The 0/1 knapsack problem is NP-hard in general; dynamic programming solves it in time proportional to the number of items times the capacity, which is practical only for modest capacities.
T: Dynamic programming | Solving a problem by combining solutions to overlapping sub-problems, each solved once and stored
T: Tabulation | Bottom-up dynamic programming: filling a table from the smallest sub-problems upwards
T: Optimal substructure | The property that an optimal solution contains optimal solutions to its sub-problems
SUM: Dynamic programming stores the answers to overlapping sub-problems, top-down or bottom-up.
SUM: It finds optimal answers where greedy fails, at the cost of memory.
SRC: Bellman R., Dynamic Programming, Princeton University Press | primary | 1957
SRC: Cormen T. H., Leiserson C. E., Rivest R. L. and Stein C., Introduction to Algorithms, 4th edition, MIT Press, chapter 14 "Dynamic Programming" | secondary | 2022
Q: What two properties make a problem suitable for dynamic programming? | Optimal substructure and overlapping sub-problems.
Q: What is the difference between memoisation and tabulation? | Memoisation is top-down recursion with cached results; tabulation fills a table bottom-up with loops.
M1#computing-u04-18-q1@1: What does dynamic programming store? | The answers to sub-problems, so each is solved only once | Every line of the program in a table | The original input in reverse order | Only the final answer | Storing sub-problem results avoids recomputing them when they recur.
M2#computing-u04-18-q2@2: Bottom-up, F(0) = 0, F(1) = 1 and F(n) = F(n − 1) + F(n − 2). What is F(7)? | 13 | 8 | 21 | 7 | The table fills 0, 1, 1, 2, 3, 5, 8, 13, so F(7) = 13, with each value computed once.
TF1#computing-u04-18-q3@1: Dynamic programming is useful only when sub-problems overlap. | true | If each sub-problem occurs once, storing its answer saves nothing; plain divide and conquer suffices.
M3#computing-u04-18-q4@3: Why does dynamic programming find the fewest coins for 8 with coins 1, 4 and 6 when greedy doesn't? | It considers every coin as the last coin for every amount, using stored best answers | It always picks the largest coin first | It tries amounts in random order until one works | It uses fewer kinds of coin than greedy | By comparing all options for each amount using optimal sub-answers, it can't be misled by a locally attractive choice.
SA3#computing-u04-18-q5@2,3: Explain how dynamic programming improves on naive recursion for Fibonacci numbers, and evaluate top-down and bottom-up approaches. | Naive recursion recomputes the same values: fib(n − 2) is computed by both fib(n) and fib(n − 1), giving exponential time. Dynamic programming solves each fib(k) once. Top-down memoisation keeps the natural recursive code and caches results, but still uses O(n) stack and may hit the recursion limit. Bottom-up tabulation loops from fib(0) upwards, needs no recursion and can keep only the last two values for O(1) memory. Both take O(n) time; bottom-up is usually more efficient, top-down easier to write from the definition. | Explains repeated sub-problems in naive recursion ; States the exponential to linear improvement ; Describes memoisation with its stack cost ; Describes tabulation with memory saving ; Reaches a judgement between them

## Backtracking
LV: A level · Application
S: Backtracking builds a solution one choice at a time, and as soon as a partial solution can't lead to a valid answer it undoes the last choice and tries another. It solves puzzles, mazes and constraint problems.
O: Describe the backtracking strategy and how it uses depth-first search
O: Trace backtracking on a small constraint problem such as N-Queens or a maze
O: Evaluate backtracking's efficiency and how pruning improves it
H: Try, check, undo
P: **Backtracking** explores the tree of possible choices depth-first. At each step it makes a choice and checks whether the partial solution still satisfies the constraints. If it does, it continues to the next choice; if it doesn't, or a dead end is reached, it **backtracks**: undoes the last choice and tries the next option. Recursion makes this natural, because returning from a call undoes a choice.
X: Place 4 queens on a 4 × 4 board so that none attack each other, one per row.
> Row 1: column 1. Row 2: columns 1 and 2 are attacked, try column 3. Row 3: every column attacked, so backtrack.
> Row 2: column 4. Row 3: column 2. Row 4: every column attacked, so backtrack, and backtrack again to row 1.
> Row 1: column 2. Row 2: column 4. Row 3: column 1. Row 4: column 3. Solution found.
> Whole branches were abandoned as soon as a conflict appeared, rather than testing all 256 placements.
K: Backtracking abandons a partial solution as soon as it breaks a constraint (pruning), so it explores far fewer possibilities than brute force, though its worst case is still exponential.
H: Uses and efficiency
- Used for Sudoku, crosswords, maze solving, the N-Queens problem, timetabling and parsing.
- Worst case: exponential, because the tree of choices grows exponentially.
- **Pruning** early and choosing the most constrained choice first (such as the Sudoku cell with fewest options) cut the search dramatically.
- It finds all solutions, or stops at the first, as required.
P: In code, backtracking is usually a recursive function: it loops over the options for the next choice, makes one, checks the constraints, calls itself for the next step, and on return undoes the choice before trying the next option.
!: Checking constraints only when a full solution is built. That is brute force; backtracking's power comes from rejecting partial solutions early.
EV: established | Backtracking is a standard technique for constraint satisfaction problems, described by Knuth among others, and is exponential in the worst case.
EV: established | The 8-queens puzzle has 92 solutions, found easily by backtracking although there are over 4 billion ways to place eight queens on 64 squares.
T: Backtracking | A depth-first search of possible choices that undoes a choice as soon as it can't lead to a valid solution
T: Pruning | Abandoning a branch of the search as soon as it can't lead to a valid solution
T: Constraint | A rule that a valid solution must satisfy, such as no two queens attacking each other
SUM: Backtracking makes choices depth-first, checks constraints and undoes choices at dead ends.
SUM: Early pruning makes it practical, though the worst case is exponential.
SRC: Knuth D. E., The Art of Computer Programming, Volume 4, Fascicle 5: Mathematical Preliminaries Redux; Introduction to Backtracking; Dancing Links, Addison-Wesley | secondary | 2019
SRC: Russell S. and Norvig P., Artificial Intelligence: A Modern Approach, 4th edition, Pearson, chapter 6 "Constraint Satisfaction Problems" | secondary | 2020
Q: What does an algorithm do when it backtracks? | Undoes its most recent choice and tries the next available option.
Q: Which traversal does backtracking use to explore choices? | Depth-first search.
M1#computing-u04-19-q1@1: When does a backtracking algorithm undo a choice? | When the partial solution breaks a constraint or reaches a dead end | After every single choice, whether valid or not | Only when the whole search has finished | When it finds the first valid solution | Backtracking retreats only when continuing can't lead to a valid solution.
M2#computing-u04-19-q2@2: A maze solver reaches a dead end at a junction it reached by turning left. What does backtracking do next? | Return to the junction and try a different, untried direction | Start again from the entrance of the maze | Turn left again at the dead end | Stop and report that the maze has no exit | Backtracking undoes the last choice and tries the next option from the most recent junction.
TF1#computing-u04-19-q3@3: Backtracking is guaranteed to run in polynomial time because it prunes invalid branches. | false | Pruning helps greatly in practice, but in the worst case the number of partial solutions explored is still exponential.
M3#computing-u04-19-q4@3: Why do Sudoku solvers fill the empty cell with the fewest possible digits first? | It causes contradictions to appear early, pruning more of the search | It ensures the solver never has to backtrack | It sorts the grid into numerical order | It makes the puzzle have only one solution | Choosing the most constrained cell keeps branching small and exposes dead ends sooner.
SA3#computing-u04-19-q5@2,3: Explain how backtracking solves a Sudoku puzzle and compare it with a brute-force approach. | Pick an empty cell, try a digit that doesn't already appear in its row, column or box, and move to the next cell recursively. If a cell has no valid digit, undo the previous choice and try its next digit. Brute force would fill all empty cells with every combination and check each full grid, about 9^{k} grids for k empty cells, impossibly many. Backtracking checks constraints at each step and abandons a partial grid as soon as it fails, so it explores a tiny fraction; choosing the most constrained cell first improves it further. Its worst case remains exponential. | Describes trying valid digits cell by cell ; Describes undoing on a dead end ; Describes brute force and its size ; Explains pruning saves work ; Notes worst case or the constrained-first improvement
`;
