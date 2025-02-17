
import { Link } from 'react-router-dom';
import '../index.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsArrowLeft } from 'react-icons/bs'
const BackArrow = ({destination='/'}) => {
  return (
    <div className="flex">
      <Link to={destination} className="btn btn-link">
        <BsArrowLeft className="bi bi-arrow-left-circle" style={{ fontSize: '2rem', color: '#007bff' }}></BsArrowLeft>
      </Link>
    </div>
  );
};

export default BackArrow;