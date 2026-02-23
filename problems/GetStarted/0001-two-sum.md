---
title: "Two Sum"
number: 1
difficulty: "Easy"
tags: ["Array", "Hash Table"]
date: "2024-01-01"
url: "https://leetcode.com/problems/two-sum/"
---

# 1. Two Sum

## Problem

Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.

**Example 1:**
```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
```

**Example 2:**
```
Input: nums = [3,2,4], target = 6
Output: [1,2]
```

**Constraints:**
- `2 <= nums.length <= 10^4`
- `-10^9 <= nums[i] <= 10^9`
- `-10^9 <= target <= 10^9`
- Only one valid answer exists.

## Approach

### Brute Force — O(n²)

Check every pair of elements. Not optimal.

### Optimal — Hash Map — O(n)

For each element, check if `target - element` already exists in a hash map. If it does, we found our pair. Otherwise, store the element and its index.

**Key Insight:** We only need a single pass because we're looking backwards into the hash map.

## Solution

```python
class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []
```

## Complexity

| | Time | Space |
|---|---|---|
| Brute Force | O(n²) | O(1) |
| Hash Map | O(n) | O(n) |

## Notes

- `seen` maps each value to its index.
- We check **before** inserting so we never use the same index twice.
