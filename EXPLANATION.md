# Running and Installing
Compile using `tsc` on the console and run with `yarn start`. 
---
# General thought process: 
I used a basic TreeNode class to create the tree, along with recursive functions to traverse the tree when adding, removing and 
searching for employees and their subordinates. The TreeNode class consists of an employee object and an array of TreeNodes to 
store the subordinates. 
Initially, I basically wrote an addSubordinate function which doubled as an insert function when running `hireEmployee` and
a deleteEmployee function in the TreeNode class. It was my initial approach but I decided on rewriting it to use the function
templates provided. 

The two functions that we can merge are `promoteEmployee` and `demoteEmployee`. I actually merged them by creating a 
function in the class `TreeNode` that swapped employee. I defaulted to this approach because it seemed more trivial since
everytime you run either function, you are demoting someone. You also promote someone but the demotion caught my eye since you 
will always run across the person you are demoting first when traversing the tree, as they are higher up. 

If I had more time, I would implement a DFS algorithm to find the lowest employee. I would also try to improve the time complexity of my functions to O(nlog(n)). 

# Time Complexities 
The time complexities of my functions, except `fireEmployee` is O(n). For `fireEmployee` I'm not entirely sure if the time complexity is the same given that I filter through the subordinate array twice. 