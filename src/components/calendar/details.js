import React from "react"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Html from "Common/Html"
import truncateString from "Utils/truncate"
import { StyledDetails, SeeMore } from "./styles"

function Details({ eventInfo, setEventInfo, ...position }) {
  React.useEffect(() => {
    const handler = e => {
      if (!e.target.closest(".event-details")) {
        setEventInfo(null)
      }
    }

    window.document.body.addEventListener("click", handler)
    return () => window.document.body.removeEventListener("click", handler)
  })

  React.useEffect(
    () => {
      const handler = e => {
        if (e.key === "Escape") {
          setEventInfo(null)
        }
      }

      window.document.addEventListener("keyup", handler)
      return () => window.document.removeEventListener("keyup", handler)
    },
    [eventInfo.event.title]
  )
  const start = moment(eventInfo.event.start).format("MMM D, Y @ h:mma")

  return (
    <StyledDetails {...position} className="event-details">
      <aside className="header">
        <div>
          {eventInfo.event.title}
          <div className="start">
            <FontAwesomeIcon icon="clock" style={{ marginRight: ".8rem" }} />
            {start}
          </div>
        </div>
        <span>
          <button
            className="close-details"
            type="button"
            onClick={() => setEventInfo(null)}
          >
            &times;
          </button>
        </span>
      </aside>

      <div className="content">
        <Html>
          {truncateString(eventInfo.event.description || "No Description")}
        </Html>
        <SeeMore to={`/event/${eventInfo.event.id}`}>
          See more
        </SeeMore>
      </div>
    </StyledDetails>
  )
}

export default Details
