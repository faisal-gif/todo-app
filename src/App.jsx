import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Container, Row, Col, Button, InputGroup, FormControl, ListGroup } from 'react-bootstrap'
import TodoItem from './component/todo-item'

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput('');
    }
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <Container>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "3rem",
          fontWeight: "bolder",
        }}
      >
        TODO LIST
      </Row>

      <hr />
      <Row>
        <Col md={{ span: 12, offset: 12 }}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="add item . . . "
              size="lg"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTodo()}
              aria-label="add something"
              aria-describedby="basic-addon2"
            />
            <InputGroup>
              <Button
                variant="dark"
                className="mt-2"
                onClick={addTodo}
              >
                ADD
              </Button>
            </InputGroup>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 12, offset: 12 }}>
          <h3>To Do List</h3>
          <ListGroup>
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                removeTodo={removeTodo}
              />
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  )
}

export default App
