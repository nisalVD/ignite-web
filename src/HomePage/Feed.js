import React from 'react'
import './Feed.css'
import moment from 'moment'

const Module = ({
  color,
  heading,
  content,
  date
}) => {
  return (
    <div className={`feed-box feed-${color}`}>
      <h1 className="feed-heading">{heading}
        <span className="date-span">Date: {moment(date).format("dddd, MMMM Do YYYY")}</span>
      </h1>
      <div className="feed-content">
        {content}
      </div>
    </div>
  )
}

export default Module