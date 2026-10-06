import { lecture01 } from "./lecture-01";
import { lecture02 } from "./lecture-02";
import { lecture03 } from "./lecture-03";
import { lecture04 } from "./lecture-04";
import { lecture05 } from "./lecture-05";
import { lecture06 } from "./lecture-06";
import { lecture07 } from "./lecture-07";
import { lecture08 } from "./lecture-08";
import { lecture09 } from "./lecture-09";
import type { Lecture } from "./types";

export const TOTAL_LECTURES = 9;

export const lectures: Lecture[] = [
  lecture01,
  lecture02,
  lecture03,
  lecture04,
  lecture05,
  lecture06,
  lecture07,
  lecture08,
  lecture09,
];

export function getLecture(n: number): Lecture | undefined {
  return lectures.find((l) => l.n === n);
}
