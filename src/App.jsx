import { useState, useEffect } from 'react'
import './App.css'

function App() {
const [users, setUsers] = useState([]);
const [hash, setHash] = useState(window.location.hash.slice(1)*1);

useEffect(() => {
  const fetchData = async() => {
    const response = await fetch("https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users");
    const json = await response.json();
    setUsers(json);
  }
  fetchData();
}, []);

useEffect(() => {
  window.addEventListener("hashchange", () => {
    setHash(window.location.hash.slice(1)*1);
  });
}, []);

const user = users.find(user => hash === user.id);

console.log(user);

  return (
    <>
      <div className="heads">
        <h1>User List</h1>
        <h2>Number of Users: {users.length}</h2>
      </div>
      <div className="data">
        <ul className="list">
          {
            users.map(user => {
              return(
                <div key={user.id} className={user.id === hash ? "selected" : ""}>
                  <a href={`#${user.id === hash ? "" : user.id}`}>
                    {user.name}
                  </a>
                </div>
              );
            })
          }
        </ul>

        <div className="details">{
          user ? (<p>Email: {user.email}</p>) : null
        }
        {
          user ? (<p>Company: {user.company.name}</p>) : null
        }
        {
          user ? (<p>Phone: {user.phone}</p>) : null
        }
        </div>
      </div>
    </>
  )
}

export default App
