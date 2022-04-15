import data from './employees.json'
import { findHelper, getBoss } from './getEmployees';
export {findHelper } from './getEmployees'
export interface employee{
    name: string; 
    jobTitle: string;
    boss: string;
    salary: string;
}
export class TreeNode {
    value: employee; 
    subordinates: TreeNode[]; 
    
    constructor(value: employee){
        this.value = value; 
        this.subordinates = []; 
    }
    public swapEmployee(employeeToPromote: string, employeeToDemote: string){
        //traverse the tree again... 
        let temp: TreeNode;
        if(this.value.name == employeeToDemote){
            this.value.name = employeeToPromote; 
            for(let i in this.subordinates){
                if(this.subordinates[i].value.name == employeeToPromote){
                    this.subordinates[i].value.name = employeeToDemote;
                    this.subordinates[i].value.boss = employeeToPromote; 
                }
                else{
                    //else: the subordinate isn't the one getting promoted
                    this.subordinates[i].value.boss = employeeToPromote; 
                }
            }
        }
        else{
            for(let i of this.subordinates){
                i.swapEmployee(employeeToPromote, employeeToDemote); 
            }
        }
    }

} //treenode class 


/**
 * Normalizes the provided JSON file and generates a tree of employees.
 *
 * @param {Object[]} employees array of employees
 * @returns {TreeNode}
 */
export function generateCompanyStructure(employees: employee[]): TreeNode {
    let newEmployeeArray = fixEmployeeName(employees); 
    console.log("Generating employee tree..."); 
    let returnNode = new TreeNode(null); 
   for(let i in employees){
        if(returnNode.value == null){
            returnNode = new TreeNode(employees[i]); 
        }
        else{
            generateCompanyStructureHelper(returnNode, employees[i]);
                
        }

    }
    return returnNode;
    
}

/**
 * Adds a new employee to the team and places them under a specified boss.
 *
 * @param {TreeNode} tree
 * @param {Object} newEmployee
 * @param {string} bossName
 * @returns {void}
 */
export function hireEmployee(tree: TreeNode, newEmployee: employee, bossName: string) { //"insert"
    newEmployee.boss = bossName; 
    if(tree.value.name == bossName){
        let t = new TreeNode(newEmployee); 
        tree.subordinates.push(t); 
        console.log("[hireEmployee]: Added new employee (" + t.value.name + ") " + " with " + t.value.boss + " as their boss"); 

    }
    else{
        for (let i of tree.subordinates){
            hireEmployee(i, newEmployee, bossName);
        }
    }
}

/**
 * Removes an employee from the team by name.
 * If the employee has other employees below them, randomly selects one to take their place.
 *
 * @param {TreeNode} tree
 * @param {string} name employee's name
 * @returns {void}
 */
export function fireEmployee(tree: TreeNode, name: string) {
    if(tree != null){
        if (tree.value.name == name){
            let index: number = Math.floor(Math.random() * tree.subordinates.length);
            let temp: TreeNode = tree.subordinates[index]; 
            if( tree.subordinates.length == 0 ){
                tree = null; 
                return;
            }
            for(let i = 0; i < tree.subordinates.length; i++){
                let filtered: TreeNode[] = tree.subordinates.filter(f => f.value.name == temp.value.name );
                tree.subordinates.forEach(f => f.value.boss = temp.value.name); 
                tree.subordinates = tree.subordinates.filter(f => f.value.name != temp.value.name)
                tree.value.name = temp.value.name; 
                console.log("[fireEmployee]: Fired " + name + " and replaced with " + tree.value.name); 
                return; 
            }
        }
        else{
            for(let i of tree.subordinates){
                fireEmployee(i, name); 
            }
        }
    }
}

/**
 * Promotes an employee one level above their current ranking.
 * The promoted employee and their boss should swap places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName
 * @returns {void}
 */
export function promoteEmployee(tree: TreeNode, employee: string) {
    let employeeBoss: string = findHelper(tree, employee).value.boss;
    tree.swapEmployee(employee, employeeBoss);  
    console.log("[promoteEmployee]: Promoted " + employee + " and made " + employeeBoss + " his subordinate"); 
}

/**
 * Demotes an employee one level below their current ranking.
 * Picks a subordinat and swaps places in the hierarchy.
 *
 * @param {TreeNode} tree
 * @param {string} employeeName the employee getting demoted
 * @param {string} subordinateName the new boss
 * @returns {void}
 */
export function demoteEmployee(tree: TreeNode, employee:string, subordinateName: string) {
    tree.swapEmployee(subordinateName, employee);
    console.log("[demoteEmployee]: Demoted employee (demoted " + employee + " and replaced with " + subordinateName + ")"); 
}


/*Helper Functions*/ 
function fixEmployeeName(employees: employee[]): employee[]{
    console.log("Normalizing JSON file ...");
    for(let i in employees){
        let hasEmail: number = employees[i].name.indexOf('@'); 
         
        if(hasEmail > -1){
            let newName: string = employees[i].name.substring(0, hasEmail);
            employees[i].name = newName.charAt(0).toUpperCase() + newName.slice(1); 
        }
    }
    return employees; 
}

function generateCompanyStructureHelper(tree: TreeNode, employeeToAdd: employee){
    if(tree.value.name == employeeToAdd.boss){
        let t = new TreeNode(employeeToAdd); 
        tree.subordinates.push(t); 
    }
    else{
        for(let i of tree.subordinates){
            generateCompanyStructureHelper(i, employeeToAdd); 
        }
    }
}

