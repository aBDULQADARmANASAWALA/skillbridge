import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import ErrorMessage from "../components/ErrorMessage";
import getErrorMessage from "../utils/getErrorMessage";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [reviewedUser, setReviewedUser] = useState("");
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchReviews();
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get(
        "auth/users/"
      );

      setUsers(response.data);
    } catch (error) {
      setError(getErrorMessage(error));
    }
  };

  const getUserName = (id) => {
    const user = users.find(
      (u) => u.id === id
    );

    return user ? user.username : id;
  };

  const fetchReviews = async () => {
    setError("");

    try {
      const response = await api.get("reviews/");
      setReviews(response.data);
    } catch (error) {
      setError(
        getErrorMessage(error)
      );
    }
  };

  const addReview = async (e) => {
    setError("");
    e.preventDefault();

    try {
      await api.post("reviews/", {
        reviewed_user: Number(reviewedUser),
        rating: Number(rating),
        feedback,
      });

      setReviewedUser("");
      setRating(5);
      setFeedback("");

      fetchReviews();
    } catch (error) {
      setError(
        getErrorMessage(error)
      );
    }
  };

  return (
    <div className="container">
      <Navbar />
      <h1>Reviews</h1>

      <ErrorMessage error={error} />

      <form onSubmit={addReview}>
        <select
          className="select"
          value={reviewedUser}
          onChange={(e) =>
            setReviewedUser(e.target.value)
          }
        >
          <option value="">
            Select User
          </option>

          {users.map((user) => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.username}
            </option>
          ))}
        </select>

        <br />

        <input
          className="input"
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) =>
            setRating(e.target.value)
          }
        />

        <br />

        <textarea
          className="textarea"
          placeholder="Feedback"
          value={feedback}
          onChange={(e) =>
            setFeedback(e.target.value)
          }
        />

        <br />

        <button className="btn" type="submit">
          Submit Review
        </button>
      </form>

      <hr />

      <div className="cards-grid">
        {reviews.map((review) => (
          <div className="card" key={review.id}>
            <p>
              <strong>Rating</strong>: {review.rating}
            </p>

            <p>
              <strong>Feedback</strong>: {review.feedback}
            </p>

            <p>
              <strong>Reviewed By</strong>: {getUserName(review.reviewer)}
            </p>

            <p>
              <strong>Reviewed User</strong>: {getUserName(review.reviewed_user)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;