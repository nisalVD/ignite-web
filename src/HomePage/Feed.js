import React from 'react'
import './Feed.css'

const Module = ({
  color,
  // heading,
  // content,
  // data
}) => {
  return (
    <div className={`feed-box feed-${color}`}>
      <h1 className="feed-heading">Heading <span className="date-span">Date: {'/02/01/1995'}</span></h1>
      <div className="feed-content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis nibh scelerisque elit ullamcorper luctus et et neque. Phasellus nec turpis maximus, rhoncus odio maximus, mollis ante. Maecenas justo nulla, mollis in lacinia a, dignissim quis massa. Etiam rhoncus commodo justo quis vulputate. Suspendisse eu commodo velit. Curabitur quis turpis eu diam finibus vehicula quis ac libero. Ut massa risus, eleifend in massa in, sollicitudin dignissim augue. Sed dictum odio eget velit ultrices molestie. 
      </div>
    </div>
  )
}

export default Module