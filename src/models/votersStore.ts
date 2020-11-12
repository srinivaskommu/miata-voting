import { Voter } from "./voters";

export type SortDir = 'asc' | 'desc';

export type VotersSort = {
  sortCol: keyof Voter;
  sortDir: SortDir;
};

export type VoterToolState = {
  voters: Voter[];
  editVoterId: number;
  votersSort: VotersSort;
};