 import { useState,useEffect } from 'react';

 import './App.css';
import Recipe from './components/recipe'

 function App() {

  const APP_ID = 'dc34792b';
  const APP_KEY = '3eab1a651f78f58e8b394f905f3efa21'

  
  const [recipes,setRecipes] = useState([]);
  const [search,setSearch] = useState('');
  const [query,setQuery] = useState('momo');

  const getSearch = e =>{
     e.preventDefault()
     setQuery(search)
     setSearch('')
  }
 

  useEffect(() => {
    function getRecipes(){
      fetch('https://api.edamam.com/search?q='+query+"&app_id="+APP_ID+"&app_key="+APP_KEY)
      .then(res => res.json())
      .then(data => setRecipes(data.hits))
}
    getRecipes()
  },[query])


 return(
  <div className="App">
   <form className="search-form" onSubmit={getSearch}>
    <input type="text" className='search-bar' value={search} onChange={e => setSearch(e.target.value)} placeholder='search'/>
    <button type='submit' className='search-button'>Search</button>
    </form>
    <div className='recipes'>
    {recipes.map((recipe,idx) => <Recipe 
    key={idx}
    title={recipe.recipe.label}
    calories={recipe.recipe.calories}
    image={recipe.recipe.image}
    ingredients={recipe.recipe.ingredients}
    />)}
   </div>
   

  </div>

 );

}
  

export default App;
