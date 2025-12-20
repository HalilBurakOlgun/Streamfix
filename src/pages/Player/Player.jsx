import React, { useState, useEffect } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useParams, useNavigate } from 'react-router-dom'

const Player = () => {
  const { id } = useParams()
  const navigate = useNavigate();

  const [apiData, setApiData] = useState(null)

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer YOUR_TOKEN'
    }
  }

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => {
        const trailer = res.results.find(
          v => v.site === "YouTube" && v.type === "Trailer"
        )
        if (trailer) setApiData(trailer)
      })
      .catch(err => console.error(err))
  }, [id])

  return (
    <div className="player">

      {/* Back button */}
      <div className="player-back" onClick={() => navigate(-1)}>
        <img src={back_arrow_icon} alt="Back" />
      </div>

      {apiData ? (
        <>
          <iframe
            src={`https://www.youtube.com/embed/${apiData.key}`}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
          />

          <div className="player-info">
            <p className="date">{apiData.published_at?.slice(0, 10)}</p>
            <h2 className="title">{apiData.name}</h2>

            {/* ⭐ Rating */}
            <div className="rating">
              <div className="stars">
                ★★★★☆
              </div>
              <span className="score">4.3</span>
            </div>

            <span className="type-badge">{apiData.type}</span>
          </div>
        </>
      ) : (
        <p style={{ color: "white" }}>Trailer bulunamadı</p>
      )}
    </div>
  )
}

export default Player
