import React from 'react';

class ListErrors extends React.Component {
  render() {
    const errors = this.props.errors;
    console.log("errors" + JSON.stringify(errors));
    if (errors) {
      return (
        <div className="callout callout-danger">
          <ul className="error-messages m-0">
            {
              Object.keys(errors).map(key => {
                return (
                  <li className="" key={key}>
                    {key} {errors[key]}
                  </li>
                );
              })
            }
          </ul>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ListErrors;
