export type Effect = {
    name: string;
    description: string;
    duration: number;
    stats: { [k: string]: number };
    deadline: number;
}
