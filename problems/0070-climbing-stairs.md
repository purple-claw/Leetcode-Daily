---
title: "Climbing Stairs"
number: 70
difficulty: "Easy"
tags: ["Math", "Dynamic Programming", "Memoization"]
date: "2024-01-10"
url: "https://leetcode.com/problems/climbing-stairs/"
---

# 70. Climbing Stairs

## Problem

You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

**Example 1:**
```
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
```

**Example 2:**
```
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
```

**Constraints:**
- `1 <= n <= 45`

## Approach

This is the **Fibonacci sequence** in disguise.

- To reach step `n`, you came from step `n-1` (1 step) or step `n-2` (2 steps).
- So `ways(n) = ways(n-1) + ways(n-2)` with `ways(1) = 1`, `ways(2) = 2`.

We can solve this in O(n) time and O(1) space using two variables.

## Solution

```python
class Solution:
    def climbStairs(self, n: int) -> int:
        if n <= 2:
            return n
        prev2, prev1 = 1, 2
        for _ in range(3, n + 1):
            prev2, prev1 = prev1, prev1 + prev2
        return prev1
```

## Complexity

| | Time | Space |
|---|---|---|
| DP (iterative) | O(n) | O(1) |
| DP (memoization) | O(n) | O(n) |

## Notes

- This is LeetCode's classic intro to DP — recognize the recurrence relation.
- The Fibonacci approach avoids the exponential recursion tree.
