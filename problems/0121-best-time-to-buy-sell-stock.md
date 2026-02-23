---
title: "Best Time to Buy and Sell Stock"
number: 121
difficulty: "Easy"
tags: ["Array", "Dynamic Programming"]
date: "2024-01-15"
url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
---

# 121. Best Time to Buy and Sell Stock

## Problem

You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`-th day. You want to maximize your profit by choosing a **single day** to buy and a **different day in the future** to sell.

Return the maximum profit you can achieve. If you cannot achieve any profit, return `0`.

**Example 1:**
```
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price=1) and sell on day 5 (price=6), profit = 6-1 = 5.
```

**Example 2:**
```
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: No profitable transaction is possible.
```

**Constraints:**
- `1 <= prices.length <= 10^5`
- `0 <= prices[i] <= 10^4`

## Approach

Single pass: track the **minimum price seen so far** and the **maximum profit** we could make if we sold today.

At each day:
- Update `min_price` if today's price is lower.
- Update `max_profit` if `current_price - min_price` is larger.

## Solution

```python
class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        min_price = float('inf')
        max_profit = 0

        for price in prices:
            if price < min_price:
                min_price = price
            elif price - min_price > max_profit:
                max_profit = price - min_price

        return max_profit
```

## Complexity

| | Time | Space |
|---|---|---|
| Single Pass | O(n) | O(1) |

## Notes

- We must buy **before** selling — enforced naturally since we track the minimum price seen so far (always in the past).
- When prices are strictly decreasing, `max_profit` stays at `0` — we return `0` as required.
