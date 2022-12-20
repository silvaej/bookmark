import { NextFunction, Request, Response } from 'express'
import * as jwt from 'njwt'

export const authorize = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]
    if (!token) {
        res.status(401).json({ ok: false, error: 'Logged out' })
        return
    }
    const user = jwt.verify(token!, process.env.ACCESS_TOKEN_SECRET)?.body.toJSON()
    const id = { ...user }.id
    res.locals.uid = id
    next()
}
