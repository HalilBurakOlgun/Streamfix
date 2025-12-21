import React, { useState, useEffect } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useParams, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMzE2NmI1NmZkYmRhMDI4NTQ0MzJlOTYxOGNiMDE4MiIsIm5iZiI6MTcxNjU4MTY4OS45MTYsInN1YiI6IjY2NTBmNTM5ZWY3MzUzMmYyYjIyZGRjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VLxqJRCci6avNv01ZH5NPNoPs4orZ8V1OnOOHNWcIoA'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => {
        const trailer = res.results.find(v => v.site === "YouTube" && v.type === "Trailer");
        if (trailer) setApiData(trailer);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleComment = () => {
    if (!newComment.trim() || !auth.currentUser) return;

    const user = auth.currentUser;
    const userName = `${user.name || "Anon"} - ${user.uid}`;

    const commentObj = {
      id: Math.random().toString(36).substr(2, 9),
      userName,
      comment: newComment
    };

    setComments(prev => [commentObj, ...prev]);
    setNewComment("");
  };

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
              <div className="stars">★★★★☆</div>
              <span className="score">4.3</span>
            </div>

            <span className="type-badge">{apiData.type}</span>

            {/* COMMENTS */}
            <div className="comments-section">
              <h3>Yorumlar</h3>
              {comments.length === 0 && <p className="no-comments">Henüz yorum yok</p>}
              {comments.map(c => (
                <div key={c.id} className="comment">
                  <strong>{c.userName}</strong>: {c.comment}
                </div>
              ))}

              {auth.currentUser && (
                <div className="add-comment">
                  <input
                    type="text"
                    placeholder="Yorumunuzu yazın..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleComment()}
                  />
                  <button onClick={handleComment}>Gönder</button>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <p style={{ color: "white" }}>Trailer bulunamadı</p>
      )}
    </div>
  );
};

export default Player;
