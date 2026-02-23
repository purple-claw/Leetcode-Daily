---
title: "Longest Substring Without Repeating Characters"
number: 3
difficulty: "Medium"
tags: ["Hash Table", "String", "Sliding Window"]
date: "2024-01-03"
url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/"
---

# 3. Longest Substring Without Repeating Characters

## Problem

Given a string `s`, find the length of the **longest substring** without repeating characters.

**Example 1:**
```
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with length 3.
```

**Example 2:**
```
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with length 1.
```

**Constraints:**
- `0 <= s.length <= 5 * 10^4`
- `s` consists of English letters, digits, symbols and spaces.

## Approach

### Sliding Window

Maintain a window `[left, right]` that contains no duplicate characters:

1. Expand `right` one character at a time.
2. If `s[right]` is already in the window, shrink from `left` until the duplicate is removed.
3. Track the maximum window size seen.

Using a hash map (`char → last seen index`) lets us jump `left` directly past the duplicate instead of stepping one at a time.

## Solution

```python
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_index = {}
        left = 0
        max_len = 0

        for right, char in enumerate(s):
            if char in char_index and char_index[char] >= left:
                left = char_index[char] + 1
            char_index[char] = right
            max_len = max(max_len, right - left + 1)

        return max_len
```

## Complexity

| | Time | Space |
|---|---|---|
| Sliding Window | O(n) | O(min(n, m)) |

where m is the size of the character set.

## Notes

- The condition `char_index[char] >= left` ensures we only jump `left` forward, never backward.
- This handles cases like `"abba"` correctly.
