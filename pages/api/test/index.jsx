import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req, res) => {

    if(req.method === "POST") {
        return res.status(200).json({message: "Method POST"})
    }
    if(req.method === "GET") {

        return res.status(200).json({message: "Method GET"})
    }

}

export default handler;