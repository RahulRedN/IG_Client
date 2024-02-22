import { useState } from "react";
import Todocss from "./TodoList.module.css"; // Import CSS file
import { Checkbox } from "@chakra-ui/react";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
import { Button } from "@chakra-ui/react";

function TodoList() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, { text: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = {
      ...updatedTodos[index],
      completed: !updatedTodos[index].completed,
    };
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((todo, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(todos[index].text);
  };

  const handleEditInputChange = (event) => {
    setEditValue(event.target.value);
  };

  const handleEditSave = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].text = editValue;
    setTodos(updatedTodos);
    setEditIndex(null);
  };

  return (
    <div className={Todocss.todolistcontainer}>
      <div className={Todocss.inputcontainer}>
        <input

          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="What do you need to do today ?"
        />
        <Button
          onClick={handleAddTodo}
          colorScheme="twitter"
          height="48px"
          marginLeft="10px"
        >
          Add
        </Button>
      </div>
      <ul className={Todocss.todolist}>
        {todos.map((todo, index) => (
          <li key={index} className={Todocss.todoitem}>
            {editIndex === index ? (
              <>
                <input
                  className={Todocss.editinput}
                  type="text"
                  value={editValue}
                  onChange={handleEditInputChange}
                />
                <button
                  className={Todocss.savebutton}
                  onClick={() => handleEditSave(index)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <Checkbox
                  width="30px"
                  height="30px"
                  borderColor=" #3182ce !important"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(index)}
                  {...label}
                ></Checkbox>
                <span
                  className={`${todo.completed ? Todocss.completed : ""}`}
                  onClick={() => handleEdit(index)}
                >
                  {todo.text}
                </span>
                <button
                  className="editbutton"
                  onClick={() => handleEdit(index)}
                >
                  <FiEdit2 marginRight="10px" color="#3182ce" />
                </button>
                <button onClick={() => handleDeleteTodo(index)}>
                  <RiDeleteBinLine marginLeft="0px" color="#3182ce" />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
