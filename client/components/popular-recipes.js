import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Slider, Slide, Preloader } from 'react-materialize';

export default class PopularRecipes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pictures: [],
      recipes: []
    };

    this.popularRecipes = this.popularRecipes.bind(this);
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
      <div>
        {(this.state.recipes.length > 0)
          ? <div className="slider">
            <ul className="slides">
              { this.state.recipes.map((recipe) => {
                return (<li key={recipe.algolia}>
                  <Link to={`recipes/${recipe.algolia}`}>
                    <Slider>
                      <Slide
                        src={recipe.imageUrl}
                        title= {recipe.name} >
                      Enjoy in {recipe.time} minutes!
                      </Slide>
                    </Slider>
                  </Link>
                </li>);
              })
              }
            </ul>
          </div>
          : <div className="text-center">
            <Preloader size='big' className="text-center"/>
          </div>
        }
      </div>
    );
  }
}
