import { WeekListManager } from './WeekListMenager'; 
import { Link } from 'react-router-dom';
const UsersDetailPage = ({ userId }) => {
  return (<>
    
    <div>
      {userId} 
      <WeekListManager />
    </div>
    </>
  );
};

export default UsersDetailPage;