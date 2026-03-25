import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Form from './Form'
import Greeting from './Greeting'
import FavLego from './FavLego'
import CharacterCard from './CharacterCard'
import CharacterCardGallery from './CharacterCardGallery'
import ChoosePageForm from './ChoosePageForm'
import CharacterSearch from './CharacterSearch'
import FilterLego from './FilterLego'

// TODO: ask user to input age and favourite color and then spit them out a basic greeting card where the background is their favourite color DONE
//TODO: extrapolate out the form into its own component DONE
//TODO: create a simple greeting component with basic styles from tachyons DONE
//TODO: pass props to greeting component, like a name DONE
//Write a component that renders a list of my favourite lego, represented as a list DONE
//Add some styling to make it look less shit, in a css file just for that component DONE
//Turn favLego into an object list where each lego has a name and a rating. Display a table of the lego with name and star rating DONE
//Write component that takes data from Star Wars API and returns a card displaying character info DONE
//Pass name to CharacterCard component so its reusable DONE
//Create component that displays gallery of charactern cards done
//Now pass a list into the gallery component from app.jsx, will need to use map inside gallery component DONE
//Fetch a list of 10 characters from star wars api and pass it into characters variable DONE
//Write a component that requests user to select which page they want to extract characters from, 
  // and move the handleChange and handleSubmit function into app.jsx. pass these functions as props to ChoosePageForm.jsx DONE
//Pass page num into the characters search useEffect DONE
//have min and max values for form input 1-9 DONE
//Try and render the starships in each character card.
    // Start with only rendering the first starship if the array is not empty 

//Create a searchbox for the name of a character DONE
// Update the first form to update the background of the whole page
// Style the page so each section is clearly outlined and finish the project DONE, now post to github

function App() {
  const [formInputs,setFormInputs]=useState({
    name:"",
    favColor:"#000000"
  })

  const [pageNum,setPageNum]=useState(1);
  const [character,setCharacter]=useState("");
  const [bgColor,setBgColor]=useState(null);

  const handlePageChange=function(e){
      // const name=e.target.name;
      const value=e.target.value;
      setPageNum(value);
  }

  // const handlePageSubmit=function(e){
  //     e.preventDefault();
  //     console.log(pageNum);
  //     // setPageNumSubmitted(true);
  // }

  const [submitted, setSubmitted]=useState(false);
  // const [pageNumSubmitted,setPageNumSubmitted]=useState(false);

  const [characters,setCharacters]=useState([]);

  const handleChange=function(e){
    const {name,value}=e.target;
    setFormInputs(values=>({...values,[name]:value}));
  }

  const handleSubmit=function(e){
    e.preventDefault();
    setSubmitted(true);
    setBgColor(formInputs.favColor);
    // console.log(formInputs);
  }

  const resetFields=(e)=>{
    e.preventDefault();
    setFormInputs({
      name:"",
      favColor:"#ffffff"
    });
    setBgColor("#ffffff");
    setSubmitted((prevSubmitted)=>(!prevSubmitted));
    console.log(submitted)
  }

  useEffect(() => {
      fetch(`https://swapi.dev/api/people/?page=${pageNum}`)
        .then((res) => res.json())
        .then((data) => {
          setCharacters(data.results)
          console.log(characters);
          console.log("characters useEffect running");
          console.log(`page num is: ${pageNum}`);
        })
        .catch((err) => console.error("Error:", err));
    }, [pageNum]);

    const handleInputChange=function(e){
      setCharacter(e.target.value);
      console.log(character);
    }

    

  

  return (
    <div className='body'>
      <div className='header'>
        <h1>My first react page</h1>
      </div>
      <Form bgColor={bgColor} name={formInputs.name} favColor={formInputs.favColor} handleChange={handleChange} handleSubmit={handleSubmit} resetFields={resetFields} submitted={submitted}/>
      {/* <Greeting name={"John"} /> */}
      <FavLego/>
      {/* <ChoosePageForm handleChange={handlePageChange} pageNum={pageNum}/>
      <CharacterCardGallery characters={characters} pageNum={pageNum}/> */}
      <div className='characterSearchBlock'>
        <CharacterSearch handleInputChange={handleInputChange}/>
        <CharacterCard name={character}/>
      </div>
      <FilterLego/>
    </div>
  )
}

export default App;
