import { PulseLoader } from 'react-spinners';
import './loading.css';

function Loading({ color }) {
  return (
    <div className="loading">
      <PulseLoader color={color} />
    </div>
  );
}

export default Loading;
