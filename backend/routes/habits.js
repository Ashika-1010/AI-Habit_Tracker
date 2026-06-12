import express from 'express'
import { getHabits,createHabit,deleteHabit,updateHabit,archiveHabit,reorderHabits } from '../controllers/habitController.js'
import { protect } from '../middleware/auth.js'

const habitRouter = express.Router()

habitRouter.use(protect)

habitRouter.get("/",getHabits)
habitRouter.post("/",createHabit)
habitRouter.put("/reorder",reorderHabits)
habitRouter.put("/:id",updateHabit)
habitRouter.delete("/:id",deleteHabit)
habitRouter.put("/:id/archive",archiveHabit)

export default habitRouter;