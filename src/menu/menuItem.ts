import { commands } from "vscode";
import { ActionType, IBindingItem, IOverrideBindingItem } from "../iBindingItem";
import { IMenuItem } from "./iMenuItem";
import { createQuickPick } from "./menu";

export default class MenuItem implements IMenuItem {
    name: string;
    key: string;
    type: ActionType;
    command?: string;
    commands?: string[];
    items?: MenuItem[];

    constructor(item: IBindingItem) {
        this.name = item.name;
        this.key = item.key;
        this.type = item.type;
        this.command = item.command;
        this.commands = item.commands;
        if (this.type === ActionType.Bindings && item.bindings) {
            this.items = MenuItem.createItems(item.bindings);
        }
    }

    get label() {
        return this.key === ' ' ? '␣' : this.key;
    }

    get description() {
        // Add tab so the description is aligned
        return `\t${this.name}`;
    }

    action(): Thenable<unknown> {
        if (this.type === ActionType.Command && this.command) {
            return commands.executeCommand(this.command);
        } else if (this.type === ActionType.Commands && this.commands) {
            return this.commands.reduce((prev, current) => {
                return prev.then(() => commands.executeCommand(current));
            }, Promise.resolve());
        } else if (this.type === ActionType.Bindings && this.items) {
            return createQuickPick(this.name, this.items);
        }

        return Promise.reject();
    }

    static createItems(items: IBindingItem[]) {
        return items.map(i => new MenuItem(i));
    }

    static overrideItems(
        items: MenuItem[] | undefined,
        overrides: IOverrideBindingItem[] | undefined) {
        overrides?.forEach(o => {
            try {
                const keys = (typeof o.keys === 'string') ? o.keys.split('.') : o.keys;

                // Traverse to the last level
                let menuItems = items;
                for (let i = 0; i < keys.length - 1; i++) {
                    const key = keys[i];
                    const keyIndex = menuItems?.findIndex(i => i.key === key);
                    if (keyIndex === undefined || keyIndex === -1) {
                        console.warn(`Key ${key} of ${o.keys} not found`);
                        break;
                    }
                    menuItems = menuItems?.[keyIndex]?.items;
                }

                if (menuItems !== undefined) {
                    const key = keys[keys.length - 1];
                    const index = menuItems.findIndex(i => i.key === key);

                    if (o.position === undefined) {
                        const newItem = createMenuItem(o, key);
                        if (index !== -1) {
                            // replace the current item
                            menuItems.splice(index, 1, newItem);
                        } else {
                            // append if there isn't an existing binding
                            menuItems.push(newItem);
                        }
                    } else {
                        if (o.position < 0) {
                            // negative position, attempt to remove
                            if (index !== -1) {
                                menuItems.splice(index, 1);
                            }
                        } else {
                            // Remove and replace
                            if (index !== -1) {
                                menuItems.splice(index, 1);
                            }
                            const newItem = createMenuItem(o, key);
                            menuItems.splice(o.position, 0, newItem);
                        }
                    }
                }
            } catch (e) {
                console.error(e);
            }
        });
    }
}

function createMenuItem(o: IOverrideBindingItem, key: string) {
    if (o.name !== undefined && o.type !== undefined) {
        return new MenuItem({
            key: key,
            name: o.name,
            type: o.type,
            command: o.command,
            commands: o.commands,
            bindings: o.bindings,
        });
    } else {
        throw new Error('name or type of the override is undefined');
    }
}