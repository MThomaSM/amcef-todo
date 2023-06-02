export interface User {
    id: string;
    email: string;
    password: string;
    Item: Item[];
    List: List[];
    SharedList: SharedList[];
}

export interface List {
    id: string;
    title: string;
    items: Item[];
    user: User;
    userId: string;
    SharedList: SharedList[];
}

export interface SharedList {
    id: string;
    user: User;
    userId: string;
    list: List;
    listId: string;
}

export interface Item {
    id?: string;
    title: string;
    description?: string | null;
    deadline?: Date | string ;
    status: ItemStatus;
    createdById?: string;
    list?: List;
    listId?: string;
}

export enum ItemStatus {
    active = "active",
    completed = "completed",
    cancelled = "cancelled",
}
