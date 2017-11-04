import React from 'react';
import { connect } from 'react-redux';
import levels from '../../db/levels';
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const name = this.props.user.name.split('@')[0];
    console.log('Points Now ---> ',this.props.points);
    return (
      <div className="row">
        <div className="col s12">
          <div className="card">
            <div className="card-image">
              <img src={this.props.user.picture} />
            </div>
            <div className="card-content">
              <strong className="profname"> {name} </strong>
              <div> Level {this.props.level} | {levels.levels[this.props.level].name}</div>
              <div> Points Until Next Level: {levels.levels[this.props.level+1].points - this.props.points} pts</div>
              <div className="progress">
                <div className="determinate" style={{'width': '70%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    level: state.level,
    points: state.points
  };
};

export default connect(mapStateToProps)(UserProfile);
