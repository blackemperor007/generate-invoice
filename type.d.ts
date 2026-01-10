import { Connection } from "mongoose";

declare global {
    // allow global `var` declarations
    // eslint-disable-next-line no-var
    var mongoose: {
        conn: Connection | null;
        promise: Promise<Connection> | null;
    };
}

export {};