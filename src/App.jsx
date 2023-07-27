import { useState, useEffect } from 'react'
import Logo from './components/Logo'
import Form from './components/Form'
import PackingList from './components/PackingList'
import Stats from './components/Stats'



const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];


function App() {

  // const [items, setItems] = useState(initialItems);
  const [items, setItems] = useState(initialItems);
  // console.log(items)

  useEffect(() => {
    
    const savedItems = localStorage.getItem("items")
    // console.log(savedItems)
    if (savedItems && savedItems !== "undefined" && savedItems !== "null") {
      
      setItems(JSON.parse([savedItems]))
    }
    
    console.log(savedItems)
  }, [])

  const handleAddItems = (item) => {
    
    // add new items
    setItems([
      ...items,
      item
    ])
    // console.log(items)
    // localStorage.setItem("items", JSON.stringify([...items, item]))
  }

  const handleDeleteItem = (id) => {

    // filter out id that matches the object id
    setItems(items.filter(item => item.id !== id))

    
    // localStorage.setItem("items", JSON.stringify([...items, item]))
  }

  const handleToggleItem = (id) => {

    setItems((items) => items.map((item) => item.id === id ? {
      ...item,
      packed: !item.packed
    } : item ))
    // setCount((count) => count + 1)
    // localStorage.setItem("items", JSON.stringify([...items]))
  }

  return (
    <div className='app'>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList 
        items={items} 
        onDeleteItem={handleDeleteItem} 
        onToggle={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  )
}

export default App
