import { ClListItem, PropertyObject } from './_dataTypes';
import { indexOf, forEach, remove, intersection, isArray } from 'lodash';

export default class NodeModel {
    parentsToChild: any;
    childrenToParents: any;
    allValues: any;
    ptoc: PropertyObject = {};
    ctop: PropertyObject = {};
    allc: Array<string|number> = []; 
    checked: Array<string|number> = [];
    open: Array<string|number> = [];

    constructor(listItems: Array<ClListItem>, checked:Array<string|number>) {
        // this.getParentsToChild(listProps);
        // this.getchildrenToParents(listProps);
        // this.getAll(listProps);
        this.flatten(listItems);
        this.checked = checked;
    }

    flatten = (parents: Array<ClListItem>, depth: number = 0, parent?: string | number) => {
        forEach(parents, (parent : ClListItem) => {
            this.allc.push(parent.value);
            if(parent.children) {
                forEach(parent.children, (child: ClListItem) => {
                    this.allc.push(child.value);
                    // Set the values for Parent to Child Properties
                    if(this.ptoc.hasOwnProperty(parent.value)) {
                        this.ptoc[parent.value].push(child.value);
                    } else {
                        this.ptoc[parent.value] = [child.value];
                    }
                    // Set the values for Child to Parent Properties
                    if(this.ctop.hasOwnProperty(child.value)) {
                        this.ctop[child.value].push(parent.value);
                    } else {
                        this.ctop[child.value] = [parent.value]
                    }
                })

                // for All children flattern recursively
            
                this.flatten(parent.children, ++depth, parent.value);
            } else {
                if(!this.ptoc.hasOwnProperty(parent.value)) {
                    this.ptoc[parent.value] = [];
                }
            }
        })
    }

    selectOpen = (selectValue: string|number) : void => {
        if (indexOf(this.open, selectValue) === -1) {
            if (isArray(this.ptoc[selectValue]) && this.ptoc[selectValue].length > 0) {
                this.open.push(selectValue);
            }
        } else {
            remove(this.open, i => selectValue === i);
        }
        return;
    }

    selectChildren = (selectValue: string|number) : void => {
        forEach(this.ptoc[selectValue], (selectItem: string|number) => {
                this.checked.push(selectItem)
            if(this.ptoc.hasOwnProperty(selectItem)) {
                this.selectChildren(selectItem);
            }
        })
        return;
    }

    selectParent = (selectValue: string|number) : void => {
        forEach(this.ctop[selectValue], (selectItem: string|number) => {
            if(indexOf(this.checked, selectItem) === -1) {
                this.checked.push(selectItem)
            }
            if(this.ptoc.hasOwnProperty(selectItem)) {
                this.selectParent(selectItem);
            }
        })
        return;
    }

    deSelectChildren = (selectValue: string|number) : void => {
        forEach(this.ptoc[selectValue], (selectItem: string|number) => {
                if(indexOf(this.checked, selectItem) !== -1) {
                    remove(this.checked, i => i === selectItem)
                }
            if(this.ptoc.hasOwnProperty(selectItem)) {
                this.deSelectChildren(selectItem);
            }
        })
        return;
    }

    deSelectParent = (selectValue: string|number) : void => {
        forEach(this.ctop[selectValue], (parent: string|number) => {
            if(indexOf(this.checked, parent) !== -1 && intersection(this.ptoc[parent], this.checked).length === 0) {
                remove(this.checked, i => i === parent)
            }
            if(this.ctop.hasOwnProperty(parent)) {
                this.deSelectParent(parent);
            }
            
        })
        return;
    }

    selectItems = (selectValue : string | number) : void => {
        // If you are selecting all, then select all and return
        if(selectValue === 'all') {
            this.checked = ['all', ...this.allc];
            return
        }

        // Add current Item into selects
        if(indexOf(this.checked, selectValue) === -1) {
            this.checked.push(selectValue)
        }
        // Select All children of current item
        this.selectChildren(selectValue);

        // Select all the parents of the current item
        this.selectParent(selectValue);
        return;
    }

    deSelectItems = (selectValue : string | number) : void => {
        // If you are selecting all, then empty all checked and return
        if(selectValue === 'all') {
            this.checked = [];
            return
        }

        // Add current Item into selects
        if(indexOf(this.checked, selectValue) !== -1) {
            remove(this.checked, i => i === selectValue)
        }
        
        this.deSelectChildren(selectValue);
        this.deSelectParent(selectValue);
        return;
    }
}