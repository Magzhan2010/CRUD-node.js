import express from "express"

const app = express()

app.use(express.json())



app.post('/create-post/:authorId', (req,res) => {
	const authorId = +req.params.authorId
	const status = req.query.status || "active"
	const title = req.body.title
	res.send(`Пост ${title} от автора с ID ${authorId} сохранен со статусом ${status}`)
})
app.listen(3000, () => {
	console.log("Server is running at 3000")
})