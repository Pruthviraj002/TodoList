const {getTodo,postTodo,putTodo,deleteTodo}= require("../Controller/todoCon")

const route = require("express").Router()

route.get("/",getTodo)
route.post("/",postTodo)
route.put("/:id",putTodo)
route.delete("/:id",deleteTodo)

module.exports = route