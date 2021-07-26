export declare class Proposal {
    constructor(initialData: Partial<Proposal>);
    id: string;
    type: string;
    title: string;
    text: string;
    creator: string;
    createdAt: number;
    editedAt?: number;
    completedAt?: number;
}
