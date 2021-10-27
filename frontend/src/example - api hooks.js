export default function App() {
  const [data, setData] = useState([])
  const [formData, setFormData] = useState('')

  useEffect(() => {
    fetchGames() // Fetch games when component is mounted
  }, [])

  const fetchGames = () => {
    fetch('http://localhost:3000/game', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((result) => setData(result.rows))
      .catch((err) => console.log('error'))
  }

  const saveGames = () => {
    fetch('http://localhost:3000/game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData, // Use your own property name / key
      }),
    })
      .then((res) => res.json())
      .then((result) => setData(result.rows))
      .catch((err) => console.log('error'))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    saveGames() // Save games when form is submitted
  }

  const handleChange = (event) => {
    setFormData(event.target.value)
  }

  return (
    <div className="App">
      {/* method="post" not needed here because `fetch` is doing the POST not the `form` */}
      {/* Also, note I changed the function name, handleSubmit */}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData} onChange={handleChange} />
        <button type="submit">click</button>
      </form>

      {data &&
        data.map((element, index) => (
          <GameTestResult name={element.name} key={element.index} />
        ))}
    </div>
  )