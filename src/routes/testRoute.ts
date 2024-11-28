import express from 'express'

const router = express.Router()

router.get("/",async(req:any,res:any)=>{
    res.send('Backend is up')
})

export default router;