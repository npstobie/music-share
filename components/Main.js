import React, { Component, PropTypes } from 'react';
import * as actions from '../redux/actions';
import Links from './Links';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Search from './Search';
import Explanation from './Explanation'

class Main extends Component {

  constructor(props, context) {
    super(props, context)
  }

  renderExplanation() {
    return this.props.results.length ||
      this.props.links.length ?
        undefined : <Explanation/>
  }

  render() {
    return (
      <div>

        <Search 
          actions={this.props.actions}
          loading={this.props.loading}
          results={this.props.results}/>

        { this.renderExplanation() }

        <Links 
          links={this.props.links}
          loading={this.props.loading}/>

      </div>
    )
  }

}

Main.propTypes = {
  actions: PropTypes.object.isRequired,
  links: PropTypes.array.isRequired,
  loading: PropTypes.object.isRequired,
  results: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
