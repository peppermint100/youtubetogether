import express, { Request, Response } from "express"

const router: express.Router = express.Router()

router.get('/', (req: Request, res: Response) => {
    res.send('server testing ok!')
})

export default router;