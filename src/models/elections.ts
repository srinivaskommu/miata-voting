
export type Question = {
    id: number,
    title: string,
};

export type Election = {
    id: number,
    name: string,
    questions: Question[]
};

export type Voter = {
    id: number,
    firstName: string,
    lastName: string,
    email: string
};

export type Ballot = {
    id: number,
    voterId: number,
    electionId: number,
};