import React, { Component, PropTypes } from 'react'
import Result from './Result'
import ResultsLoadingSpinner from './ResultsLoadingSpinner'

class Results extends Component {

  constructor(props, context) {
    super(props, context)
  }

  render() {

    return (
      <div className="resultsContainer">

        { this.props.loading.search ? <ResultsLoadingSpinner/> : undefined }

        {
          this.props.results.map((result, i) => {
            return (
              <Result 
                key={i} 
                result={result}
                actions={this.props.actions}
                clearText={this.props.clearText}/>
          )})
        }
      </div>
    ) 
  }

}

Results.propTypes = {
  actions: PropTypes.object.isRequired,
  clearText: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired
}

export default Results
