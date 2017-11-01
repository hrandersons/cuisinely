import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Slider, Slide } from 'react-materialize';

export default class PopularRecipes extends React.Component {
  constructor() {
    super();
    this.popularRecipes = this.popularRecipes.bind(this);
    this.state = {
      pictures: [],
      recipes: []
    };
  }

  componentDidMount() {
    this.popularRecipes();
    $('.slider').slider({
      interval: 5000,
    });
  }

  popularRecipes() {
    axios.get('/api/popular', { params: this.props })
      .then((res) => {
        let arr = res.data.reduce((acc, el) => {
          acc.push(el.imageUrl);
          return acc;
        }, []);
        this.setState({
          pictures: arr,
          recipes: res.data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div class="slider">
        <ul class="slides">
          {(this.state.recipes.length)
            ? this.state.recipes.map((recipe) =>
              <li key={recipe.algolia}>
                <Link to={`recipes/${recipe.algolia}`}>
                  <Slider>
                    <Slide
                      src={recipe.imageUrl}
                      title= {recipe.name} >
                    Enjoy in {recipe.time} minutes!
                    </Slide>
                  </Slider>
                </Link>
              </li>)
            : 'No popular items!' }
        </ul>
      </div>
    );
  }
}
