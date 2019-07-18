import React, { Component } from 'react'
import './JSONStyle.scss';

class JSONTreeView extends Component {
  constructor(props) {
    super(props)

    this.state = { json: {} };
    this.toggleNesting = this.toggleNesting.bind(this);
  }

   toggleNesting(e) {
    e.preventDefault();
    const target = e.target;
    if (target.classList.contains('obj-array')) {
      target.parentElement.parentElement.querySelector('.nested').classList.toggle('active');
      target.parentElement.classList.toggle('caret-down');
    } else {
      target.parentElement.querySelector('.nested').classList.toggle('active');
      target.classList.toggle('caret-down');
    }
  }

  render () {
    return (
      <div>
        <ul className='json-tree'>
          {formatter(this.props.obj, this.toggleNesting)}
        </ul>
      </div>
    );
  }
}

// Formats an object and returns a <li> in JSX
function formatter(data, toggleMethod) {

  const keys = Object.keys(data);
  const values = Object.values(data);

  const output = keys.map((k, i) =>
    // If the value is an Object or Array, make it collapsable
    (typeof values[i] === 'object' && values[i] != null) ?
      <li key={k.toString() + i}>
      <span className='caret' onClick={toggleMethod}>{k}:
        <span className='obj-array'>{(Array.isArray(values[i]) ? ' Array(' + values[i].length + ')' : ' Object(' + Object.values(values[i]).length + ')')}</span>
      </span>
      <ul className='nested'>{formatter(values[i], toggleMethod)}</ul>
      </li>
    // Else, make regular list item and format it with corresponding classes for styling
    :
      <li key={k.toString() + i}>
      <span>{k}: </span>
      {// If the value is a number, show it with number styling
      ((typeof values[i] == 'number') ? <span className='number'>{values[i]}</span>
      // If the value is a boolean, show it with boolean styling
      : typeof values[i] == 'boolean' ? <span className='boolean'>"{values[i].toString()}"</span>
      // If the value is a null, show it with null styling
      : values[i] == null ? <span className='none'>(null)</span>
      // If the value is a string, or something unknown to us, show it with string styling
      : <span className='string'>"{values[i].toString()}"</span>)
      }
      </li>
  );

  return output;
}

export default JSONTreeView;
