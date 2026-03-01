import express, { text } from "express"

const app = express()

app.use(express.json())

let tasks = []
let idCounter = 1

//Create
app.post('/', (req, res) => {
	const { text } = req.body
	if (!text) return res.status(400).json({ message: "Text is required" })
	const task = { id: idCounter++, text, done: false }
	tasks.push(task)	
	res.status(201).send(task)
})
//Read
app.get('/', (req, res) =>  {

	res.status(200).json(tasks)
})
//Update
app.put("/:id", (req,res) => {
	const id = Number(req.params.id)
	const task = tasks.find(e => e.id === id)
	if (!task) return res.status(404).json({ message: "Not found" })
	const { text, done} = req.body
	if (text !== undefined) task.text = text
	if (done !== undefined) task.done = done

	res.json(task)
})
//Delete
app.delete("/:id", (req, res) => {
	const id = Number(req.params.id)
	const index = tasks.findIndex(e => e.id === id)
	if (index === -1) res.status(404).json({ error: "Error" })
	const deleted = tasks.splice(index, 1)

	res.json(deleted[0])
})

app.listen(3000, () => {
	console.log("Server is running at 3000")
})