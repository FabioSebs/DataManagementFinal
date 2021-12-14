import "../styles/app.css";

function App() {
  return (
    <div className="App">
      <h1>Data Managment Final Project</h1>
      <form action="post" className="database">
        <label htmlFor="input1"> Label 1 </label>
        <input type="text" name="input1" />
        <label htmlFor="input1"> Label 1 </label>
        <input type="text" name="input1" />
        <label htmlFor="input1"> Label 1 </label>
        <input type="text" name="input1" />
        <button type="button"> Submit </button>
      </form>
    </div>
  );
}

export default App;
