---
title: "Add Two Numbers"
number: 2
difficulty: "Medium"
tags: ["Linked List", "Math", "Recursion"]
date: "2024-01-02"
url: "https://leetcode.com/problems/add-two-numbers/"
---

# 2. Add Two Numbers

## Problem

You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

**Example:**
```
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.
```

**Constraints:**
- The number of nodes in each linked list is in the range `[1, 100]`.
- `0 <= Node.val <= 9`
- It is guaranteed that the list represents a number that does not have leading zeros.

## Approach

Simulate the grade-school addition algorithm digit by digit:

1. Traverse both lists simultaneously.
2. Maintain a `carry` variable.
3. At each step: `total = l1.val + l2.val + carry`
4. New node value = `total % 10`, new carry = `total // 10`.
5. Continue until both lists are exhausted **and** carry is 0.

## Solution

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        dummy = ListNode(0)
        current = dummy
        carry = 0

        while l1 or l2 or carry:
            val1 = l1.val if l1 else 0
            val2 = l2.val if l2 else 0

            total = val1 + val2 + carry
            carry = total // 10
            current.next = ListNode(total % 10)
            current = current.next

            if l1:
                l1 = l1.next
            if l2:
                l2 = l2.next

        return dummy.next
```

## Complexity

| | Time | Space |
|---|---|---|
| Solution | O(max(m, n)) | O(max(m, n)) |

where m and n are the lengths of the two linked lists.

## Notes

- The dummy head node simplifies edge-case handling.
- Don't forget the final carry — e.g., `[5] + [5]` should give `[0, 1]`.
