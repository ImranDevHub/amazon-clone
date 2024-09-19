import { PulseLoader } from 'react-spinners';
import './loading.css';

function Loading() {
  return (
    <div className="loading">
      <PulseLoader color="#ffcd4f" />
    </div>
  );
}

export default Loading;
