import { NextApiRequest, NextApiResponse } from "next";

type CounterResponse = {
    value: number
};

let counter = 0;

export default function handler(req: NextApiRequest, res: NextApiResponse<CounterResponse>) {
    if (req.method === "GET") {
        const { INC: increment, DEC: decrement } = req.query;
        if (increment !== undefined) { 
           counter += 1;
           return res.status(200).json({ value: counter });
        } else if (decrement !== undefined) {
            counter -= 1;
            return res.status(200).json({ value: counter });
        } else {
            return res.status(200).json({ value: counter });
        }
    } else {
        return res.status(200).json({ value: counter });
    }
}