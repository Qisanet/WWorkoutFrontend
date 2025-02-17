import axios from 'axios';
import { useSnackbar } from 'notistack';
import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackArrow from "./BackArrow";

const WorkoutForm = () => {
  const [title, setTitle] = useState('');
  const [reps, setReps] = useState('');
  const [load, setLoad] = useState('');
  const [weight, setWeight] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      enqueueSnackbar('You must be logged in to create a workout.', { variant: 'error' });
      return;
    }

    axios
      .post(
        'https://backend-workout-4w4a.onrender.com/api/workouts',
        { title, reps, load, weight },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        enqueueSnackbar('Workout created successfully!', { variant: 'success' });
        setTitle('');
        setReps('');
        setLoad('');
        setWeight('');
        
        navigate("/home");
      })
      .catch((error) => {
        enqueueSnackbar('Failed to create workout. Please try again.', { variant: 'error' });
        console.error(error);
      });
  };

  return (
    <>
      <BackArrow />
      <div className="container mt-5">
        <h2>Create a Workout</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">excersize Title:</label>
            <input
              type="text"
              id="title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="load" className="form-label">Load(in kg):</label>
            <input
              type="number"
              id="load"
              className="form-control"
              value={load}
              onChange={(e) => setLoad(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="reps" className="form-label">Reps:</label>
            <input
              type="number"
              id="reps"
              className="form-control"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="weight" className="form-label">New Weight</label>
            <input
              type="number"
              id="weight"
              className="form-control"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Workout</button>
          <p><Link to="/home">Your Workouts</Link></p>
        </form>
      </div>
  </>
  );
};

export default WorkoutForm;