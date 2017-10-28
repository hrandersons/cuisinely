import React from 'react';
import { Link, Route } from 'react-router-dom';
import { setUserInfo } from '../actions/actions.js';
import { connect } from 'react-redux';
import axios from 'axios';

// const Hit = ({hit}) =>
//   <div className="col s12 m7">
//     <div className="card horizontal hoverable">
//       <div className="card-image thumbnail">
//         <img src={(hit.imageUrl === 'none') ? '/assets/no_img.jpg' : (hit.imageUrl)} />
//       </div>
//       <div className="card-stacked">
//         <div className="card-content">
//           <span className="card-title"><strong>{hit.name}</strong> ({hit.rating})</span>
//           <blockquote>
//             {hit.description}
//           </blockquote>
//           <ul>
//             <li><strong>Difficulty:</strong> {hit.difficulty}</li>
//             <li><strong>Estimated Time:</strong> {hit.time} Minutes</li>
//           </ul>
//         </div>
//         <div className="card-action">
//           <Link to={`recipes/${hit._id}`}>Explore</Link>
//             {
//               (this.state.bookmarked)
//                 ? <a onClick={this.handleRemoveBookmark}>Remove Bookmark</a>
//                 : <a onClick={this.handleAddBookmark}>Bookmark</a>
//             }
//         </div>
//       </div>
//     </div>
//   </div>

class RecipeEntry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookmarked: false
    };
    this.handleAddBookmark = this.handleAddBookmark.bind(this);
    this.handleRemoveBookmark = this.handleRemoveBookmark.bind(this);
    this.checkBookmarks = this.checkBookmarks.bind(this);
  }

  componentDidMount() {
    this.checkBookmarks();
  }

  checkBookmarks() {
    const userId = this.props.user.user_id;
    const { recipe } = this.props;
    const params = {
      recipeId: recipe._id,
      userId: userId
    };

    axios.get('/api/bookmarks/check', { params: params })
      .then((res) => {
        this.setState({
          bookmarked: res.data
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleAddBookmark() {
    const userId = this.props.user.user_id;
    const { recipe } = this.props;
    const params = {
      recipeId: recipe._id,
      userId: userId
    };
    axios.put('/api/bookmarks', params)
      .then((res) => {
        console.log('bookmarked');
        this.setState({
          bookmarked: true
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleRemoveBookmark() {
    const userId = this.props.user.user_id;
    const { recipe } = this.props;
    const params = {
      recipeId: recipe._id,
      userId: userId
    };
    axios.delete('/api/bookmarks', { params: params })
      .then((res) => {
        console.log('removed');
        this.setState({
          bookmarked: false
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }


  render() {
    return (
      <div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(RecipeEntry);
