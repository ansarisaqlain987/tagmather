import { Envelope } from "@/generated/client";

export type UserEnvelopsWithTotal = Envelope & {amount: number};