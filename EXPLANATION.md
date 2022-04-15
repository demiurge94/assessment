# Running and Installing:
Compile using `tsc` on the console or just run with `yarn start`. 
---
# General thought process: 
I used a basic `TreeNode` class to create the tree, along with recursive functions to traverse the tree when adding, removing and 
searching for employees and their subordinates. The TreeNode class consists of an employee object and an array of TreeNodes to 
store the subordinates. 
Initially, I basically wrote an `addSubordinate` function which doubled as an insert function when running `hireEmployee` and
a `deleteEmployee` function in the `TreeNode` class. It was my initial approach but I decided on rewriting it to use the function
templates provided. 

The two functions that we can merge are `promoteEmployee` and `demoteEmployee`. I actually merged them by creating a 
function in the class `TreeNode` that swapped employee. I defaulted to this approach because I noticed that every time you run either function you are both promoting and demoting someone. Therefore, it seemed easier to just make a function that would swap employees, searching first for the *demotee* since they would always come first in the heirarchy. 
If I had more time, I would implement a DFS algorithm to find the lowest employee. I would also try to improve the time complexity of my functions to O(nlog(n)). 

# Time Complexities 
The time complexities of my functions, except `fireEmployee` is O(n), since we traverse the tree once. For `fireEmployee` I'm not entirely sure if the time complexity is the same given that I filter through the subordinate array twice. 