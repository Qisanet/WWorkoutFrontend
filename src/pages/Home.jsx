import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BackArrow from "../components/BackArrow";

const Home = () => {
  const [workouts, setWorkouts] = useState([]);
  const [currentWeight, setCurrentWeight] = useState('');
  const navigate = useNavigate();

 
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      axios
        .get('https://backend-workout-4w4a.onrender.com/api/workouts', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log('Fetched workouts:', response.data);
          setWorkouts(response.data);
        })
        .catch((error) => {
          console.error('Error fetching workouts:', error);
        });

    
      axios
        .get('https://backend-workout-4w4a.onrender.com/api/auth/user-weight', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const weight = response.data.weight;
          if (isNaN(weight) || weight <= 0) {
            setCurrentWeight(0); 
          } else {
            setCurrentWeight(weight);
          }
        })
        .catch((error) => {
          console.error('Error fetching weight:', error);
        });
    }
  }, [navigate]);

  
  const getCalories = () => {
    return currentWeight > 0 ? currentWeight * 30 : 30 * 50; 
  };

  const getWaterIntake = () => {
    return currentWeight > 0 ? currentWeight * 0.033 : 0.033 * 91; 
  };

  const getTimeSinceCreation = (createdAt) => {
    const now = new Date();
    const createdTime = new Date(createdAt);
    const diff = Math.floor((now - createdTime) / 1000); 

    if (diff < 60) return "less than a minute ago";
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  const handleDelete = async (workoutId) => {
    console.log("Deleting workout with ID:", workoutId);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found, user not authenticated.");
        return;
      }

      const response = await axios.delete(
        `https://backend-workout-4w4a.onrender.com/api/workouts/${workoutId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Delete response:", response.data);

      setWorkouts(workouts.filter((workout) => workout._id !== workoutId));
    } catch (error) {
      console.error("Error deleting workout:", error.response?.data || error.message);
    }
  };

  return (
    <>
      <BackArrow />
      <div className="container bg-success">
        <div>
          <h1>Your Workouts</h1>
          <section
            id="user-stats"
            style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px' }}
          >
            <h2>Your Current Stats</h2>

            <p><strong>Recommended Daily Calories:</strong> {getCalories()} kcal</p>
            <p><strong>Recommended Daily Water Intake:</strong> {getWaterIntake().toFixed(2)} liters</p>
          </section>

          {workouts.length > 0 ? (
            <div className="row">
              {workouts.map((workout) => (
               <div key={workout._id} className="col-md-4 d-flex justify-content-center">
               <div className="card m-2 p-2 workout-card position-relative" style={{ borderRadius: "10px", width: "18rem", padding: "10px", position: "relative" }}>
                 
              
                 <i 
                   className="bi bi-trash-fill text-danger position-absolute top-0 end-0 m-2"
                   style={{ cursor: "pointer", fontSize: "1.5rem" }}
                   onClick={() => handleDelete(workout._id)}
                 ></i>
             
                 <div className="card-body text-center">
                   
                  
                     <h5 className="fs-b"> {workout.title}</h5>
                   
                  
                     <p>REPS: {workout.reps}</p>
                  
                   
                     <p>LOAD: {workout.load}</p>
                  
                   
                     <p>C.WEIGHT: {workout.weight}kg</p>
                  
                   <div className="card-number">
                     <p>Created: {getTimeSinceCreation(workout.createdAt)}</p>
                   </div>
                 </div>
               </div>
             </div>
              ))}

            </div>
          ) : (
            <p>No workouts created yet. Start by adding one!</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;