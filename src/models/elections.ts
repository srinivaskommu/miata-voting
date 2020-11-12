export type Question = {
    id: number,
    title: string
};
​
export type Election = {
    id: number,
    name: string,
    questions: Question[]
};