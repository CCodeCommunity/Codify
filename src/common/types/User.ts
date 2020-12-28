export default interface User {
    // shut up ik I should name it users or name the quotes one quote or whatever
    userid: string; // length 25 can be null but it shouldnt
    description: string; // length 1000 can be null but it shouldnt
    balance: number; // idk its int8 in the db can be null it shouldnt
    lastdaily: string; // lenght 20 can be null it shouldnt
    level: number; // same as balance default 1
    xp: number; // same as balance default 0
    lastxpclaim: number; // this time its int4 can be null it shouldnt default 0
    token: string; // length 124 can be null but it shouldnt
    levelupmessages: boolean; // default is false (true is when you dont wnat to see the levelup messages)
    purchasedIds: number[];
    dayxp: number;
    lastdayxp: number;
}
