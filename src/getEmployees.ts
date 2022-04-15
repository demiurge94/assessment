import { TreeNode } from "./manageEmployees";


/**
 * Given an employee, will find the node above (if any).
 * 
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode}
 */
export function getBoss(tree: TreeNode, employeeName: string): TreeNode {
    let employeeNode: TreeNode = findHelper(tree, employeeName); 
    let returnNode: TreeNode = findHelper(tree, employeeNode.value.boss); 
    console.log("[getBoss]: " + employeeName + "'s boss is " + returnNode.value.name); 
    return returnNode;
}

/**
 * Given an employee, will find the nodes directly below (if any).
 * Notice how it returns possibly several subordinates.
 * 
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode[]}
 */
export function getSubordinates(tree: TreeNode, employeeName: string): TreeNode[] {
    let empSubordinates = new TreeNode(null); 
    empSubordinates = findHelper(tree, employeeName); 
    let subOrdinateList: string = ""; 
    for(let i = 0; i < empSubordinates.subordinates.length; i++){
        subOrdinateList += empSubordinates.subordinates[i].value.name; 
        if( i < empSubordinates.subordinates.length-1){
            subOrdinateList+=", "; 
        }
    }
    console.log("[getSubordinates]: " + employeeName + "'s subordinates are " + subOrdinateList )
    return empSubordinates.subordinates; 
}

/**
 * EXTRA CREDIT:
 * Finds and returns the lowest-ranking employee and the tree node's depth index.
 * 
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {TreeNode}
 */
function findLowestEmployee() {

}

/* Helper functions*/
export function findHelper(node:TreeNode, stringToFind: string):TreeNode{
    if(node.value.name == stringToFind){
        return node;
    }
    for(let i in node.subordinates){
        let result:TreeNode = findHelper(node.subordinates[i], stringToFind);
        if(result != null){
            return result; 
        }
    }
    return null; 
}