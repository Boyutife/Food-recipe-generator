import React, { Component } from 'react';
import './result.css'

class RecipeSearch extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      recipe: null,
      query: ''
    };
  }

  handleInputChange = (event) => {
    this.setState({ query: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const apiKey = '9e93d21e6b12452f9a7a6f1bbe97d375';
    const url = `https://api.spoonacular.com/recipes/search?apiKey=${apiKey}&query=${this.state.query}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const recipeId = data.results[0].id;
        const recipeUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

        fetch(recipeUrl)
          .then(response => response.json())
          .then(recipe => {
            this.setState({ recipe });
          });
      });
  }

  render() {
    return (
      <div >
        {/* <form onSubmit={this.handleSubmit} className='wrap'>
          <input type="text" value={this.state.query} onChange={this.handleInputChange} />
          <button type="submit">Search</button>
        </form> */}
        <form onSubmit={this.handleSubmit} className='wrap'>
                    <input
                            className="searchTerm"
                            type="text"
                            name="text"
                            placeholder="Search for food recipes"
                            onChange={this.handleInputChange}
                            value={this.state.query}
                    />
                   <button  type="submit"  className="searchButton">
                        <i className="fa-solid fa-magnifying-glass"></i>
                     </button>
                </form>
        
        {this.state.recipe && (
          <div className='resultContainer'>
            <h2>{this.state.recipe.title}</h2>
            <img src={this.state.recipe.image} alt={this.state.recipe.title} />
            <ul>
              {this.state.recipe.extendedIngredients.map(ingredient => (
                <li key={ingredient.id}>{ingredient.original}</li>
              ))}
            </ul>
            <div dangerouslySetInnerHTML={{ __html: this.state.recipe.instructions }}></div>
          </div>
        )}
      </div>
    );
  }
}

export default RecipeSearch;
