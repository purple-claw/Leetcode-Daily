---
title: "Merge Intervals"
number: 56
difficulty: "Medium"
tags: ["Array", "Sorting"]
date: "2024-01-20"
url: "https://leetcode.com/problems/merge-intervals/"
---

# 56. Merge Intervals

## Problem

Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

**Example 1:**
```
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
```

**Example 2:**
```
Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
```

**Constraints:**
- `1 <= intervals.length <= 10^4`
- `intervals[i].length == 2`
- `0 <= start_i <= end_i <= 10^4`

## Approach

1. Sort intervals by their start times.
2. Iterate through the sorted list. For each interval:
   - If it overlaps with the last merged interval (i.e., `start <= merged[-1][1]`), extend the end: `merged[-1][1] = max(merged[-1][1], end)`.
   - Otherwise, append it as a new interval.

## Solution

```python
class Solution:
    def merge(self, intervals: list[list[int]]) -> list[list[int]]:
        intervals.sort(key=lambda x: x[0])
        merged = []

        for start, end in intervals:
            if merged and start <= merged[-1][1]:
                merged[-1][1] = max(merged[-1][1], end)
            else:
                merged.append([start, end])

        return merged
```

## Complexity

| | Time | Space |
|---|---|---|
| Sort + Merge | O(n log n) | O(n) |

## Notes

- Sorting is the key step — after sorting by start, overlapping intervals are always adjacent.
- Use `max` when extending the end to handle fully-contained intervals like `[[1,10],[2,3]]`.
