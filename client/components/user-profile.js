import React from 'react';
import { connect } from 'react-redux';
class UserProfile extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const name = this.props.user.name.split('@')[0];
    return (
      <div className="row">
        <div className="col s12">
          <div className="card">
            <div className="card-image">
              <img src={this.props.user.picture} />
            </div>
            <div className="card-content">
              <strong className="profname"> {name} </strong>
              <div> Level 6 | Awesome Chef </div>
              <div> Points Until Next Level: 18pts </div>
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
    user: state.user
  };
};

export default connect(mapStateToProps)(UserProfile);
